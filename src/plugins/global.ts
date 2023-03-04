import type { XPlugin } from '.';
/**
 * 复制文本
 * @param {string} content 要复制的内容
 */
export const copy = async (content: string) => {
    return new Promise<void>((resolve, reject) => {
        if (typeof navigator?.clipboard?.writeText === 'function') {
            navigator.clipboard.writeText(content).then(resolve).catch(reject);
        } else {
            const el = document.createElement('textarea');
            el.style.position = 'absolute';
            el.style.zIndex = '-9999';
            el.value = content;
            document.body.appendChild(el);
            el.select();
            if (document.execCommand('copy')) {
                resolve();
            } else {
                reject('copy failed.');
            }
            el.remove();
        }
    });
};
/**
 * 下载指定地址的文件
 * @param {*} fileName 文件名称
 * @param {*} href 文件地址
 */
export const download = (fileName: string, href: string) => {
    if ('download' in document.createElement('a')) {
        const elink = document.createElement('a');
        elink.download = fileName;
        elink.style.display = 'none';
        elink.href = href;
        document.body.appendChild(elink);
        elink.click();
        document.body.removeChild(elink);
    } else {
        window.open(href, '_blank');
    }
};
/**
 * 导出为excel并下载
 * @param {*} fileName 文件名称
 * @param {*} data excel数据
 */
export const excel = (fileName: string, data: string) => {
    const blob = new Blob([data], { type: 'text/plain,charset=UTF-8' });
    const elink = document.createElement('a');
    elink.download = fileName;
    elink.href = URL.createObjectURL(blob);
    document.body.appendChild(elink);
    elink.click();
    URL.revokeObjectURL(elink.href);
    document.body.removeChild(elink);
};
/**
 * 字典查询
 * @param {*} dict 字典数据
 * @param {*} value 字典值
 * @param {*} opts 配置
 * @returns 字典标签
 */
export const dict = (
    dict: Array<Record<string, string>>,
    value: string | string[],
    opts?: { label?: string; value?: string; default?: unknown }
) => {
    value = value || [];
    value = value instanceof Array ? value : [value];
    opts = { label: 'label', value: 'value', default: '未知', ...(opts || {}) };
    return (
        value
            .map(
                (v) =>
                    (dict || []).find((item) => item[opts?.value as string] === v)?.[opts?.label as string] ||
                    opts?.default
            )
            .join(',') || opts.default
    );
};
export const plugin: XPlugin = {
    install(app) {
        app.config.globalProperties.$copy = copy;
        app.config.globalProperties.$download = download;
        app.config.globalProperties.$excel = excel;
        app.config.globalProperties.$dict = dict;
    },
};
