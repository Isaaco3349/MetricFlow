import { type Hex, type TypedDataDomain } from "viem";
import type { WithRequired } from "../../../../types/index.js";
export declare const eip712WrapHash: (messageHash: Hex, domain: WithRequired<TypedDataDomain, "name" | "chainId" | "verifyingContract" | "version">, useReplayableSignature?: boolean) => Promise<Hex>;
//# sourceMappingURL=eip712WrapHash.d.ts.map