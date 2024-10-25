
/**
 * @module Config
 * Provides classes and types to support multi-environment configuration
 */

export { default as projectConfig } from "./config.project";

export type {
    BaseTimeoutOptions,
    TimeoutOptions,
    ProjectOptions,
    EnvFileConfig,
    BaseEnvironmentConfig,
    EnvironmentConfig,
    ProjectConfigurationDefinition
} from "./types";
