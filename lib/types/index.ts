/**
 * @module Types
 * Common type definitions used across the testing framework.
 */

export type {
    TestConfigWServerPID,
    FullConfigWServerPID
} from './config';

import * as Config from './config';

export const Types = {
    Config
} as const;

export default Types;