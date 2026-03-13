import { concatHex, domainSeparator, keccak256 } from "viem";
import { KERNEL_FEATURES, hasKernelFeature } from "../../../../utils.js";
import { hashKernelMessageHashWrapper } from "../ep0_7/hashKernelSignatureWrapper.js";
export const eip712WrapHash = async (messageHash, domain, useReplayableSignature) => {
    const { name, version, chainId, verifyingContract } = domain;
    if (!hasKernelFeature(KERNEL_FEATURES.ERC1271_SIG_WRAPPER, version)) {
        return messageHash;
    }
    const _chainId = hasKernelFeature(KERNEL_FEATURES.ERC1271_REPLAYABLE, version) &&
        useReplayableSignature
        ? 0
        : chainId;
    const _domainSeparator = domainSeparator({
        domain: {
            name,
            version,
            chainId: _chainId,
            verifyingContract
        }
    });
    let finalMessageHash = messageHash;
    if (hasKernelFeature(KERNEL_FEATURES.ERC1271_SIG_WRAPPER_WITH_WRAPPED_HASH, version)) {
        finalMessageHash = hashKernelMessageHashWrapper(finalMessageHash);
    }
    const digest = keccak256(concatHex(["0x1901", _domainSeparator, finalMessageHash]));
    return digest;
};
//# sourceMappingURL=eip712WrapHash.js.map