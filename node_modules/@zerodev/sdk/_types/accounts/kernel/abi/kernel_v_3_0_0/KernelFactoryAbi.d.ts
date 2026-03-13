export declare const KernelV3FactoryAbi: readonly [{
    readonly type: "constructor";
    readonly inputs: readonly [{
        readonly name: "_impl";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "createAccount";
    readonly inputs: readonly [{
        readonly name: "data";
        readonly type: "bytes";
        readonly internalType: "bytes";
    }, {
        readonly name: "salt";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly name: "getAddress";
    readonly inputs: readonly [{
        readonly name: "data";
        readonly type: "bytes";
        readonly internalType: "bytes";
    }, {
        readonly name: "salt";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "implementation";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "error";
    readonly name: "InitializeError";
    readonly inputs: readonly [];
}];
//# sourceMappingURL=KernelFactoryAbi.d.ts.map