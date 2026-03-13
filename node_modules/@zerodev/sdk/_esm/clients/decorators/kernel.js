import { getKernelV3ModuleCurrentNonce } from "../../actions/account-client/getKernelV3ModuleCurrentNonce.js";
import { getUserOperationGasPrice } from "../../actions/account-client/getUserOperationGasPrice.js";
import { invalidateNonce } from "../../actions/account-client/invalidateNonce.js";
import { sendTransaction } from "../../actions/account-client/sendTransaction.js";
import { signMessage } from "../../actions/account-client/signMessage.js";
import { signTypedData } from "../../actions/account-client/signTypedData.js";
import { upgradeKernel } from "../../actions/account-client/upgradeKernel.js";
import { writeContract } from "../../actions/account-client/writeContract.js";
import { changeSudoValidator, signUserOperation, uninstallPlugin } from "../../actions/index.js";
import { estimateGasInERC20 } from "../../actions/paymaster/estimateGasInERC20.js";
import { sponsorUserOperation } from "../../actions/paymaster/sponsorUserOperation.js";
export const zerodevPaymasterActions = () => (client) => ({
    sponsorUserOperation: async (args) => sponsorUserOperation(client, {
        ...args
    }),
    estimateGasInERC20: async (args) => estimateGasInERC20(client, args)
});
export function kernelAccountClientActions() {
    return (client) => ({
        signUserOperation: (args) => signUserOperation(client, args),
        getUserOperationGasPrice: async () => getUserOperationGasPrice(client),
        uninstallPlugin: async (args) => uninstallPlugin(client, args),
        changeSudoValidator: async (args) => changeSudoValidator(client, args),
        invalidateNonce: async (args) => invalidateNonce(client, args),
        getKernelV3ModuleCurrentNonce: async () => getKernelV3ModuleCurrentNonce(client),
        upgradeKernel: async (args) => upgradeKernel(client, args),
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        sendTransaction: (args) => sendTransaction(client, args),
        signMessage: (args) => signMessage(client, args),
        signTypedData: (args) => signTypedData(client, args),
        writeContract: (args) => writeContract(client, args)
    });
}
//# sourceMappingURL=kernel.js.map