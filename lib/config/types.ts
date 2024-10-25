
/**
 * Basic timeout configurations
 */
export interface BaseTimeoutOptions {
    short: number;
    medium: number;
    long: number;
}

/**
 * Allow additional number properties beyond the base timeouts
 */
export interface TimeoutOptions extends BaseTimeoutOptions {
    [key: string]: number;
}

/**
 * Project-wide options for test execution
 */
export interface ProjectOptions {
    fullyParallel: boolean;
    workers: number;
    maxRetries: number;
}

/**
 * Environment file configuration
 */
export interface EnvFileConfig {
    path: string;
    name?: string;
}

/**
 * Helper type for path resolution results
 */
export interface ResolvedPath {
    absolute: string;
    relative: string;
}

/**
 * Base configuration interface that all environments extend from
 */
export interface BaseEnvironmentConfig {
    url: string;
    timeouts: TimeoutOptions;
    options: ProjectOptions;
    params?: Record<string, unknown>;
    envFile?: EnvFileConfig;
}

/**
 * Configuration for a specific environment, allowing partial overrides
 */
export interface EnvironmentConfig extends Omit<BaseEnvironmentConfig, 'url' | 'timeouts' | 'options'> {
    name: string;
    url?: string;
    timeouts?: Partial<TimeoutOptions>;
    options?: Partial<ProjectOptions>;
}

/**
 * Complete project configuration definition
 */
export interface ProjectConfigurationDefinition {
    base: BaseEnvironmentConfig;
    environments: EnvironmentConfig[];
}
