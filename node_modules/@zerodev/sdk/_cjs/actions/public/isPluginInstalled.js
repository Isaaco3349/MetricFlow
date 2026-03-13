"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPluginInstalled = void 0;
const actions_1 = require("viem/actions");
const utils_1 = require("viem/utils");
const KernelModuleAbi_js_1 = require("../../accounts/kernel/abi/kernel_v_3_0_0/KernelModuleAbi.js");
const isPluginInstalled = async (client, args) => {
    const { address, plugin } = args;
    const { type, address: pluginAddress, data = "0x" } = plugin;
    try {
        return await (0, utils_1.getAction)(client, actions_1.readContract, "readContract")({
            address,
            abi: KernelModuleAbi_js_1.KernelModuleIsModuleInstalledAbi,
            functionName: "isModuleInstalled",
            args: [BigInt(type), pluginAddress, data]
        });
    }
    catch (error) {
        return false;
    }
};
exports.isPluginInstalled = isPluginInstalled;
//# sourceMappingURL=isPluginInstalled.js.map