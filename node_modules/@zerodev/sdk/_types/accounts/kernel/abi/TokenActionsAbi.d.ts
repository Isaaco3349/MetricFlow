export declare const TokenActionsAbi: readonly [{
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_token";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "_amount";
        readonly type: "uint256";
    }, {
        readonly internalType: "address";
        readonly name: "_to";
        readonly type: "address";
    }];
    readonly name: "transfer20Action";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_token";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "_id";
        readonly type: "uint256";
    }, {
        readonly internalType: "address";
        readonly name: "_to";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "amount";
        readonly type: "uint256";
    }, {
        readonly internalType: "bytes";
        readonly name: "data";
        readonly type: "bytes";
    }];
    readonly name: "transferERC1155Action";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_token";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "_id";
        readonly type: "uint256";
    }, {
        readonly internalType: "address";
        readonly name: "_to";
        readonly type: "address";
    }];
    readonly name: "transferERC721Action";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}];
//# sourceMappingURL=TokenActionsAbi.d.ts.map