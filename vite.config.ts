/* eslint-disable no-console */
import { basename, resolve } from 'node:path';
import { visualizer } from 'rollup-plugin-visualizer';
import { loadEnv, type ConfigEnv, type UserConfig } from 'vite';
import packageJson from './package.json';
const resolvePath = (str: string) => resolve(process.cwd(), str);
// https://vitejs.dev/config/
export default (configEnv: ConfigEnv) => {
    const env = loadEnv(configEnv.mode, process.cwd());
    console.info(configEnv);
    console.table(env);
    return {
        base: env.VITE_BASE_URL,
        plugins: [
            visualizer({
                open: false,
                gzipSize: true,
            }),
        ],
        build: {
            sourcemap: true,
            lib: {
                formats: ['es', 'cjs', 'umd'],
                fileName: (format) => {
                    if (format === 'es') return basename(packageJson.module);
                    if (format === 'umd') return basename(packageJson.browser);
                    if (format === 'cjs') return basename(packageJson.exports['.'].require);
                    return `${packageJson.name}.${format}`;
                },
                entry: resolvePath('./src/index.ts'),
                name: packageJson.name.replace(/-(\w)/gi, (_, v) => v.toUpperCase()),
            },
        },
    } as UserConfig;
};
