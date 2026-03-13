"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepHexlify = exports.satisfiesRange = exports.validateKernelVersionWithEntryPoint = exports.getExecMode = exports.fixSignedData = exports.getERC20PaymasterApproveCall = exports.hasKernelFeature = exports.KERNEL_FEATURES_BY_VERSION = exports.KERNEL_FEATURES = void 0;
const semver_1 = require("semver");
const viem_1 = require("viem");
var KERNEL_FEATURES;
(function (KERNEL_FEATURES) {
    KERNEL_FEATURES["ERC1271_SIG_WRAPPER"] = "ERC1271_SIG_WRAPPER";
    KERNEL_FEATURES["ERC1271_WITH_VALIDATOR"] = "ERC1271_WITH_VALIDATOR";
    KERNEL_FEATURES["ERC1271_SIG_WRAPPER_WITH_WRAPPED_HASH"] = "ERC1271_SIG_WRAPPER_WITH_WRAPPED_HASH";
    KERNEL_FEATURES["ERC1271_REPLAYABLE"] = "ERC1271_REPLAYABLE";
})(KERNEL_FEATURES || (exports.KERNEL_FEATURES = KERNEL_FEATURES = {}));
exports.KERNEL_FEATURES_BY_VERSION = {
    [KERNEL_FEATURES.ERC1271_SIG_WRAPPER]: ">=0.2.3 || >=0.3.0-beta",
    [KERNEL_FEATURES.ERC1271_WITH_VALIDATOR]: ">=0.3.0-beta",
    [KERNEL_FEATURES.ERC1271_SIG_WRAPPER_WITH_WRAPPED_HASH]: ">=0.3.0-beta",
    [KERNEL_FEATURES.ERC1271_REPLAYABLE]: ">=0.3.2"
};
const hasKernelFeature = (feature, version) => {
    if (!(feature in exports.KERNEL_FEATURES_BY_VERSION)) {
        return false;
    }
    return (0, semver_1.satisfies)(version, exports.KERNEL_FEATURES_BY_VERSION[feature]);
};
exports.hasKernelFeature = hasKernelFeature;
const getERC20PaymasterApproveCall = async (client, { gasToken, approveAmount, entryPoint }) => {
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
        data: (0, viem_1.encodeFunctionData)({
            abi: viem_1.erc20Abi,
            functionName: "approve",
            args: [response[0], approveAmount]
        }),
        value: 0n
    };
};
exports.getERC20PaymasterApproveCall = getERC20PaymasterApproveCall;
const fixSignedData = (sig) => {
    let signature = sig;
    if (!(0, viem_1.isHex)(signature)) {
        signature = `0x${signature}`;
        if (!(0, viem_1.isHex)(signature)) {
            throw new Error(`Invalid signed data ${sig}`);
        }
    }
    let { r, s, v } = (0, viem_1.hexToSignature)(signature);
    if (v === 0n || v === 1n)
        v += 27n;
    const joined = (0, viem_1.signatureToHex)({ r, s, v: v });
    return joined;
};
exports.fixSignedData = fixSignedData;
const getExecMode = ({ callType, execType }) => {
    return (0, viem_1.concatHex)([
        callType,
        execType,
        "0x00000000",
        "0x00000000",
        (0, viem_1.pad)("0x00000000", { size: 22 })
    ]);
};
exports.getExecMode = getExecMode;
const validateKernelVersionWithEntryPoint = (entryPointVersion, kernelVersion) => {
    if ((entryPointVersion === "0.6" &&
        !(0, semver_1.satisfies)(kernelVersion, ">=0.2.2 || <=0.2.4")) ||
        (entryPointVersion === "0.7" && !(0, semver_1.satisfies)(kernelVersion, ">=0.3.0"))) {
        throw new Error("KernelVersion should be >= 0.2.2 and <= 0.2.4 for EntryPointV0.6 and >= 0.3.0 for EntryPointV0.7");
    }
};
exports.validateKernelVersionWithEntryPoint = validateKernelVersionWithEntryPoint;
const satisfiesRange = (version, range) => {
    return (0, semver_1.satisfies)(version, range);
};
exports.satisfiesRange = satisfiesRange;
function deepHexlify(obj) {
    if (typeof obj === "function") {
        return undefined;
    }
    if (obj == null || typeof obj === "string" || typeof obj === "boolean") {
        return obj;
    }
    if (typeof obj === "bigint" || typeof obj === "number") {
        return (0, viem_1.toHex)(obj);
    }
    if (obj._isBigNumber != null || typeof obj !== "object") {
        return (0, viem_1.toHex)(obj).replace(/^0x0/, "0x");
    }
    if (Array.isArray(obj)) {
        return obj.map((member) => deepHexlify(member));
    }
    return Object.keys(obj).reduce((set, key) => {
        set[key] = deepHexlify(obj[key]);
        return set;
    }, {});
}
exports.deepHexlify = deepHexlify;
//# sourceMappingURL=utils.js.map