// Copied from: https://github.com/pimlicolabs/permissionless.js/blob/main/packages/permissionless/utils/toOwner.ts
import { createWalletClient, custom } from "viem";
import { toAccount } from "viem/accounts";
import { signAuthorization, signMessage, signTypedData } from "viem/actions";
export async function toSigner({ signer, address }) {
    if ("type" in signer &&
        (signer.type === "local" || signer.type === "smart")) {
        return signer;
    }
    let walletClient = undefined;
    if ("request" in signer && !signer?.account) {
        if (!address) {
            address = (await Promise.any([
                signer.request({
                    method: "eth_requestAccounts"
                }),
                signer.request({
                    method: "eth_accounts"
                })
            ]))[0];
        }
        if (!address) {
            // For TS to be happy
            throw new Error("address is required");
        }
        walletClient = createWalletClient({
            account: address,
            transport: custom(signer)
        });
    }
    if (!walletClient) {
        walletClient = signer;
    }
    return toAccount({
        address: walletClient.account.address,
        async signMessage({ message }) {
            return signMessage(walletClient, { message });
        },
        async signTypedData(typedData) {
            const { primaryType, domain, message, types } = typedData;
            return signTypedData(walletClient, {
                primaryType,
                domain,
                message,
                types
            });
        },
        async signTransaction(_) {
            throw new Error("Smart account signer doesn't need to sign transactions");
        },
        async signAuthorization(authorization) {
            return signAuthorization(walletClient, authorization);
        }
    });
}
//# sourceMappingURL=toSigner.js.map