import type { App } from 'vue';
export default (app: App) => {
    Object.entries(import.meta.glob('./*.ts', { eager: true })).forEach((entry) => {
        (entry[1] as { default: (app: App) => void }).default?.(app);
        console.info(
            '[plugins] loaded ' + entry[0].split('/').pop()?.split('.').reverse().slice(1).reverse().join() || 'unknown'
        );
    });
};
