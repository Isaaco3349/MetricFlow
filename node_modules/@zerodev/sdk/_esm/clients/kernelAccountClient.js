import { createClient } from "viem";
import { bundlerActions, prepareUserOperation } from "viem/account-abstraction";
import { getUserOperationGasPrice } from "../actions/index.js";
import { kernelAccountClientActions } from "./decorators/kernel.js";
export function createKernelAccountClient(parameters) {
    const { client: client_, key = "Account", name = "Kernel Account Client", paymaster, paymasterContext, bundlerTransport, userOperation } = parameters;
    const client = Object.assign(createClient({
        ...parameters,
        chain: parameters.chain ?? client_?.chain,
        transport: bundlerTransport,
        key,
        name,
        type: "kernelAccountClient",
        pollingInterval: parameters.pollingInterval ?? 1000
    }), { client: client_, paymaster, paymasterContext, userOperation });
    if (parameters.userOperation?.prepareUserOperation) {
        const customPrepareUserOp = parameters.userOperation.prepareUserOperation;
        return client
            .extend(bundlerActions)
            .extend((_client) => ({
            prepareUserOperation: (args) => {
                return customPrepareUserOp(_client, args);
            }
        }))
            .extend(bundlerActions)
            .extend((_client) => ({
            prepareUserOperation: (args) => {
                return customPrepareUserOp(_client, args);
            }
        }))
            .extend(kernelAccountClientActions());
    }
    if (!client.userOperation?.estimateFeesPerGas) {
        client.userOperation = {
            ...client.userOperation,
            estimateFeesPerGas: async ({ bundlerClient }) => {
                return await getUserOperationGasPrice(bundlerClient);
            }
        };
    }
    return client
        .extend(bundlerActions)
        .extend((_client) => ({
        prepareUserOperation: async (args) => {
            let _args = args;
            if (_client.account?.authorization) {
                const authorization = args.authorization ||
                    (await _client.account?.eip7702Authorization?.());
                _args = {
                    ...args,
                    authorization
                };
            }
            return await prepareUserOperation(_client, _args);
        }
    }))
        .extend(bundlerActions)
        .extend((_client) => ({
        prepareUserOperation: async (args) => {
            let _args = args;
            if (_client.account?.authorization) {
                const authorization = args.authorization ||
                    (await _client.account?.eip7702Authorization?.());
                _args = {
                    ...args,
                    authorization
                };
            }
            return await prepareUserOperation(_client, _args);
        }
    }))
        .extend(kernelAccountClientActions());
}
//# sourceMappingURL=kernelAccountClient.js.map