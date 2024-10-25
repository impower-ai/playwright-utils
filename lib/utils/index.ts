/**
 * @module Utils
 * Utility functions for common operations across the testing framework.
 */

import Timing from './timing';
import Enum from './enum';
import Tag from './tag';
import Validate from './validate';
import Random from './random';
import File from './file';

export { Timing, Enum, Tag, Validate, Random, File };

export type { TimingOptions, ConditionFunc } from './timing';

export const Utils = {
    Timing,
    Enum,
    Tag,
    Validate,
    Random,
    File
} as const;

export default Utils;