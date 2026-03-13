"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPluginInitialized = void 0;
const actions_1 = require("viem/actions");
const utils_1 = require("viem/utils");
const KernelModuleAbi_js_1 = require("../../../abi/kernel_v_3_0_0/KernelModuleAbi.js");
const isPluginInitialized = async (client, accountAddress, pluginAddress) => {
    try {
        return await (0, utils_1.getAction)(client, actions_1.readContract, "readContract")({
            abi: KernelModuleAbi_js_1.KernelModuleIsInitializedAbi,
            address: pluginAddress,
            functionName: "isInitialized",
            args: [accountAddress]
        });
    }
    catch (error) { }
    return false;
};
exports.isPluginInitialized = isPluginInitialized;
//# sourceMappingURL=isPluginInitialized.js.map