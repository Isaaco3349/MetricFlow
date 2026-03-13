"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomNonceKeyFromString = void 0;
const viem_1 = require("viem");
const hashAndTruncate = (input, byteSize) => {
    const hash = (0, viem_1.keccak256)((0, viem_1.toHex)(input));
    const truncatedHash = hash.substring(2, byteSize * 2 + 2);
    return BigInt(`0x${truncatedHash}`);
};
const getCustomNonceKeyFromString = (input, entryPointVersion) => {
    if (entryPointVersion === "0.6") {
        return hashAndTruncate(input, 24);
    }
    return hashAndTruncate(input, 2);
};
exports.getCustomNonceKeyFromString = getCustomNonceKeyFromString;
//# sourceMappingURL=getCustomNonceKeyFromString.js.map