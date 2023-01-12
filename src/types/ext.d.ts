interface Date {
    fmt: (pattern?: string) => string;
}
interface Array<T> {
    groupBy: (by: string) => T[];
    sortBy: (by: string) => T[];
}
