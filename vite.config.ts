/* eslint-disable no-console */
import { resolve } from 'node:path';
import visualizer from 'rollup-plugin-visualizer';
import { loadEnv, type ConfigEnv, type UserConfig } from 'vite';
// https://vitejs.dev/config/
export default (configEnv: ConfigEnv) => {
    const env = loadEnv(configEnv.mode, process.cwd());
    console.info(configEnv);
    console.table(env);
    return {
        base: env.VITE_BASE_URL,
        plugins: [
            visualizer({
                open: true,
                gzipSize: true,
            }),
        ],
        build: {
            sourcemap: true,
            copyPublicDir: false,
            lib: {
                entry: resolve('./src/main.ts'),
                name: 'Lib',
                formats: ['cjs', 'es', 'umd'],
                fileName: 'lib',
            },
            rollupOptions: {
                input: resolve('./src/main.ts'),
                external: ['lodash'],
                globals: {
                    lodash: '_',
                },
            },
        },
    } as UserConfig;
};
