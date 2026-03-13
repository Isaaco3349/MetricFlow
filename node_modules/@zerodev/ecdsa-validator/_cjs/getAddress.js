"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKernelAddressFromECDSA = void 0;
const sdk_1 = require("@zerodev/sdk");
const viem_1 = require("viem");
const toECDSAValidatorPlugin_js_1 = require("./toECDSAValidatorPlugin.js");
const getInitCodeHash = async (publicClient, entryPoint, kernelVersion) => {
    (0, sdk_1.validateKernelVersionWithEntryPoint)(entryPoint.version, kernelVersion);
    const addresses = sdk_1.constants.KernelVersionToAddressesMap[kernelVersion];
    if (entryPoint.version === "0.6") {
        return await initCodeHashV0_6(publicClient, addresses.factoryAddress);
    }
    return initCodeHashV0_7(addresses.accountImplementationAddress);
};
const initCodeHashV0_6 = async (publicClient, factoryAddress) => {
    const factoryContract = (0, viem_1.getContract)({
        address: factoryAddress,
        abi: [
            {
                type: "function",
                name: "initCodeHash",
                inputs: [],
                outputs: [
                    {
                        name: "result",
                        type: "bytes32",
                        internalType: "bytes32"
                    }
                ],
                stateMutability: "view"
            }
        ],
        client: publicClient
    });
    return await factoryContract.read.initCodeHash();
};
const initCodeHashV0_7 = (implementationAddress) => {
    if (!(0, viem_1.isAddress)(implementationAddress)) {
        throw new Error("Invalid implementation address");
    }
    const initCode = (0, viem_1.concatHex)([
        "0x603d3d8160223d3973",
        implementationAddress,
        "0x6009",
        "0x5155f3363d3d373d3d363d7f360894a13ba1a3210667c828492db98dca3e2076",
        "0xcc3735a920a3ca505d382bbc545af43d6000803e6038573d6000fd5b3d6000f3"
    ]);
    const hash = (0, viem_1.keccak256)(initCode);
    return hash;
};
const generateSaltForV06 = (eoaAddress, index, validatorAddress) => {
    const encodedIndex = (0, viem_1.toHex)(index, { size: 32 });
    const initData = (0, viem_1.encodeFunctionData)({
        abi: sdk_1.KernelAccountAbi,
        functionName: "initialize",
        args: [validatorAddress, eoaAddress]
    });
    const encodedSalt = (0, viem_1.concat)([initData, encodedIndex]);
    const salt = BigInt((0, viem_1.keccak256)(encodedSalt));
    const mask = BigInt("0xffffffffffffffffffffffff");
    const maskedSalt = (0, viem_1.toHex)(salt & mask, { size: 32 });
    return maskedSalt;
};
const generateSaltForV07 = (eoaAddress, index, hookAddress, hookData, validatorAddress, kernelVersion, initConfig) => {
    const encodedIndex = (0, viem_1.toHex)(index, { size: 32 });
    let initData;
    if (kernelVersion === "0.3.0") {
        initData = (0, viem_1.encodeFunctionData)({
            abi: sdk_1.KernelV3InitAbi,
            functionName: "initialize",
            args: [
                (0, viem_1.concatHex)([
                    sdk_1.constants.VALIDATOR_TYPE.SECONDARY,
                    validatorAddress
                ]),
                hookAddress,
                eoaAddress,
                hookData
            ]
        });
        const packedData = (0, viem_1.concatHex)([initData, encodedIndex]);
        return (0, viem_1.keccak256)(packedData);
    }
    initData = (0, viem_1.encodeFunctionData)({
        abi: sdk_1.KernelV3_1AccountAbi,
        functionName: "initialize",
        args: [
            (0, viem_1.concatHex)([sdk_1.constants.VALIDATOR_TYPE.SECONDARY, validatorAddress]),
            hookAddress,
            eoaAddress,
            hookData,
            initConfig
        ]
    });
    const packedData = (0, viem_1.concatHex)([initData, encodedIndex]);
    return (0, viem_1.keccak256)(packedData);
};
async function getKernelAddressFromECDSA(params) {
    (0, sdk_1.validateKernelVersionWithEntryPoint)(params.entryPoint.version, params.kernelVersion);
    const kernelAddresses = sdk_1.constants.KernelVersionToAddressesMap[params.kernelVersion];
    const ecdsaValidatorAddress = (0, toECDSAValidatorPlugin_js_1.getValidatorAddress)(params.entryPoint, params.kernelVersion);
    const bytecodeHash = await (async () => {
        if ("initCodeHash" in params && params.initCodeHash) {
            return params.initCodeHash;
        }
        if ("publicClient" in params && params.publicClient) {
            return await getInitCodeHash(params.publicClient, params.entryPoint, params.kernelVersion);
        }
        throw new Error("Either initCodeHash or publicClient must be provided");
    })();
    let salt;
    if (params.entryPoint.version === "0.6") {
        salt = generateSaltForV06(params.eoaAddress, params.index, ecdsaValidatorAddress);
    }
    else {
        const hookAddress = "hookAddress" in params && params.hookAddress
            ? params.hookAddress
            : viem_1.zeroAddress;
        const hookData = "hookData" in params && params.hookData ? params.hookData : "0x";
        const initConfig = "initConfig" in params && params.initConfig ? params.initConfig : [];
        salt = generateSaltForV07(params.eoaAddress, params.index, hookAddress, hookData, ecdsaValidatorAddress, params.kernelVersion, initConfig);
    }
    return (0, viem_1.getContractAddress)({
        bytecodeHash,
        opcode: "CREATE2",
        from: kernelAddresses.factoryAddress,
        salt
    });
}
exports.getKernelAddressFromECDSA = getKernelAddressFromECDSA;
//# sourceMappingURL=getAddress.js.map