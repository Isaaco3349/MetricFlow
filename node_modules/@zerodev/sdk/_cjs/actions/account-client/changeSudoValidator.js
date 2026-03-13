"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeSudoValidator = void 0;
const viem_1 = require("viem");
const account_abstraction_1 = require("viem/account-abstraction");
const utils_1 = require("viem/utils");
const KernelAccountAbi_js_1 = require("../../accounts/kernel/abi/kernel_v_3_1/KernelAccountAbi.js");
const constants_js_1 = require("../../constants.js");
const index_js_1 = require("../../errors/index.js");
async function changeSudoValidator(client, args) {
    const { sudoValidator, hook, ...restArgs } = args;
    const account_ = restArgs.account ?? client.account;
    if (!account_)
        throw new index_js_1.AccountNotFoundError({
            docsPath: "/docs/actions/wallet/sendTransaction"
        });
    const account = (0, utils_1.parseAccount)(account_);
    let rootValidatorId;
    if ([
        constants_js_1.VALIDATOR_TYPE.PERMISSION,
        constants_js_1.VALIDATOR_TYPE.SECONDARY,
        constants_js_1.VALIDATOR_TYPE.EIP7702
    ].includes(constants_js_1.VALIDATOR_TYPE[sudoValidator.validatorType])) {
        rootValidatorId = (0, utils_1.concatHex)([
            constants_js_1.VALIDATOR_TYPE[sudoValidator.validatorType],
            (0, utils_1.pad)(sudoValidator.getIdentifier(), {
                size: 20,
                dir: "right"
            })
        ]);
    }
    else {
        throw new Error(`Cannot change sudo validator to type ${sudoValidator.validatorType}`);
    }
    const validatorData = await sudoValidator.getEnableData(account.address);
    const hookId = hook?.getIdentifier() ?? viem_1.zeroAddress;
    const hookData = (await hook?.getEnableData(account.address)) ?? "0x";
    if (account.kernelVersion === constants_js_1.KERNEL_V3_0) {
        return await (0, utils_1.getAction)(client, account_abstraction_1.sendUserOperation, "sendUserOperation")({
            ...restArgs,
            callData: await account.encodeCalls([
                {
                    to: constants_js_1.KernelVersionToAddressesMap[constants_js_1.KERNEL_V3_1]
                        .accountImplementationAddress,
                    value: 0n,
                    data: (0, utils_1.encodeFunctionData)({
                        abi: KernelAccountAbi_js_1.KernelV3_1AccountAbi,
                        functionName: "changeRootValidator",
                        args: [
                            rootValidatorId,
                            hookId,
                            validatorData,
                            hookData
                        ]
                    })
                }
            ], "delegatecall")
        });
    }
    return await (0, utils_1.getAction)(client, account_abstraction_1.sendUserOperation, "sendUserOperation")({
        ...restArgs,
        callData: await account.encodeCalls([
            {
                to: account.address,
                value: 0n,
                data: (0, utils_1.encodeFunctionData)({
                    abi: KernelAccountAbi_js_1.KernelV3_1AccountAbi,
                    functionName: "changeRootValidator",
                    args: [rootValidatorId, hookId, validatorData, hookData]
                })
            }
        ])
    });
}
exports.changeSudoValidator = changeSudoValidator;
//# sourceMappingURL=changeSudoValidator.js.map