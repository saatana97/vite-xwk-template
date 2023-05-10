export interface BinaryStatusStoreOption {
    value?: number;
    change?: (newValue: number, oldValue: number) => void;
    repeat?: (index: number) => void;
}
const BINARY_MAX_LENGTH = Number.MAX_SAFE_INTEGER.toString(2).length;
/**
 * 创建一个二进制状态存储器，只支持两种状态true/false，最多只能保存54个状态值（数字精度问题）
 * @param options
 * @returns
 */
export const createBinaryStatusStore = (options: BinaryStatusStoreOption) => {
    const { value: defaultValue, change: changeFunc, repeat: repeatFunc } = options;
    let store = defaultValue ?? 0;
    const emits = (func?: (...args: unknown[]) => void, ...args: unknown[]) => {
        try {
            func?.(...args);
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error('执行回调发生异常', func, args, e);
        }
    };
    const update = (value: number) => {
        const old = store;
        store = value;
        emits(changeFunc, store, old);
    };
    const validate = (index: number) => {
        // Number('0b'+'1'.repeat(53)).toString(2) 二进制转十进制再转回二进制超过53位就会出现精度问题
        if (index < 0 || index > BINARY_MAX_LENGTH || ~~index !== index) {
            throw new Error('下标必须是小于${MAX_SIZE}的正整数');
        }
    };
    const count = () =>
        Number(store)
            .toString(2)
            .split('')
            .filter((item) => item === '1').length;
    const toggle = (index: number) => {
        validate(index);
        update(store ^ (1 << index));
    };
    const active = (index: number) => {
        if (!status(index)) {
            toggle(index);
        } else {
            emits(repeatFunc, index);
        }
    };
    const inactive = (index: number) => {
        if (status(index)) {
            toggle(index);
        } else {
            emits(repeatFunc, index);
        }
    };
    const status = (index?: number | number[], logic: 'and' | 'or' | 'not' | 'xor' = 'and') => {
        const arr = typeof index === 'number' ? [index] : index;
        arr.forEach(validate);
        index = arr.reduce((sum, item) => sum + (1 << item), 0);
        const temp = store & index;
        let status = false,
            err: never;
        switch (logic) {
            case 'and':
                status = temp === index;
                break;
            case 'or':
                // TODO
                status = ((store | index) & store) === store;
                break;
            case 'not':
                status = temp !== index;
                break;
            case 'xor':
                status = temp !== 0 && temp !== index;
                break;
            default:
                err = logic;
                // eslint-disable-next-line no-console
                console.error('未实现的逻辑：', err);
        }
        return status;
    };
    return {
        count,
        toggle,
        active,
        inactive,
        status,
    };
};
