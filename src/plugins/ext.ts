export default () => {};
Date.prototype.fmt = function (format = 'YYYY-MM-DD HH:mm:ss') {
    // TODO 推荐使用dayjs，可以从element-plus中引入
    // return dayjs(this).format(format);
    throw new Error('not implement! ' + format);
};
Array.prototype.groupBy = function <T>(by: string) {
    const _this = this;
    return new Array(new Set(this.map((item) => item[by]))).map((item) =>
        _this.filter((temp) => temp[by] === item)
    ) as T[];
};
Array.prototype.sortBy = function <T>(by: string) {
    return this.sort((prev, next) =>
        typeof prev[by] === 'string' ? prev[by].localeCompare(next[by]) : prev[by] - next[by]
    ) as T[];
};
