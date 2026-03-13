"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUserOperation = void 0;
const account_abstraction_1 = require("viem/account-abstraction");
const utils_1 = require("viem/utils");
const index_js_1 = require("../../errors/index.js");
async function signUserOperation(client, args) {
    const { account: account_ = client.account } = args;
    if (!account_)
        throw new index_js_1.AccountNotFoundError({
            docsPath: "/docs/actions/wallet/sendTransaction"
        });
    const account = (0, utils_1.parseAccount)(account_);
    const userOperation = await (0, utils_1.getAction)(client, account_abstraction_1.prepareUserOperation, "prepareUserOperation")({ ...args, account });
    userOperation.signature = await account.signUserOperation(userOperation);
    return userOperation;
}
exports.signUserOperation = signUserOperation;
//# sourceMappingURL=signUserOperation.js.map