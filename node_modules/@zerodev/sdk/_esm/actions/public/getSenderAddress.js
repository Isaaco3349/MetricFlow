// Copied from: https://github.com/pimlicolabs/permissionless.js/blob/main/packages/permissionless/actions/public/getSenderAddress.ts
import { BaseError, ContractFunctionRevertedError, InvalidInputRpcError, RawContractError, RpcRequestError, UnknownRpcError, concat, decodeErrorResult } from "viem";
import { simulateContract } from "viem/actions";
import { getAction } from "viem/utils";
export class InvalidEntryPointError extends BaseError {
    constructor({ cause, entryPointAddress } = {}) {
        super(`The entry point address (\`entryPoint\`${entryPointAddress ? ` = ${entryPointAddress}` : ""}) is not a valid entry point. getSenderAddress did not revert with a SenderAddressResult error.`, {
            cause
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "InvalidEntryPointError"
        });
    }
}
/**
 * Returns the address of the account that will be deployed with the given init code.
 *
 * - Docs: https://docs.pimlico.io/permissionless/reference/public-actions/getSenderAddress
 *
 * @param client {@link Client} that you created using viem's createPublicClient.
 * @param args {@link GetSenderAddressParams} initCode & entryPoint
 * @returns Sender's Address
 *
 * @example
 * import { createPublicClient } from "viem"
 * import { getSenderAddress } from "permissionless/actions"
 *
 * const publicClient = createPublicClient({
 *      chain: goerli,
 *      transport: http("https://goerli.infura.io/v3/your-infura-key")
 * })
 *
 * const senderAddress = await getSenderAddress(publicClient, {
 *      initCode,
 *      entryPoint
 * })
 *
 * // Return '0x7a88a206ba40b37a8c07a2b5688cf8b287318b63'
 */
export const getSenderAddress = async (client, args) => {
    const { initCode, entryPointAddress, factory, factoryData } = args;
    if (!initCode && !factory && !factoryData) {
        throw new Error("Either `initCode` or `factory` and `factoryData` must be provided");
    }
    try {
        await getAction(client, simulateContract, "simulateContract")({
            address: entryPointAddress,
            abi: [
                {
                    inputs: [
                        {
                            internalType: "address",
                            name: "sender",
                            type: "address"
                        }
                    ],
                    name: "SenderAddressResult",
                    type: "error"
                },
                {
                    inputs: [
                        {
                            internalType: "bytes",
                            name: "initCode",
                            type: "bytes"
                        }
                    ],
                    name: "getSenderAddress",
                    outputs: [],
                    stateMutability: "nonpayable",
                    type: "function"
                }
            ],
            functionName: "getSenderAddress",
            args: [initCode || concat([factory, factoryData])]
        });
    }
    catch (e) {
        const revertError = e.walk((err) => err instanceof ContractFunctionRevertedError ||
            err instanceof RpcRequestError ||
            err instanceof InvalidInputRpcError ||
            err instanceof UnknownRpcError);
        if (!revertError) {
            // biome-ignore lint/suspicious/noExplicitAny:
            const cause = e.cause;
            const errorName = cause?.data?.errorName ?? "";
            if (errorName === "SenderAddressResult" &&
                cause?.data?.args &&
                cause?.data?.args[0]) {
                return cause.data?.args[0];
            }
        }
        if (revertError instanceof ContractFunctionRevertedError) {
            const errorName = revertError.data?.errorName ?? "";
            if (errorName === "SenderAddressResult" &&
                revertError.data?.args &&
                revertError.data?.args[0]) {
                return revertError.data?.args[0];
            }
        }
        if (revertError instanceof RpcRequestError) {
            const hexStringRegex = /0x[a-fA-F0-9]+/;
            // biome-ignore lint/suspicious/noExplicitAny:
            const match = revertError.cause.data.match(hexStringRegex);
            if (!match) {
                throw new Error("Failed to parse revert bytes from RPC response");
            }
            const data = match[0];
            const error = decodeErrorResult({
                abi: [
                    {
                        inputs: [
                            {
                                internalType: "address",
                                name: "sender",
                                type: "address"
                            }
                        ],
                        name: "SenderAddressResult",
                        type: "error"
                    }
                ],
                data
            });
            return error.args[0];
        }
        if (revertError instanceof InvalidInputRpcError) {
            const { data: data_ } = (e instanceof RawContractError
                ? e
                : e instanceof BaseError
                    ? e.walk((err) => "data" in err) || e.walk()
                    : {});
            const data = typeof data_ === "string" ? data_ : data_?.data;
            if (data === undefined) {
                throw new Error("Failed to parse revert bytes from RPC response");
            }
            const error = decodeErrorResult({
                abi: [
                    {
                        inputs: [
                            {
                                internalType: "address",
                                name: "sender",
                                type: "address"
                            }
                        ],
                        name: "SenderAddressResult",
                        type: "error"
                    }
                ],
                data
            });
            return error.args[0];
        }
        if (revertError instanceof UnknownRpcError) {
            const parsedBody = JSON.parse(
            // biome-ignore lint/suspicious/noExplicitAny:
            revertError.cause.body);
            const revertData = parsedBody.error.data;
            const hexStringRegex = /0x[a-fA-F0-9]+/;
            const match = revertData.match(hexStringRegex);
            if (!match) {
                throw new Error("Failed to parse revert bytes from RPC response");
            }
            const data = match[0];
            const error = decodeErrorResult({
                abi: [
                    {
                        inputs: [
                            {
                                internalType: "address",
                                name: "sender",
                                type: "address"
                            }
                        ],
                        name: "SenderAddressResult",
                        type: "error"
                    }
                ],
                data
            });
            return error.args[0];
        }
        throw e;
    }
    throw new InvalidEntryPointError({ entryPointAddress });
};
//# sourceMappingURL=getSenderAddress.js.map