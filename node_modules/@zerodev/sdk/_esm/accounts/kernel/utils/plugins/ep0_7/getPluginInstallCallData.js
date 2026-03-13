import { encodeFunctionData } from "viem";
import { KernelModuleInstallAbi } from "../../../abi/kernel_v_3_0_0/KernelModuleAbi.js";
export const getPluginInstallCallData = (accountAddress, plugin) => {
    const data = encodeFunctionData({
        abi: KernelModuleInstallAbi,
        functionName: "installModule",
        args: [plugin.type, plugin.address, plugin.data]
    });
    return {
        to: accountAddress,
        data
    };
};
//# sourceMappingURL=getPluginInstallCallData.js.map