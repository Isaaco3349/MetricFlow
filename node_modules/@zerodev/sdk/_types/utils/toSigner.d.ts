import { type Address, type LocalAccount } from "viem";
import type { SmartAccount } from "viem/account-abstraction";
import type { Signer } from "../types/index.js";
export declare function toSigner({ signer, address }: {
    signer: Signer;
    address?: Address;
}): Promise<LocalAccount | SmartAccount>;
//# sourceMappingURL=toSigner.d.ts.map