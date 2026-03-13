"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValidatorPluginInstallCallData = void 0;
const viem_1 = require("viem");
const constants_js_1 = require("../../../../../constants.js");
const KernelAccountAbi_js_1 = require("../../../abi/kernel_v_3_1/KernelAccountAbi.js");
const getValidatorPluginInstallCallData = (accountAddress, plugin, nonce) => {
    const vIds = [(0, viem_1.concatHex)([constants_js_1.VALIDATOR_TYPE.SECONDARY, plugin.address])];
    const configs = [{ nonce, hook: viem_1.zeroAddress }];
    const validationData = [plugin.data];
    const hookData = ["0x"];
    const data = (0, viem_1.encodeFunctionData)({
        abi: KernelAccountAbi_js_1.KernelV3_1AccountAbi,
        functionName: "installValidations",
        args: [vIds, configs, validationData, hookData]
    });
    return {
        to: accountAddress,
        data
    };
};
exports.getValidatorPluginInstallCallData = getValidatorPluginInstallCallData;
//# sourceMappingURL=getValidatorPluginInstallCallData.js.map