"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uninstallPlugin = void 0;
const account_abstraction_1 = require("viem/account-abstraction");
const utils_1 = require("viem/utils");
const KernelAccountAbi_js_1 = require("../../accounts/kernel/abi/kernel_v_3_0_0/KernelAccountAbi.js");
const constants_js_1 = require("../../constants.js");
const index_js_1 = require("../../errors/index.js");
async function uninstallPlugin(client, args) {
    const { account: account_ = client.account, plugin, hook, ...restArgs } = args;
    if (!account_)
        throw new index_js_1.AccountNotFoundError({
            docsPath: "/docs/actions/wallet/sendTransaction"
        });
    const account = (0, utils_1.parseAccount)(account_);
    let validatorId;
    if ([
        constants_js_1.VALIDATOR_TYPE.PERMISSION,
        constants_js_1.VALIDATOR_TYPE.SECONDARY,
        constants_js_1.VALIDATOR_TYPE.EIP7702
    ].includes(constants_js_1.VALIDATOR_TYPE[plugin.validatorType])) {
        validatorId = (0, utils_1.concatHex)([
            constants_js_1.VALIDATOR_TYPE[plugin.validatorType],
            (0, utils_1.pad)(plugin.getIdentifier(), {
                size: 20,
                dir: "right"
            })
        ]);
    }
    else {
        throw new Error(`Cannot uninstall ${plugin.validatorType} plugin`);
    }
    const validatorData = await plugin.getEnableData(account.address);
    const hookData = (await hook?.getEnableData(account.address)) ?? "0x";
    return await (0, utils_1.getAction)(client, account_abstraction_1.sendUserOperation, "sendUserOperation")({
        ...restArgs,
        calls: [
            {
                to: account.address,
                data: (0, utils_1.encodeFunctionData)({
                    abi: KernelAccountAbi_js_1.KernelV3AccountAbi,
                    functionName: "uninstallValidation",
                    args: [validatorId, validatorData, hookData]
                }),
                value: 0n
            }
        ],
        account
    });
}
exports.uninstallPlugin = uninstallPlugin;
//# sourceMappingURL=uninstallPlugin.js.map