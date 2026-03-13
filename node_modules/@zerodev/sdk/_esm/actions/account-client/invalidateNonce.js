import { sendUserOperation } from "viem/account-abstraction";
import { encodeFunctionData, getAction, parseAccount } from "viem/utils";
import { KernelV3AccountAbi } from "../../accounts/kernel/abi/kernel_v_3_0_0/KernelAccountAbi.js";
import { AccountNotFoundError } from "../../errors/index.js";
export async function invalidateNonce(client, args) {
    const { account: account_ = client.account, nonceToSet } = args;
    if (!account_)
        throw new AccountNotFoundError({
            docsPath: "/docs/actions/wallet/sendTransaction"
        });
    const account = parseAccount(account_);
    return await getAction(client, sendUserOperation, "sendUserOperation")({
        ...args,
        calls: [
            {
                to: account.address,
                data: encodeFunctionData({
                    abi: KernelV3AccountAbi,
                    functionName: "invalidateNonce",
                    args: [nonceToSet]
                }),
                value: 0n
            }
        ],
        account
    });
}
//# sourceMappingURL=invalidateNonce.js.map