import { spawn } from "child_process";
import { FullConfigWServerPID } from "../types/config.types";

/**
 * Sets up the test environment by starting a local node server.
 * @async
 * @param {FullConfigWServerPID} config - The configuration object that will store the server PID.
 * @param {string} nodeServerPath - The path to the node server script.
 * @returns {Promise<void>} A promise that resolves when the setup is complete.
 * @throws {Error} If the server fails to start.
 */
export async function setup(config: FullConfigWServerPID, nodeServerPath: string): Promise<void> {
    try {
        console.log("Starting local node server...");
        let server = spawn("node", [nodeServerPath]);
        config.serverPid = server.pid;
        // TODO: Implement better mechanism for waiting until target server is running
        await new Promise((resolve) => setTimeout(resolve, 5000));
        console.log("Started local node server...");
    } catch (err) {
        const message = (err instanceof Error) ? err.message : JSON.stringify(err);
        console.error(`Failed to start local node server: ${message}`);
        process.exit(1);
    }
}

/**
 * Tears down the test environment by closing the local node server.
 * @async
 * @param {FullConfigWServerPID} config - The configuration object containing the server PID.
 * @returns {Promise<void>} A promise that resolves when the teardown is complete.
 * @throws {Error} If the server fails to close.
 */
export async function teardown(config: FullConfigWServerPID): Promise<void> {
    try {
        console.log("Closing local node server...");
        process.kill(config.serverPid!);
        console.log("Closed local node server...");
    } catch (err) {
        const message = (err instanceof Error) ? err.message : JSON.stringify(err);
        console.error(`Failed to close local node server: ${message}`);
        process.exit(1);
    }
}
