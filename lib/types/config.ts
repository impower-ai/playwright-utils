import { PlaywrightTestConfig, FullConfig } from "@playwright/test";

export interface TestConfigWServerPID extends PlaywrightTestConfig {
    serverPid?: number;
}
  
export interface FullConfigWServerPID extends FullConfig {
    serverPid?: number;
}
