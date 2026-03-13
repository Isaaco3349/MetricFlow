import type { EntryPointType, GetKernelVersion, KernelValidator, Signer } from "@zerodev/sdk/types";
import { type Address, type Client } from "viem";
import { type EntryPointVersion } from "viem/account-abstraction";
export declare const getValidatorAddress: <entryPointVersion extends EntryPointVersion>(entryPoint: EntryPointType<entryPointVersion>, kernelVersion: GetKernelVersion<entryPointVersion>, validatorAddress?: Address) => Address;
export declare function signerToEcdsaValidator<entryPointVersion extends EntryPointVersion>(client: Client, { signer, entryPoint, kernelVersion, validatorAddress: _validatorAddress }: {
    signer: Signer;
    entryPoint: EntryPointType<entryPointVersion>;
    kernelVersion: GetKernelVersion<entryPointVersion>;
    validatorAddress?: Address;
}): Promise<KernelValidator<"ECDSAValidator">>;
//# sourceMappingURL=toECDSAValidatorPlugin.d.ts.map