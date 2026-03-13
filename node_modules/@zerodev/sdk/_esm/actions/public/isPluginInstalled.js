import { readContract } from "viem/actions";
import { getAction } from "viem/utils";
import { KernelModuleIsModuleInstalledAbi } from "../../accounts/kernel/abi/kernel_v_3_0_0/KernelModuleAbi.js";
/**
 * Returns whether a plugin is installed on the account.
 *
 * @param client - Client to use
 * @param args - {@link IsPluginInstalledParams} address and plugin details
 * @returns boolean indicating if plugin is installed
 *
 * @example
 * import { createPublicClient } from "viem"
 * import { isPluginInstalled } from "@zerodev/sdk"
 *
 * const client = createPublicClient({
 *      chain: mainnet,
 *      transport: http()
 * })
 *
 * const isInstalled = await isPluginInstalled(client, {
 *      address: accountAddress,
 *      plugin: {
 *          type: PLUGIN_TYPE.VALIDATOR,
 *          address: validatorAddress,
 *          data: "0x"
 *      }
 * })
 */
export const isPluginInstalled = async (client, args) => {
    const { address, plugin } = args;
    const { type, address: pluginAddress, data = "0x" } = plugin;
    try {
        return await getAction(client, readContract, "readContract")({
            address,
            abi: KernelModuleIsModuleInstalledAbi,
            functionName: "isModuleInstalled",
            args: [BigInt(type), pluginAddress, data]
        });
    }
    catch (error) {
        return false;
    }
};
//# sourceMappingURL=isPluginInstalled.js.map