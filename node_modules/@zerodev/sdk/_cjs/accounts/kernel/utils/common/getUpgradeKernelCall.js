"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpgradeKernelCall = void 0;
const viem_1 = require("viem");
const constants_js_1 = require("../../../../constants.js");
const utils_js_1 = require("../../../../utils.js");
const KernelAccountAbi_js_1 = require("../../abi/kernel_v_3_0_0/KernelAccountAbi.js");
function getUpgradeKernelCall(account, kernelVersion) {
    (0, utils_js_1.validateKernelVersionWithEntryPoint)(account.entryPoint.version, kernelVersion);
    const implementation = constants_js_1.KernelVersionToAddressesMap[kernelVersion].accountImplementationAddress;
    return {
        to: account.address,
        data: (0, viem_1.encodeFunctionData)({
            abi: KernelAccountAbi_js_1.KernelV3AccountAbi,
            functionName: "upgradeTo",
            args: [implementation]
        }),
        value: 0n
    };
}
exports.getUpgradeKernelCall = getUpgradeKernelCall;
//# sourceMappingURL=getUpgradeKernelCall.js.map