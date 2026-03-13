import { concatHex, encodeAbiParameters, parseAbiParameters, zeroAddress } from "viem";
import { PLUGIN_TYPE } from "../../../../../constants.js";
import { satisfiesRange } from "../../../../../utils.js";
import { getActionSelector } from "../../common/getActionSelector.js";
export const getValidatorPluginInstallModuleData = async ({ plugin, entryPoint, kernelVersion, hook, action }) => {
    if (!satisfiesRange(kernelVersion, ">0.3.0")) {
        throw new Error("Kernel version must be greater than 0.3.0");
    }
    return {
        type: PLUGIN_TYPE.VALIDATOR,
        address: plugin.address,
        data: concatHex([
            hook?.getIdentifier() ?? zeroAddress,
            encodeAbiParameters(parseAbiParameters("bytes validatorData, bytes hookData, bytes selectorData"), [
                await plugin.getEnableData(),
                (await hook?.getEnableData()) ?? "0x",
                action?.selector ?? getActionSelector(entryPoint.version)
            ])
        ])
    };
};
//# sourceMappingURL=getValidatorPluginInstallModuleData.js.map