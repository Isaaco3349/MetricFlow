export declare const SafeCreateCallAbi: readonly [{
    readonly name: "performCreate";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly type: "uint256";
        readonly name: "value";
    }, {
        readonly type: "bytes";
        readonly name: "deploymentData";
    }];
    readonly outputs: readonly [{
        readonly type: "address";
        readonly name: "newContract";
    }];
}, {
    readonly name: "performCreate2";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly type: "uint256";
        readonly name: "value";
    }, {
        readonly type: "bytes";
        readonly name: "deploymentData";
    }, {
        readonly type: "bytes32";
        readonly name: "salt";
    }];
    readonly outputs: readonly [{
        readonly type: "address";
        readonly name: "newContract";
    }];
}];
//# sourceMappingURL=SafeCreateCallAbi.d.ts.map