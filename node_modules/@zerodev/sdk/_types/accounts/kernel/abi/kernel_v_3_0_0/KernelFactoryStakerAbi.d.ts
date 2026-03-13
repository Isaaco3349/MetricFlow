export declare const KernelFactoryStakerAbi: readonly [{
    readonly type: "constructor";
    readonly inputs: readonly [{
        readonly name: "_owner";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "approveFactory";
    readonly inputs: readonly [{
        readonly name: "factory";
        readonly type: "address";
        readonly internalType: "contract KernelFactory";
    }, {
        readonly name: "approval";
        readonly type: "bool";
        readonly internalType: "bool";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly name: "approved";
    readonly inputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "contract KernelFactory";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
        readonly internalType: "bool";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "cancelOwnershipHandover";
    readonly inputs: readonly [];
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly name: "completeOwnershipHandover";
    readonly inputs: readonly [{
        readonly name: "pendingOwner";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly name: "deployWithFactory";
    readonly inputs: readonly [{
        readonly name: "factory";
        readonly type: "address";
        readonly internalType: "contract KernelFactory";
    }, {
        readonly name: "createData";
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
    readonly name: "owner";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "result";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "ownershipHandoverExpiresAt";
    readonly inputs: readonly [{
        readonly name: "pendingOwner";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "result";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "renounceOwnership";
    readonly inputs: readonly [];
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly name: "requestOwnershipHandover";
    readonly inputs: readonly [];
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly name: "stake";
    readonly inputs: readonly [{
        readonly name: "entryPoint";
        readonly type: "address";
        readonly internalType: "contract IEntryPoint";
    }, {
        readonly name: "unstakeDelay";
        readonly type: "uint32";
        readonly internalType: "uint32";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly name: "transferOwnership";
    readonly inputs: readonly [{
        readonly name: "newOwner";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly name: "unlockStake";
    readonly inputs: readonly [{
        readonly name: "entryPoint";
        readonly type: "address";
        readonly internalType: "contract IEntryPoint";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly name: "withdrawStake";
    readonly inputs: readonly [{
        readonly name: "entryPoint";
        readonly type: "address";
        readonly internalType: "contract IEntryPoint";
    }, {
        readonly name: "recipient";
        readonly type: "address";
        readonly internalType: "address payable";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
}, {
    readonly type: "event";
    readonly name: "OwnershipHandoverCanceled";
    readonly inputs: readonly [{
        readonly name: "pendingOwner";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "OwnershipHandoverRequested";
    readonly inputs: readonly [{
        readonly name: "pendingOwner";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "OwnershipTransferred";
    readonly inputs: readonly [{
        readonly name: "oldOwner";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "newOwner";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }];
    readonly anonymous: false;
}, {
    readonly type: "error";
    readonly name: "AlreadyInitialized";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "NewOwnerIsZeroAddress";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "NoHandoverRequest";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "NotApprovedFactory";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "Unauthorized";
    readonly inputs: readonly [];
}];
//# sourceMappingURL=KernelFactoryStakerAbi.d.ts.map