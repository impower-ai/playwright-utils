import { test } from "@playwright/test";
import projectConfig, { ProjectConfiguration } from "../../../lib/config/config.project";

test("Validate Project Configurations properly merge", async () => {
    const config: ProjectConfiguration = projectConfig({
        base: {
            url: "https://app.${env}.${params.domain|example.com}",
            timeouts: {
                short: 5000,
                medium: 15000,
                long: 30000
            },
            options: {
                fullyParallel: false,
                workers: 5,
                maxRetries: 2
            },
            params: {
                // Using default values
                domain: "${params.customDomain|example.com}",
                apiVersion: "${params.version|v1}",
                
                // Nested interpolation with defaults
                apiUrl: "https://api.${env}.${params.domain|example.com}/${params.apiVersion|v1}",
                
                // Reference to other configuration sections with defaults
                defaultTimeout: "${timeouts.medium|10000}",
                workerCount: "${options.workers|3}",
                
                // Complex nested structure
                endpoints: {
                    auth: "${params.apiUrl|https://api.default.com}/auth",
                    users: "${params.apiUrl|https://api.default.com}/users",
                    // This would cause a circular dependency if uncommented:
                    // circular: "${params.endpoints.circular}"
                }
            }
        },
        environments: [
            {
                name: "dev",
                params: {
                    customDomain: "dev-example.com",
                    version: "v2",
                    // Using nested references with defaults
                    wsUrl: "wss://${params.endpoints.auth|default}/ws",
                    // Default values in nested structures
                    database: {
                        host: "${envVars.DB_HOST|localhost}",
                        port: "${envVars.DB_PORT|5432}",
                        name: "${envVars.DB_NAME|devdb}"
                    }
                },
                envFile: {
                    path: "<root>/tests/unit/config",
                    name: ".env.dev"
                }
            }
        ]
    });

    const devConfig = config.getConfig("dev");

    console.log(devConfig.url);
    console.log(JSON.stringify(devConfig.timeouts));
    console.log(JSON.stringify(devConfig.options));
    console.log(JSON.stringify(devConfig.params));
    console.log(JSON.stringify(devConfig.envFile));
});