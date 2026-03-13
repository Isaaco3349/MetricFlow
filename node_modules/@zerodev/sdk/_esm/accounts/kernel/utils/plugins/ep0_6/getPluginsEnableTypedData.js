import { concatHex, hexToBigInt, pad, toHex } from "viem";
export const getPluginsEnableTypedData = async ({ accountAddress, chainId, kernelVersion, action, validator, validUntil, validAfter }) => {
    return {
        domain: {
            name: "Kernel",
            version: kernelVersion,
            chainId,
            verifyingContract: accountAddress
        },
        types: {
            ValidatorApproved: [
                { name: "sig", type: "bytes4" },
                { name: "validatorData", type: "uint256" },
                { name: "executor", type: "address" },
                { name: "enableData", type: "bytes" }
            ]
        },
        message: {
            sig: action.selector,
            validatorData: hexToBigInt(concatHex([
                pad(toHex(validUntil ?? 0), {
                    size: 6
                }),
                pad(toHex(validAfter ?? 0), {
                    size: 6
                }),
                validator.address
            ]), { size: 32 }),
            executor: action.address,
            enableData: await validator.getEnableData(accountAddress)
        },
        primaryType: "ValidatorApproved"
    };
};
//# sourceMappingURL=getPluginsEnableTypedData.js.map