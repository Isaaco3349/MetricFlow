import { readContract } from "viem/actions";
import { getAction, parseAccount } from "viem/utils";
import { KernelV3AccountAbi } from "../../accounts/kernel/abi/kernel_v_3_0_0/KernelAccountAbi.js";
import { AccountNotFoundError } from "../../errors/index.js";
export async function getKernelV3ModuleCurrentNonce(client) {
    const account_ = client.account;
    if (!account_)
        throw new AccountNotFoundError({
            docsPath: "/docs/actions/wallet/sendTransaction"
        });
    const account = parseAccount(account_);
    try {
        const nonce = await getAction(client, readContract, "readContract")({
            abi: KernelV3AccountAbi,
            address: account.address,
            functionName: "currentNonce",
            args: []
        });
        return nonce;
    }
    catch (error) {
        return 1;
    }
}
//# sourceMappingURL=getKernelV3ModuleCurrentNonce.js.map