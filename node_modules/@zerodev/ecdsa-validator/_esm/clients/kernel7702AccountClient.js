import { prepareUserOperation as viemPrepareUserOperation } from "viem/account-abstraction";
import { createKernelAccountClient } from "@zerodev/sdk/clients";
export function create7702KernelAccountClient(parameters) {
    return createKernelAccountClient({
        ...parameters,
        account: parameters.account,
        userOperation: {
            ...parameters.userOperation,
            prepareUserOperation: async (opClient, opArgs) => {
                // generate authorization only when account is not already authorized
                const authorization = opArgs.authorization ||
                    (await parameters.account.signAuthorization());
                const finalArgs = {
                    ...opArgs,
                    authorization
                };
                return await viemPrepareUserOperation(opClient, finalArgs);
            }
        }
    });
}
//# sourceMappingURL=kernel7702AccountClient.js.map