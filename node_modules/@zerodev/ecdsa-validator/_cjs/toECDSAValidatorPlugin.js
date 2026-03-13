"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signerToEcdsaValidator = exports.getValidatorAddress = void 0;
const sdk_1 = require("@zerodev/sdk");
const sdk_2 = require("@zerodev/sdk");
const viem_1 = require("viem");
const account_abstraction_1 = require("viem/account-abstraction");
const accounts_1 = require("viem/accounts");
const actions_1 = require("viem/actions");
const constants_js_1 = require("./constants.js");
const getValidatorAddress = (entryPoint, kernelVersion, validatorAddress) => {
    (0, sdk_1.validateKernelVersionWithEntryPoint)(entryPoint.version, kernelVersion);
    const ecdsaValidatorAddress = Object.entries(constants_js_1.kernelVersionRangeToValidator).find(([range]) => (0, sdk_2.satisfiesRange)(kernelVersion, range))?.[1];
    if (!ecdsaValidatorAddress && !validatorAddress) {
        throw new Error(`Validator not found for Kernel version: ${kernelVersion}`);
    }
    return validatorAddress ?? ecdsaValidatorAddress ?? viem_1.zeroAddress;
};
exports.getValidatorAddress = getValidatorAddress;
async function signerToEcdsaValidator(client, { signer, entryPoint, kernelVersion, validatorAddress: _validatorAddress }) {
    const validatorAddress = (0, exports.getValidatorAddress)(entryPoint, kernelVersion, _validatorAddress);
    const viemSigner = await (0, sdk_1.toSigner)({ signer });
    const chainId = await (0, actions_1.getChainId)(client);
    const account = (0, accounts_1.toAccount)({
        address: viemSigner.address,
        async signMessage({ message }) {
            return (0, actions_1.signMessage)(client, { account: viemSigner, message });
        },
        async signTransaction(_, __) {
            throw new Error("Smart account signer doesn't need to sign transactions");
        },
        async signTypedData(typedData) {
            return viemSigner.signTypedData(typedData);
        }
    });
    return {
        ...account,
        supportedKernelVersions: kernelVersion,
        validatorType: "SECONDARY",
        address: validatorAddress,
        source: "ECDSAValidator",
        getIdentifier() {
            return validatorAddress;
        },
        async getEnableData() {
            return viemSigner.address;
        },
        async getNonceKey(_accountAddress, customNonceKey) {
            if (customNonceKey) {
                return customNonceKey;
            }
            return 0n;
        },
        async signUserOperation(userOperation) {
            const hash = (0, account_abstraction_1.getUserOperationHash)({
                userOperation: {
                    ...userOperation,
                    signature: "0x"
                },
                entryPointAddress: entryPoint.address,
                entryPointVersion: entryPoint.version,
                chainId: chainId
            });
            const signature = await (0, actions_1.signMessage)(client, {
                account: viemSigner,
                message: { raw: hash }
            });
            return signature;
        },
        async getStubSignature() {
            return "0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c";
        },
        async isEnabled(_kernelAccountAddress, _selector) {
            return false;
        }
    };
}
exports.signerToEcdsaValidator = signerToEcdsaValidator;
//# sourceMappingURL=toECDSAValidatorPlugin.js.map