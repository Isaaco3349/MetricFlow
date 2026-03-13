import { toAccount } from "viem/accounts";
export function addressToEmptyAccount(address) {
    const account = toAccount({
        address,
        async signMessage() {
            throw new Error("Method not supported");
        },
        async signTransaction(_transaction) {
            throw new Error("Method not supported");
        },
        async signTypedData(_typedData) {
            throw new Error("Method not supported");
        }
    });
    return {
        ...account,
        publicKey: "0x",
        source: "empty"
    };
}
//# sourceMappingURL=addressToEmptyAccount.js.map