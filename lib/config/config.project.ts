import { config as loadDotenv } from 'dotenv';
import { resolve } from 'path';
import merge from 'deepmerge';
import { CircularDependencyError, ConfigurationError } from '../errors';
import { BaseEnvironmentConfig, EnvironmentConfig, ProjectConfigurationDefinition, TimeoutOptions } from './types';
import Utils from '../utils';

export class ProjectConfiguration {

    private readonly base: BaseEnvironmentConfig;
    private readonly environments: Map<string, EnvironmentConfig>;
    private readonly computedConfigs: Map<string, BaseEnvironmentConfig>;
    private readonly envVariables: Map<string, Record<string, string>>;
    private readonly rootDir: string;
    private interpolationStack: string[] = [];

    public constructor(definition: ProjectConfigurationDefinition) {
        this.rootDir = Utils.File.locateRootDir();
        this.validateConfiguration(definition);
        this.base = definition.base;
        this.environments = new Map();
        this.computedConfigs = new Map();
        this.envVariables = new Map();

        for (const env of definition.environments) {
            this.environments.set(env.name, env);
            this.loadEnvironmentFile(env);
        }
    }

    private validateConfiguration(definition: ProjectConfigurationDefinition): void {
        if (!definition.base)
            throw new ConfigurationError('Base configuration is required');

        if (!Array.isArray(definition.environments) || definition.environments.length === 0)
            throw new ConfigurationError('At least one environment configuration is required');

        const names = new Set(definition.environments.map(env => env.name));
        if (names.size !== definition.environments.length)
            throw new ConfigurationError('Environment names must be unique');

        this.validateUrl(definition.base.url);
        // Only validate URLs that are defined in environments
        for (const env of definition.environments) {
            if (env.url !== undefined) {
                this.validateUrl(env.url);
            }
        }
    }

    private validateUrl(url: string): void {
        try {
            const testUrl = url.replace(/\${[^}]+}/g, 'test');
            new URL(testUrl);
        } catch {
            throw new ConfigurationError(`Invalid URL format: ${url}`);
        }
    }

    private resolvePath(path: string): { absolute: string; relative: string } {
        const resolvedPath = path.replace(/<root>/g, this.rootDir);
        if (resolve(resolvedPath) === resolvedPath) {
            return {
                absolute: resolvedPath,
                relative: resolvedPath
            };
        }
        return {
            absolute: resolve(process.cwd(), resolvedPath),
            relative: resolvedPath
        };
    }

    private loadEnvironmentFile(env: EnvironmentConfig): void {
        if (!env.envFile) return;
        const { path: envPath, name = '.env' } = env.envFile;
        const resolvedPath = this.resolvePath(envPath);
        const fullPath = resolve(resolvedPath.absolute, name);
        try {
            const result = loadDotenv({ path: fullPath });
            if (result.error) {
                throw result.error;
            }
            this.envVariables.set(env.name, result.parsed || {});
        } catch (error) {
            const message = (error instanceof Error) ? error.message : JSON.stringify(error);
            throw new ConfigurationError(
                `Failed to load environment file for ${env.name} at ${resolvedPath.relative}/${name}: ${message}`
            );
        }
    }

    private interpolateString(str: string,context: Record<string, unknown>,currentPath = ''): string {
        return str.replace(/\${([^}]+)}/g, (_, expression: string) => {
            const parts: string[] = expression.split('|');
            const path: string = parts[0].trim();
            const defaultValue: string | undefined = parts[1]?.trim();
            
            if (this.interpolationStack.includes(path)) {
                throw new CircularDependencyError(path, [...this.interpolationStack, path]);
            }
    
            this.interpolationStack.push(path);
            
            try {
                const value = this.getValueByPath(context, path);
                
                if (value === undefined)
                    return (defaultValue !== undefined)
                        ? defaultValue
                        : '';
                
                if (typeof value === 'string') {
                    return this.interpolateString(value, context, path);
                }
                
                return String(value);
            } finally {
                this.interpolationStack = this.interpolationStack.filter(p => p !== path);
            }
        });
    }

    private getValueByPath(obj: Record<string, unknown>, path: string): unknown {
        try {
            return path.split('.').reduce((current: unknown, part: string) => {
                if (current && typeof current === 'object') {
                    return (current as Record<string, unknown>)[part];
                }
                return undefined;
            }, obj);
        } catch {
            return undefined;
        }
    }

    private interpolateObject(obj: Record<string, unknown>, context: Record<string, unknown>, parentPath = ''): Record<string, unknown> {
        const result: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(obj)) {
            const currentPath = parentPath ? `${parentPath}.${key}` : key;
            if (typeof value === 'string') {
                try {
                    result[key] = this.interpolateString(value, context, currentPath);
                } catch (error) {
                    if (error instanceof CircularDependencyError)
                        throw error;
                    const message = (error instanceof Error) ? error.message : JSON.stringify(error);
                    throw new ConfigurationError(`Error interpolating value at "${currentPath}": ${message}`);
                }
            } else if (typeof value === 'object' && value !== null) {
                result[key] = this.interpolateObject(
                    value as Record<string, unknown>,
                    context,
                    currentPath
                );
            } else {
                result[key] = value;
            }
        }
        return result;
    }

    private computeConfig(envConfig: EnvironmentConfig): BaseEnvironmentConfig {
        this.interpolationStack = [];
        
        const completeEnvConfig: BaseEnvironmentConfig = {
            url: envConfig.url ?? this.base.url,
            timeouts: {
                ...this.base.timeouts,
                ...(envConfig.timeouts || {})
            } as TimeoutOptions,
            options: {
                ...this.base.options,
                ...(envConfig.options || {})
            },
            ...(envConfig.params && { params: envConfig.params }),
            ...(envConfig.envFile && { envFile: envConfig.envFile })
        };
    
        const mergedConfig = merge(this.base, completeEnvConfig);
        const envVars = this.envVariables.get(envConfig.name) || {};
    
        const interpolationContext = {
            env: envConfig.name,
            config: mergedConfig,
            params: mergedConfig.params || {},
            timeouts: mergedConfig.timeouts,
            options: mergedConfig.options,
            envVars
        };
    
        return this.interpolateConfig(mergedConfig, interpolationContext);
    }

    private interpolateConfig(config: BaseEnvironmentConfig, context: Record<string, unknown>): BaseEnvironmentConfig {
        const interpolated = { ...config };
        interpolated.url = this.interpolateString(config.url, context);
        
        if (config.params)
            interpolated.params = this.interpolateObject(config.params, context);
        
        return interpolated;
    }

    public getConfig(environmentName: string): BaseEnvironmentConfig {
        if (!this.environments.has(environmentName))
            throw new ConfigurationError(`Environment "${environmentName}" not found`);
        if (this.computedConfigs.has(environmentName))
            return this.computedConfigs.get(environmentName)!;
        const envConfig = this.environments.get(environmentName)!;
        const computedConfig = this.computeConfig(envConfig);
        this.computedConfigs.set(environmentName, computedConfig);
        return computedConfig;
    }

    public getEnvironments(): string[] {
        return Array.from(this.environments.keys());
    }

    public getEnvironmentVariables(environmentName: string): Record<string, string> {
        return this.envVariables.get(environmentName) || {};
    }
}

const projectConfig = (definition: ProjectConfigurationDefinition): ProjectConfiguration => {
    return new ProjectConfiguration(definition);
};

export default projectConfig;