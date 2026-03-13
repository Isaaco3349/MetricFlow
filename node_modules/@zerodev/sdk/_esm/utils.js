import { satisfies } from "semver";
import { concatHex, encodeFunctionData, erc20Abi, hexToSignature, isHex, pad, signatureToHex, toHex } from "viem";
export var KERNEL_FEATURES;
(function (KERNEL_FEATURES) {
    KERNEL_FEATURES["ERC1271_SIG_WRAPPER"] = "ERC1271_SIG_WRAPPER";
    KERNEL_FEATURES["ERC1271_WITH_VALIDATOR"] = "ERC1271_WITH_VALIDATOR";
    KERNEL_FEATURES["ERC1271_SIG_WRAPPER_WITH_WRAPPED_HASH"] = "ERC1271_SIG_WRAPPER_WITH_WRAPPED_HASH";
    KERNEL_FEATURES["ERC1271_REPLAYABLE"] = "ERC1271_REPLAYABLE";
})(KERNEL_FEATURES || (KERNEL_FEATURES = {}));
export const KERNEL_FEATURES_BY_VERSION = {
    [KERNEL_FEATURES.ERC1271_SIG_WRAPPER]: ">=0.2.3 || >=0.3.0-beta",
    [KERNEL_FEATURES.ERC1271_WITH_VALIDATOR]: ">=0.3.0-beta",
    [KERNEL_FEATURES.ERC1271_SIG_WRAPPER_WITH_WRAPPED_HASH]: ">=0.3.0-beta",
    [KERNEL_FEATURES.ERC1271_REPLAYABLE]: ">=0.3.2"
};
export const hasKernelFeature = (feature, version) => {
    if (!(feature in KERNEL_FEATURES_BY_VERSION)) {
        return false;
    }
    return satisfies(version, KERNEL_FEATURES_BY_VERSION[feature]);
};
export const getERC20PaymasterApproveCall = async (client, { gasToken, approveAmount, entryPoint }) => {
    const response = await client.request({
        method: "zd_pm_accounts",
        params: [
            {
                chainId: client.chain?.id,
                entryPointAddress: entryPoint.address
            }
        ]
    });
    return {
        to: gasToken,
        data: encodeFunctionData({
            abi: erc20Abi,
            functionName: "approve",
            args: [response[0], approveAmount]
        }),
        value: 0n
    };
};
export const fixSignedData = (sig) => {
    let signature = sig;
    if (!isHex(signature)) {
        signature = `0x${signature}`;
        if (!isHex(signature)) {
            throw new Error(`Invalid signed data ${sig}`);
        }
    }
    let { r, s, v } = hexToSignature(signature);
    if (v === 0n || v === 1n)
        v += 27n;
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    const joined = signatureToHex({ r, s, v: v });
    return joined;
};
export const getExecMode = ({ callType, execType }) => {
    return concatHex([
        callType, // 1 byte
        execType, // 1 byte
        "0x00000000", // 4 bytes
        "0x00000000", // 4 bytes
        pad("0x00000000", { size: 22 })
    ]);
};
export const validateKernelVersionWithEntryPoint = (entryPointVersion, kernelVersion) => {
    if ((entryPointVersion === "0.6" &&
        !satisfies(kernelVersion, ">=0.2.2 || <=0.2.4")) ||
        (entryPointVersion === "0.7" && !satisfies(kernelVersion, ">=0.3.0"))) {
        throw new Error("KernelVersion should be >= 0.2.2 and <= 0.2.4 for EntryPointV0.6 and >= 0.3.0 for EntryPointV0.7");
    }
};
export const satisfiesRange = (version, range) => {
    return satisfies(version, range);
};
// biome-ignore lint/suspicious/noExplicitAny: it's a recursive function, so it's hard to type
export function deepHexlify(obj) {
    if (typeof obj === "function") {
        return undefined;
    }
    if (obj == null || typeof obj === "string" || typeof obj === "boolean") {
        return obj;
    }
    if (typeof obj === "bigint" || typeof obj === "number") {
        return toHex(obj);
    }
    if (obj._isBigNumber != null || typeof obj !== "object") {
        return toHex(obj).replace(/^0x0/, "0x");
    }
    if (Array.isArray(obj)) {
        return obj.map((member) => deepHexlify(member));
    }
    return Object.keys(obj).reduce(
    // biome-ignore lint/suspicious/noExplicitAny: it's a recursive function, so it's hard to type
    (set, key) => {
        set[key] = deepHexlify(obj[key]);
        return set;
    }, {});
}
//# sourceMappingURL=utils.js.map