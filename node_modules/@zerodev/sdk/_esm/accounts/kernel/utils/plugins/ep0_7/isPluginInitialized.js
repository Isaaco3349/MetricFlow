import { readContract } from "viem/actions";
import { getAction } from "viem/utils";
import { KernelModuleIsInitializedAbi } from "../../../abi/kernel_v_3_0_0/KernelModuleAbi.js";
export const isPluginInitialized = async (client, accountAddress, pluginAddress) => {
    try {
        return await getAction(client, readContract, "readContract")({
            abi: KernelModuleIsInitializedAbi,
            address: pluginAddress,
            functionName: "isInitialized",
            args: [accountAddress]
        });
    }
    catch (error) { }
    return false;
};
//# sourceMappingURL=isPluginInitialized.js.map