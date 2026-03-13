import { type KernelSmartAccountImplementation } from "@zerodev/sdk/accounts";
import type { EntryPointType, GetKernelVersion, PluginMigrationData, Signer } from "@zerodev/sdk/types";
import { type Address } from "viem";
import { type EntryPointVersion, type SmartAccount } from "viem/account-abstraction";
export type CreateEcdsaKernelMigrationAccountReturnType<entryPointVersion extends EntryPointVersion = "0.7"> = SmartAccount<KernelSmartAccountImplementation<entryPointVersion>>;
export type CreateEcdsaKernelMigrationAccountParameters<entryPointVersion extends EntryPointVersion> = {
    entryPoint: EntryPointType<entryPointVersion>;
    signer: Signer;
    index?: bigint;
    address?: Address;
    migrationVersion: {
        from: GetKernelVersion<entryPointVersion>;
        to: GetKernelVersion<entryPointVersion>;
    };
    pluginMigrations?: PluginMigrationData[];
};
/**
 * Build a kernel smart account from a private key, that use the ECDSA signer behind the scene
 * @param client
 * @param privateKey
 * @param entryPoint
 * @param index
 * @param factoryAddress
 * @param accountImplementationAddress
 * @param ecdsaValidatorAddress
 * @param address
 */
export declare function createEcdsaKernelMigrationAccount<entryPointVersion extends EntryPointVersion>(client: KernelSmartAccountImplementation["client"], { entryPoint, signer, index, address, migrationVersion, pluginMigrations }: CreateEcdsaKernelMigrationAccountParameters<entryPointVersion>): Promise<CreateEcdsaKernelMigrationAccountReturnType<entryPointVersion>>;
export declare const getNonceKeyWithEncoding: (validatorAddress: Address, nonceKey?: bigint) => bigint;
//# sourceMappingURL=createEcdsaKernelMigrationAccount.d.ts.map