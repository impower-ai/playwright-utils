import { defineConfig } from "tsup";

export default defineConfig({
    format: ["cjs", "esm"],
    entry: ["./lib/index.ts"],
    dts: true,
    shims: true,
    skipNodeModulesBundle: true,
    clean: false,
    minify: false
});
