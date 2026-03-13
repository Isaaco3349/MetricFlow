"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create7702KernelAccountClient = void 0;
const account_abstraction_1 = require("viem/account-abstraction");
const clients_1 = require("@zerodev/sdk/clients");
function create7702KernelAccountClient(parameters) {
    return (0, clients_1.createKernelAccountClient)({
        ...parameters,
        account: parameters.account,
        userOperation: {
            ...parameters.userOperation,
            prepareUserOperation: async (opClient, opArgs) => {
                const authorization = opArgs.authorization ||
                    (await parameters.account.signAuthorization());
                const finalArgs = {
                    ...opArgs,
                    authorization
                };
                return await (0, account_abstraction_1.prepareUserOperation)(opClient, finalArgs);
            }
        }
    });
}
exports.create7702KernelAccountClient = create7702KernelAccountClient;
//# sourceMappingURL=kernel7702AccountClient.js.map