"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upgradeKernel = void 0;
const account_abstraction_1 = require("viem/account-abstraction");
const utils_1 = require("viem/utils");
const getUpgradeKernelCall_js_1 = require("../../accounts/kernel/utils/common/getUpgradeKernelCall.js");
const index_js_1 = require("../../errors/index.js");
async function upgradeKernel(client, args) {
    const { account: account_ = client.account, kernelVersion } = args;
    if (!account_)
        throw new index_js_1.AccountNotFoundError({
            docsPath: "/docs/actions/wallet/sendTransaction"
        });
    const account = (0, utils_1.parseAccount)(account_);
    const call = (0, getUpgradeKernelCall_js_1.getUpgradeKernelCall)(account, kernelVersion);
    return await (0, utils_1.getAction)(client, account_abstraction_1.sendUserOperation, "sendUserOperation")({
        ...args,
        calls: [call],
        account
    });
}
exports.upgradeKernel = upgradeKernel;
//# sourceMappingURL=upgradeKernel.js.map