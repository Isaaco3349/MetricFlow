import { toSigner, validateKernelVersionWithEntryPoint } from "@zerodev/sdk";
import { satisfiesRange } from "@zerodev/sdk";
import { zeroAddress } from "viem";
import { getUserOperationHash } from "viem/account-abstraction";
import { toAccount } from "viem/accounts";
import { getChainId, signMessage } from "viem/actions";
import { kernelVersionRangeToValidator } from "./constants.js";
export const getValidatorAddress = (entryPoint, kernelVersion, validatorAddress) => {
    validateKernelVersionWithEntryPoint(entryPoint.version, kernelVersion);
    const ecdsaValidatorAddress = Object.entries(kernelVersionRangeToValidator).find(([range]) => satisfiesRange(kernelVersion, range))?.[1];
    if (!ecdsaValidatorAddress && !validatorAddress) {
        throw new Error(`Validator not found for Kernel version: ${kernelVersion}`);
    }
    return validatorAddress ?? ecdsaValidatorAddress ?? zeroAddress;
};
export async function signerToEcdsaValidator(client, { signer, entryPoint, kernelVersion, validatorAddress: _validatorAddress }) {
    const validatorAddress = getValidatorAddress(entryPoint, kernelVersion, _validatorAddress);
    const viemSigner = await toSigner({ signer });
    // Fetch chain id
    const chainId = await getChainId(client);
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
//# sourceMappingURL=toECDSAValidatorPlugin.js.map