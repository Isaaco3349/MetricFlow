"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBulkOrderTreeHeight = getBulkOrderTreeHeight;
exports.getBulkOrderTree = getBulkOrderTree;
exports.getBulkOrderTypeHash = getBulkOrderTypeHash;
exports.getBulkOrderTypeHashes = getBulkOrderTypeHashes;
const ethers_1 = require("ethers");
const Eip712MerkleTree_1 = require("./Eip712MerkleTree");
const defaults_1 = require("./defaults");
const utils_1 = require("./utils");
const constants_1 = require("../../constants");
function getBulkOrderTypes(height) {
    const types = { ...constants_1.EIP_712_BULK_ORDER_TYPE };
    types.BulkOrder = [
        { name: "tree", type: `OrderComponents${`[2]`.repeat(height)}` },
    ];
    return types;
}
function getBulkOrderTreeHeight(length) {
    return Math.max(Math.ceil(Math.log2(length)), 1);
}
function getBulkOrderTree(orderComponents, startIndex = 0, height = getBulkOrderTreeHeight(orderComponents.length + startIndex)) {
    const types = getBulkOrderTypes(height);
    const defaultNode = defaults_1.DefaultGetter.from(types, "OrderComponents");
    let elements = [...orderComponents];
    if (startIndex > 0) {
        elements = [
            ...(0, utils_1.fillArray)([], startIndex, defaultNode),
            ...orderComponents,
        ];
    }
    const tree = new Eip712MerkleTree_1.Eip712MerkleTree(types, "BulkOrder", "OrderComponents", elements, height);
    return tree;
}
function getBulkOrderTypeHash(height) {
    const types = getBulkOrderTypes(height);
    const encoder = ethers_1.TypedDataEncoder.from(types);
    const typeString = (0, ethers_1.toUtf8Bytes)(encoder.types.BulkOrder[0].type);
    return (0, ethers_1.keccak256)(typeString);
}
function getBulkOrderTypeHashes(maxHeight) {
    const typeHashes = [];
    for (let i = 0; i < maxHeight; i++) {
        typeHashes.push(getBulkOrderTypeHash(i + 1));
    }
    return typeHashes;
}
//# sourceMappingURL=bulk-orders.js.map