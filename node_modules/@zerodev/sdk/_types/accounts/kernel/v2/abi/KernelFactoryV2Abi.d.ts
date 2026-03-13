export declare const KernelFactoryV2Abi: readonly [{
    readonly type: "constructor";
    readonly inputs: readonly [{
        readonly name: "_entryPoint";
        readonly type: "address";
        readonly internalType: "contract IEntryPoint";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "createAccount";
    readonly inputs: readonly [{
        readonly name: "_validator";
        readonly type: "address";
        readonly internalType: "contract IKernelValidator";
    }, {
        readonly name: "_data";
        readonly type: "bytes";
        readonly internalType: "bytes";
    }, {
        readonly name: "_index";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "proxy";
        readonly type: "address";
        readonly internalType: "contract EIP1967Proxy";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "entryPoint";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "contract IEntryPoint";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "getAccountAddress";
    readonly inputs: readonly [{
        readonly name: "_validator";
        readonly type: "address";
        readonly internalType: "contract IKernelValidator";
    }, {
        readonly name: "_data";
        readonly type: "bytes";
        readonly internalType: "bytes";
    }, {
        readonly name: "_index";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "kernelTemplate";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "contract TempKernel";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "nextTemplate";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "contract Kernel";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "event";
    readonly name: "AccountCreated";
    readonly inputs: readonly [{
        readonly name: "account";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "validator";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "data";
        readonly type: "bytes";
        readonly indexed: false;
        readonly internalType: "bytes";
    }, {
        readonly name: "index";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }];
    readonly anonymous: false;
}];
//# sourceMappingURL=KernelFactoryV2Abi.d.ts.map