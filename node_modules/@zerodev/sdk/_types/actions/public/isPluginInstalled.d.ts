import type { Address, Client, Hex } from "viem";
import type { PLUGIN_TYPE } from "../../constants.js";
export type IsPluginInstalledParams = {
    address: Address;
    plugin: {
        type: (typeof PLUGIN_TYPE)[keyof typeof PLUGIN_TYPE];
        address: Address;
        data?: Hex;
    };
};
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
export declare const isPluginInstalled: (client: Client, args: IsPluginInstalledParams) => Promise<boolean>;
//# sourceMappingURL=isPluginInstalled.d.ts.map