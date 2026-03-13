"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eip712WrapHash = void 0;
const viem_1 = require("viem");
const utils_js_1 = require("../../../../utils.js");
const hashKernelSignatureWrapper_js_1 = require("../ep0_7/hashKernelSignatureWrapper.js");
const eip712WrapHash = async (messageHash, domain, useReplayableSignature) => {
    const { name, version, chainId, verifyingContract } = domain;
    if (!(0, utils_js_1.hasKernelFeature)(utils_js_1.KERNEL_FEATURES.ERC1271_SIG_WRAPPER, version)) {
        return messageHash;
    }
    const _chainId = (0, utils_js_1.hasKernelFeature)(utils_js_1.KERNEL_FEATURES.ERC1271_REPLAYABLE, version) &&
        useReplayableSignature
        ? 0
        : chainId;
    const _domainSeparator = (0, viem_1.domainSeparator)({
        domain: {
            name,
            version,
            chainId: _chainId,
            verifyingContract
        }
    });
    let finalMessageHash = messageHash;
    if ((0, utils_js_1.hasKernelFeature)(utils_js_1.KERNEL_FEATURES.ERC1271_SIG_WRAPPER_WITH_WRAPPED_HASH, version)) {
        finalMessageHash = (0, hashKernelSignatureWrapper_js_1.hashKernelMessageHashWrapper)(finalMessageHash);
    }
    const digest = (0, viem_1.keccak256)((0, viem_1.concatHex)(["0x1901", _domainSeparator, finalMessageHash]));
    return digest;
};
exports.eip712WrapHash = eip712WrapHash;
//# sourceMappingURL=eip712WrapHash.js.map