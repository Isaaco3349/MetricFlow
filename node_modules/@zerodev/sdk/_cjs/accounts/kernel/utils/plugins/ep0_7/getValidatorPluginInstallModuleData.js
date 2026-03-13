"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValidatorPluginInstallModuleData = void 0;
const viem_1 = require("viem");
const constants_js_1 = require("../../../../../constants.js");
const utils_js_1 = require("../../../../../utils.js");
const getActionSelector_js_1 = require("../../common/getActionSelector.js");
const getValidatorPluginInstallModuleData = async ({ plugin, entryPoint, kernelVersion, hook, action }) => {
    if (!(0, utils_js_1.satisfiesRange)(kernelVersion, ">0.3.0")) {
        throw new Error("Kernel version must be greater than 0.3.0");
    }
    return {
        type: constants_js_1.PLUGIN_TYPE.VALIDATOR,
        address: plugin.address,
        data: (0, viem_1.concatHex)([
            hook?.getIdentifier() ?? viem_1.zeroAddress,
            (0, viem_1.encodeAbiParameters)((0, viem_1.parseAbiParameters)("bytes validatorData, bytes hookData, bytes selectorData"), [
                await plugin.getEnableData(),
                (await hook?.getEnableData()) ?? "0x",
                action?.selector ?? (0, getActionSelector_js_1.getActionSelector)(entryPoint.version)
            ])
        ])
    };
};
exports.getValidatorPluginInstallModuleData = getValidatorPluginInstallModuleData;
//# sourceMappingURL=getValidatorPluginInstallModuleData.js.map