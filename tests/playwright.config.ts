import { defineConfig, devices } from "@playwright/test";

export default defineConfig({

    fullyParallel: true,
    workers: 10,
    reporter: [
        ["html"],
        ["list"],
    ],
    use: {
        trace: "retain-on-failure",
        actionTimeout: 10000,
        ...devices["Desktop Chrome"],
        channel: "chrome",
        viewport: {
            width: 1920,
            height: 1080,
        },
    },
    projects: [
        {
            name: "Unit",
            testDir: "./unit",
            testMatch: "*.spec.ts"
        },
        {
            name: "DataDriven",
            testMatch: "data-driven.spec.ts"
        }
    ]
});