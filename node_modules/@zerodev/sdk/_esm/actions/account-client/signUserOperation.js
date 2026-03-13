import { prepareUserOperation } from "viem/account-abstraction";
import { getAction, parseAccount } from "viem/utils";
import { AccountNotFoundError } from "../../errors/index.js";
export async function signUserOperation(client, args) {
    const { account: account_ = client.account } = args;
    if (!account_)
        throw new AccountNotFoundError({
            docsPath: "/docs/actions/wallet/sendTransaction"
        });
    const account = parseAccount(account_);
    const userOperation = await getAction(client, prepareUserOperation, "prepareUserOperation")({ ...args, account });
    userOperation.signature = await account.signUserOperation(userOperation);
    return userOperation;
}
//# sourceMappingURL=signUserOperation.js.map