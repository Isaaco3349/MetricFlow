"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashKernelMessageHashWrapper = void 0;
const viem_1 = require("viem");
const hashKernelMessageHashWrapper = (messageHash) => {
    return (0, viem_1.keccak256)((0, viem_1.encodeAbiParameters)([{ type: "bytes32" }, { type: "bytes32" }], [(0, viem_1.keccak256)((0, viem_1.stringToHex)("Kernel(bytes32 hash)")), messageHash]));
};
exports.hashKernelMessageHashWrapper = hashKernelMessageHashWrapper;
//# sourceMappingURL=hashKernelSignatureWrapper.js.map