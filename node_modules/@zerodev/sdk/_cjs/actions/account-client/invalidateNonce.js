"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidateNonce = void 0;
const account_abstraction_1 = require("viem/account-abstraction");
const utils_1 = require("viem/utils");
const KernelAccountAbi_js_1 = require("../../accounts/kernel/abi/kernel_v_3_0_0/KernelAccountAbi.js");
const index_js_1 = require("../../errors/index.js");
async function invalidateNonce(client, args) {
    const { account: account_ = client.account, nonceToSet } = args;
    if (!account_)
        throw new index_js_1.AccountNotFoundError({
            docsPath: "/docs/actions/wallet/sendTransaction"
        });
    const account = (0, utils_1.parseAccount)(account_);
    return await (0, utils_1.getAction)(client, account_abstraction_1.sendUserOperation, "sendUserOperation")({
        ...args,
        calls: [
            {
                to: account.address,
                data: (0, utils_1.encodeFunctionData)({
                    abi: KernelAccountAbi_js_1.KernelV3AccountAbi,
                    functionName: "invalidateNonce",
                    args: [nonceToSet]
                }),
                value: 0n
            }
        ],
        account
    });
}
exports.invalidateNonce = invalidateNonce;
//# sourceMappingURL=invalidateNonce.js.map