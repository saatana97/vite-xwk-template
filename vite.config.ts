/* eslint-disable no-console */
import { resolve } from 'node:path';
import { loadEnv, type ConfigEnv, type UserConfig } from 'vite';
// https://vitejs.dev/config/
export default (configEnv: ConfigEnv) => {
    const env = loadEnv(configEnv.mode, process.cwd());
    console.info(configEnv);
    console.table(env);
    return (
        configEnv.command === 'serve'
            ? {
                  base: env.VITE_BASE_URL,
              }
            : {
                  build: {
                      lib: {
                          entry: resolve('./src/main.ts'),
                          name: 'Lib',
                          formats: ['cjs', 'es', 'iife', 'umd'],
                          fileName: 'lib',
                      },
                  },
              }
    ) as UserConfig;
};
