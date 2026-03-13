import { decodeFunctionResult, encodeFunctionData, publicActions } from "viem";
import { KERNEL_NAME } from "../../../../constants.js";
import { EIP1271Abi } from "../../abi/EIP1271Abi.js";
export const accountMetadata = async (client, accountAddress, kernelVersion, chainId) => {
    try {
        const domain = await client.request({
            method: "eth_call",
            params: [
                {
                    to: accountAddress,
                    data: encodeFunctionData({
                        abi: EIP1271Abi,
                        functionName: "eip712Domain"
                    })
                },
                "latest"
            ]
        });
        if (domain !== "0x") {
            const decoded = decodeFunctionResult({
                abi: [...EIP1271Abi],
                functionName: "eip712Domain",
                data: domain
            });
            return {
                name: decoded[1],
                version: decoded[2],
                chainId: decoded[3]
            };
        }
    }
    catch (error) { }
    return {
        name: KERNEL_NAME,
        version: kernelVersion === "0.3.0" ? "0.3.0-beta" : kernelVersion,
        chainId: BigInt(chainId ??
            (client.chain
                ? client.chain.id
                : await client.extend(publicActions).getChainId()))
    };
};
//# sourceMappingURL=accountMetadata.js.map