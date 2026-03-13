import { zeroAddress } from "viem";
import { sendUserOperation } from "viem/account-abstraction";
import { concatHex, encodeFunctionData, getAction, pad, parseAccount } from "viem/utils";
import { KernelV3_1AccountAbi } from "../../accounts/kernel/abi/kernel_v_3_1/KernelAccountAbi.js";
import { KERNEL_V3_0, KERNEL_V3_1, KernelVersionToAddressesMap, VALIDATOR_TYPE } from "../../constants.js";
import { AccountNotFoundError } from "../../errors/index.js";
export async function changeSudoValidator(client, args) {
    const { sudoValidator, hook, ...restArgs } = args;
    const account_ = restArgs.account ?? client.account;
    if (!account_)
        throw new AccountNotFoundError({
            docsPath: "/docs/actions/wallet/sendTransaction"
        });
    const account = parseAccount(account_);
    let rootValidatorId;
    if ([
        VALIDATOR_TYPE.PERMISSION,
        VALIDATOR_TYPE.SECONDARY,
        VALIDATOR_TYPE.EIP7702
    ].includes(VALIDATOR_TYPE[sudoValidator.validatorType])) {
        rootValidatorId = concatHex([
            VALIDATOR_TYPE[sudoValidator.validatorType],
            pad(sudoValidator.getIdentifier(), {
                size: 20,
                dir: "right"
            })
        ]);
    }
    else {
        throw new Error(`Cannot change sudo validator to type ${sudoValidator.validatorType}`);
    }
    const validatorData = await sudoValidator.getEnableData(account.address);
    const hookId = hook?.getIdentifier() ?? zeroAddress;
    const hookData = (await hook?.getEnableData(account.address)) ?? "0x";
    /**
     * @dev Kernel v3.0 does not support changeRootValidator directly, so we need to use delegatecall to call changeRootValidator on Kernel v3.1 implementation contract
     */
    if (account.kernelVersion === KERNEL_V3_0) {
        return await getAction(client, sendUserOperation, "sendUserOperation")({
            ...restArgs,
            callData: await account.encodeCalls([
                {
                    to: KernelVersionToAddressesMap[KERNEL_V3_1]
                        .accountImplementationAddress,
                    value: 0n,
                    data: encodeFunctionData({
                        abi: KernelV3_1AccountAbi,
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
    /**
     * @dev Kernel v3.1 supports changeRootValidator directly
     */
    return await getAction(client, sendUserOperation, "sendUserOperation")({
        ...restArgs,
        callData: await account.encodeCalls([
            {
                to: account.address,
                value: 0n,
                data: encodeFunctionData({
                    abi: KernelV3_1AccountAbi,
                    functionName: "changeRootValidator",
                    args: [rootValidatorId, hookId, validatorData, hookData]
                })
            }
        ])
    });
}
//# sourceMappingURL=changeSudoValidator.js.map