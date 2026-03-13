import { sendUserOperation } from "viem/account-abstraction";
import { getAction, parseAccount } from "viem/utils";
import { getUpgradeKernelCall } from "../../accounts/kernel/utils/common/getUpgradeKernelCall.js";
import { AccountNotFoundError } from "../../errors/index.js";
export async function upgradeKernel(client, args) {
    const { account: account_ = client.account, kernelVersion } = args;
    if (!account_)
        throw new AccountNotFoundError({
            docsPath: "/docs/actions/wallet/sendTransaction"
        });
    const account = parseAccount(account_);
    const call = getUpgradeKernelCall(account, kernelVersion);
    return await getAction(client, sendUserOperation, "sendUserOperation")({
        ...args,
        calls: [call],
        account
    });
}
//# sourceMappingURL=upgradeKernel.js.map