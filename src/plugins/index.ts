import type { App } from 'vue';
export interface XPluginInstallFn {
    (app: App): void;
}
export interface XPlugin {
    install: XPluginInstallFn;
}
interface XPluginModule {
    plugin: XPlugin;
}
interface EsModuleWithDefaultExport {
    default: unknown;
}
// TODO add plugin fields: name、description、version、env、order、ignore
export default (app: App) => {
    Object.entries(import.meta.glob('./*.ts', { eager: true })).forEach((entry) => {
        const install =
                ((entry[1] as XPluginModule).plugin as XPlugin)?.install ??
                (entry[1] as XPlugin).install ??
                ((entry[1] as EsModuleWithDefaultExport).default as XPluginInstallFn),
            name = entry[0].split('/').pop()?.split('.').reverse().slice(1).reverse().join() || 'unknown';
        if (typeof install === 'function') {
            install(app);
            console.info('[plugins] loaded ' + name);
        } else {
            console.warn('[plugins] load faild ' + name);
        }
    });
};
