export type Mutable<T> = {
    -readonly [K in keyof T]: T[K];
};
//# sourceMappingURL=mutable.d.ts.map