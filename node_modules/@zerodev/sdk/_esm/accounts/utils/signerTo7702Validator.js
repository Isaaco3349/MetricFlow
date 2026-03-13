import { getUserOperationHash } from "viem/account-abstraction";
import { toAccount } from "viem/accounts";
import { getChainId, signMessage } from "viem/actions";
import { toSigner } from "../../utils/toSigner.js";
export async function signerTo7702Validator(client, { signer, entryPoint, kernelVersion }) {
    const viemSigner = await toSigner({ signer });
    // Fetch chain id
    const chainId = client.chain?.id ?? (await getChainId(client));
    // Build the EOA Signer
    const account = toAccount({
        address: viemSigner.address,
        async signMessage({ message }) {
            return signMessage(client, { account: viemSigner, message });
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
        // Sign a user operation
        async signUserOperation(userOperation) {
            const hash = getUserOperationHash({
                userOperation: {
                    ...userOperation,
                    signature: "0x"
                },
                entryPointAddress: entryPoint.address,
                entryPointVersion: entryPoint.version,
                chainId: chainId
            });
            const signature = await signMessage(client, {
                account: viemSigner,
                message: { raw: hash }
            });
            return signature;
        },
        // Get simple dummy signature
        async getStubSignature() {
            return "0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c";
        },
        async isEnabled(_kernelAccountAddress, _selector) {
            return false;
        }
    };
}
//# sourceMappingURL=signerTo7702Validator.js.map