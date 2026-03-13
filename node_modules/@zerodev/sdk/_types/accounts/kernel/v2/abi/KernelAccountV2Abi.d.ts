export declare const KernelAccountV2Abi: readonly [{
    readonly type: "constructor";
    readonly inputs: readonly [{
        readonly name: "_entryPoint";
        readonly type: "address";
        readonly internalType: "contract IEntryPoint";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "fallback";
    readonly stateMutability: "payable";
}, {
    readonly type: "receive";
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly name: "disableMode";
    readonly inputs: readonly [{
        readonly name: "_disableFlag";
        readonly type: "bytes4";
        readonly internalType: "bytes4";
    }];
    readonly outputs: readonly [];
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
    readonly name: "execute";
    readonly inputs: readonly [{
        readonly name: "to";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "value";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "data";
        readonly type: "bytes";
        readonly internalType: "bytes";
    }, {
        readonly name: "operation";
        readonly type: "uint8";
        readonly internalType: "enum Operation";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "getDefaultValidator";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "contract IKernelValidator";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "getDisabledMode";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bytes4";
        readonly internalType: "bytes4";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "getExecution";
    readonly inputs: readonly [{
        readonly name: "_selector";
        readonly type: "bytes4";
        readonly internalType: "bytes4";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "tuple";
        readonly internalType: "struct ExecutionDetail";
        readonly components: readonly [{
            readonly name: "validUntil";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "validAfter";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "executor";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "validator";
            readonly type: "address";
            readonly internalType: "contract IKernelValidator";
        }];
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "getLastDisabledTime";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint48";
        readonly internalType: "uint48";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "getNonce";
    readonly inputs: readonly [{
        readonly name: "key";
        readonly type: "uint192";
        readonly internalType: "uint192";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "getNonce";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "initialize";
    readonly inputs: readonly [{
        readonly name: "_defaultValidator";
        readonly type: "address";
        readonly internalType: "contract IKernelValidator";
    }, {
        readonly name: "_data";
        readonly type: "bytes";
        readonly internalType: "bytes";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "isValidSignature";
    readonly inputs: readonly [{
        readonly name: "hash";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }, {
        readonly name: "signature";
        readonly type: "bytes";
        readonly internalType: "bytes";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bytes4";
        readonly internalType: "bytes4";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "name";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "string";
        readonly internalType: "string";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "onERC1155BatchReceived";
    readonly inputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "";
        readonly type: "uint256[]";
        readonly internalType: "uint256[]";
    }, {
        readonly name: "";
        readonly type: "uint256[]";
        readonly internalType: "uint256[]";
    }, {
        readonly name: "";
        readonly type: "bytes";
        readonly internalType: "bytes";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bytes4";
        readonly internalType: "bytes4";
    }];
    readonly stateMutability: "pure";
}, {
    readonly type: "function";
    readonly name: "onERC1155Received";
    readonly inputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "";
        readonly type: "bytes";
        readonly internalType: "bytes";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bytes4";
        readonly internalType: "bytes4";
    }];
    readonly stateMutability: "pure";
}, {
    readonly type: "function";
    readonly name: "onERC721Received";
    readonly inputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "";
        readonly type: "bytes";
        readonly internalType: "bytes";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bytes4";
        readonly internalType: "bytes4";
    }];
    readonly stateMutability: "pure";
}, {
    readonly type: "function";
    readonly name: "setDefaultValidator";
    readonly inputs: readonly [{
        readonly name: "_defaultValidator";
        readonly type: "address";
        readonly internalType: "contract IKernelValidator";
    }, {
        readonly name: "_data";
        readonly type: "bytes";
        readonly internalType: "bytes";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "setExecution";
    readonly inputs: readonly [{
        readonly name: "_selector";
        readonly type: "bytes4";
        readonly internalType: "bytes4";
    }, {
        readonly name: "_executor";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "_validator";
        readonly type: "address";
        readonly internalType: "contract IKernelValidator";
    }, {
        readonly name: "_validUntil";
        readonly type: "uint48";
        readonly internalType: "uint48";
    }, {
        readonly name: "_validAfter";
        readonly type: "uint48";
        readonly internalType: "uint48";
    }, {
        readonly name: "_enableData";
        readonly type: "bytes";
        readonly internalType: "bytes";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "upgradeTo";
    readonly inputs: readonly [{
        readonly name: "_newImplementation";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "validateUserOp";
    readonly inputs: readonly [{
        readonly name: "userOp";
        readonly type: "tuple";
        readonly internalType: "struct UserOperation";
        readonly components: readonly [{
            readonly name: "sender";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "nonce";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "initCode";
            readonly type: "bytes";
            readonly internalType: "bytes";
        }, {
            readonly name: "callData";
            readonly type: "bytes";
            readonly internalType: "bytes";
        }, {
            readonly name: "callGasLimit";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "verificationGasLimit";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "preVerificationGas";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "maxFeePerGas";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "maxPriorityFeePerGas";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "paymasterAndData";
            readonly type: "bytes";
            readonly internalType: "bytes";
        }, {
            readonly name: "signature";
            readonly type: "bytes";
            readonly internalType: "bytes";
        }];
    }, {
        readonly name: "userOpHash";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }, {
        readonly name: "missingAccountFunds";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "validationData";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "version";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "string";
        readonly internalType: "string";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "event";
    readonly name: "DefaultValidatorChanged";
    readonly inputs: readonly [{
        readonly name: "oldValidator";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "newValidator";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "ExecutionChanged";
    readonly inputs: readonly [{
        readonly name: "selector";
        readonly type: "bytes4";
        readonly indexed: true;
        readonly internalType: "bytes4";
    }, {
        readonly name: "executor";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "validator";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "Upgraded";
    readonly inputs: readonly [{
        readonly name: "newImplementation";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }];
    readonly anonymous: false;
}];
//# sourceMappingURL=KernelAccountV2Abi.d.ts.map