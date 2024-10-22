/**
 * @module Hooks
 * Global lifecycle hooks for test project setup and teardown.
 */

import * as NodeServer from './node-server';

export { NodeServer };

export const Hooks = {
    NodeServer
} as const;

export default Hooks;