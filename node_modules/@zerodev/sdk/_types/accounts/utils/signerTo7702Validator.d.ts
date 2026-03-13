import type { Client } from "viem";
import { type EntryPointVersion } from "viem/account-abstraction";
import type { EntryPointType, GetKernelVersion, KernelValidator, Signer } from "../../types/index.js";
export declare function signerTo7702Validator<entryPointVersion extends EntryPointVersion>(client: Client, { signer, entryPoint, kernelVersion }: {
    signer: Signer;
    entryPoint: EntryPointType<entryPointVersion>;
    kernelVersion: GetKernelVersion<entryPointVersion>;
}): Promise<KernelValidator<"EIP7702Validator">>;
//# sourceMappingURL=signerTo7702Validator.d.ts.map