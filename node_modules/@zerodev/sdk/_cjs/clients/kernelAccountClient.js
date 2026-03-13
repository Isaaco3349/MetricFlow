"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createKernelAccountClient = void 0;
const viem_1 = require("viem");
const account_abstraction_1 = require("viem/account-abstraction");
const index_js_1 = require("../actions/index.js");
const kernel_js_1 = require("./decorators/kernel.js");
function createKernelAccountClient(parameters) {
    const { client: client_, key = "Account", name = "Kernel Account Client", paymaster, paymasterContext, bundlerTransport, userOperation } = parameters;
    const client = Object.assign((0, viem_1.createClient)({
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
            .extend(account_abstraction_1.bundlerActions)
            .extend((_client) => ({
            prepareUserOperation: (args) => {
                return customPrepareUserOp(_client, args);
            }
        }))
            .extend(account_abstraction_1.bundlerActions)
            .extend((_client) => ({
            prepareUserOperation: (args) => {
                return customPrepareUserOp(_client, args);
            }
        }))
            .extend((0, kernel_js_1.kernelAccountClientActions)());
    }
    if (!client.userOperation?.estimateFeesPerGas) {
        client.userOperation = {
            ...client.userOperation,
            estimateFeesPerGas: async ({ bundlerClient }) => {
                return await (0, index_js_1.getUserOperationGasPrice)(bundlerClient);
            }
        };
    }
    return client
        .extend(account_abstraction_1.bundlerActions)
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
            return await (0, account_abstraction_1.prepareUserOperation)(_client, _args);
        }
    }))
        .extend(account_abstraction_1.bundlerActions)
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
            return await (0, account_abstraction_1.prepareUserOperation)(_client, _args);
        }
    }))
        .extend((0, kernel_js_1.kernelAccountClientActions)());
}
exports.createKernelAccountClient = createKernelAccountClient;
//# sourceMappingURL=kernelAccountClient.js.map