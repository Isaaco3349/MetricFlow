export declare const KernelModuleIsInitializedAbi: readonly [{
    readonly type: "function";
    readonly name: "isInitialized";
    readonly inputs: readonly [{
        readonly name: "smartAccount";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
        readonly internalType: "bool";
    }];
    readonly stateMutability: "view";
}];
export declare const KernelModuleInstallAbi: readonly [{
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "moduleType";
        readonly type: "uint256";
    }, {
        readonly internalType: "address";
        readonly name: "module";
        readonly type: "address";
    }, {
        readonly internalType: "bytes";
        readonly name: "initData";
        readonly type: "bytes";
    }];
    readonly stateMutability: "payable";
    readonly type: "function";
    readonly name: "installModule";
}];
export declare const KernelModuleIsModuleInstalledAbi: readonly [{
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "moduleType";
        readonly type: "uint256";
    }, {
        readonly internalType: "address";
        readonly name: "module";
        readonly type: "address";
    }, {
        readonly internalType: "bytes";
        readonly name: "additionalContext";
        readonly type: "bytes";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
    readonly name: "isModuleInstalled";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "";
        readonly type: "bool";
    }];
}];
//# sourceMappingURL=KernelModuleAbi.d.ts.map