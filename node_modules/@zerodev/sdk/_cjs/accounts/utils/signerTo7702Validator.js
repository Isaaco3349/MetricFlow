"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signerTo7702Validator = void 0;
const account_abstraction_1 = require("viem/account-abstraction");
const accounts_1 = require("viem/accounts");
const actions_1 = require("viem/actions");
const toSigner_js_1 = require("../../utils/toSigner.js");
async function signerTo7702Validator(client, { signer, entryPoint, kernelVersion }) {
    const viemSigner = await (0, toSigner_js_1.toSigner)({ signer });
    const chainId = client.chain?.id ?? (await (0, actions_1.getChainId)(client));
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
        validatorType: "EIP7702",
        address: viemSigner.address,
        source: "EIP7702Validator",
        getIdentifier() {
            return "0x";
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
exports.signerTo7702Validator = signerTo7702Validator;
//# sourceMappingURL=signerTo7702Validator.js.map