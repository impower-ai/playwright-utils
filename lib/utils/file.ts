import path from "path";
import fs from "fs";

/**
 * Locates the root directory of a Node.js project by searching for package.json.
 * Starting from the current working directory, it traverses up the directory tree
 * until it finds a package.json file that is not inside a node_modules folder.
 * @returns {string} The absolute path to the project's root directory
 * @throws {Error} If no package.json is found in the directory tree outside of node_modules
 */
export function locateRootDir(): string {
    let currentPath = process.cwd();
    while (true) {
        const packagePath = path.join(currentPath, 'package.json');
        if (fs.existsSync(packagePath) && !currentPath.includes('node_modules'))
            return currentPath;
        const parentPath = path.dirname(currentPath);
        if (parentPath === currentPath)
            break;
        currentPath = parentPath;
    }
    throw new Error('Could not locate project root: No package.json found');
}

export const File = {
    locateRootDir
} as const;

export default File;