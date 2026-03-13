"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPluginInstallCallData = void 0;
const viem_1 = require("viem");
const KernelModuleAbi_js_1 = require("../../../abi/kernel_v_3_0_0/KernelModuleAbi.js");
const getPluginInstallCallData = (accountAddress, plugin) => {
    const data = (0, viem_1.encodeFunctionData)({
        abi: KernelModuleAbi_js_1.KernelModuleInstallAbi,
        functionName: "installModule",
        args: [plugin.type, plugin.address, plugin.data]
    });
    return {
        to: accountAddress,
        data
    };
};
exports.getPluginInstallCallData = getPluginInstallCallData;
//# sourceMappingURL=getPluginInstallCallData.js.map