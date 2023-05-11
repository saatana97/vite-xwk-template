export interface BinaryStatusStoreOption {
    /**
     * 默认值
     */
    value?: number;
    /**
     * 值改变回调
     * @param newValue 新值
     * @param oldValue 旧值
     */
    change?: (newValue: number, oldValue: number) => void;
    /**
     * 状态重复修改回调
     * @param index 状态索引
     */
    repeat?: (index: number) => void;
}
/**
 * 状态查询时索引状态集合之间的逻辑关系
 */
export enum StatusLogic {
    /**
     * 与，全部激活
     */
    AND = 'and',
    /**
     * 或，至少有一个激活
     */
    OR = 'or',
    /**
     * 非，全部没激活
     */
    NOT = 'not',
    /**
     * 异或，激活和未激活都有
     */
    XOR = 'xor',
}
const BINARY_MAX_LENGTH = Number.MAX_SAFE_INTEGER.toString(2).length;
const ACTIVED_REG = /1/g;
/**
 * 创建一个二进制状态存储器，只支持两种状态true/false，最多只能保存54个状态值（数字精度问题）
 * @param options
 * @returns
 */
export const createBinaryStatusStore = (options: BinaryStatusStoreOption) => {
    const { value: defaultValue, change: changeFunc, repeat: repeatFunc } = options;
    let store = defaultValue ?? 0;
    function emits(func?: (...args: unknown[]) => void, ...args: unknown[]) {
        try {
            func?.(...args);
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error('执行回调发生异常', func, args, e);
        }
    }
    function update(value: number) {
        const old = store;
        store = value;
        emits(changeFunc, store, old);
    }
    function validate(index: number) {
        // Number('0b'+'1'.repeat(53)).toString(2) 二进制转十进制再转回二进制超过53位就会出现精度问题
        if (index < 0 || index > BINARY_MAX_LENGTH || ~~index !== index) {
            throw new Error('下标必须是小于${MAX_SIZE}的正整数');
        }
    }
    /**
     * 获取处于激活状态数量
     */
    function count() {
        return Number(store).toString(2).match(ACTIVED_REG).length;
    }
    /**
     * 切换激活状态
     * @param index 索引
     */
    function toggle(index: number) {
        validate(index);
        update(store ^ (1 << index));
    }
    /**
     * 激活指定索引，如果该索引已经处于激活状态会触发repeat回调
     * @param index 索引
     */
    function active(index: number) {
        if (!status(index)) {
            toggle(index);
        } else {
            emits(repeatFunc, index);
        }
    }
    /**
     * 取消激活指定索引，如果该索引未处于激活状态会触发repeat回调
     * @param index 索引
     */
    function inactive(index: number) {
        if (status(index)) {
            toggle(index);
        } else {
            emits(repeatFunc, index);
        }
    }
    /**
     * 查询指定索引的激活状态
     * @param index 索引
     * @returns 激活状态
     */
    function status(index: number): boolean;
    /**
     * 查询指定索引集合的激活状态
     * @param indexes 索引集合
     * @param logic 逻辑关系
     * @returns 激活状态
     */
    function status(indexes: number[], logic: StatusLogic): boolean;
    function status(index: number | number[], logic = StatusLogic.AND): boolean {
        const arr = typeof index === 'number' ? [index] : index;
        arr.forEach(validate);
        index = arr.reduce((sum, item) => sum + (1 << item), 0);
        const temp = store & index;
        let status = false,
            err: never;
        switch (logic) {
            case StatusLogic.AND:
                status = temp === index;
                break;
            case StatusLogic.OR:
                status = temp !== 0;
                break;
            case StatusLogic.NOT:
                status = temp === 0;
                break;
            case StatusLogic.XOR:
                status = temp !== 0 && temp !== index;
                break;
            default:
                err = logic;
                // eslint-disable-next-line no-console
                console.error('未实现的逻辑关系：', err);
        }
        return status;
    }
    return {
        count,
        toggle,
        active,
        inactive,
        status,
    };
};
