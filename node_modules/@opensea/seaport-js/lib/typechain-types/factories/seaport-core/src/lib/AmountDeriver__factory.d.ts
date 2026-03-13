import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type { AmountDeriver, AmountDeriverInterface } from "../../../../seaport-core/src/lib/AmountDeriver";
type AmountDeriverConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class AmountDeriver__factory extends ContractFactory {
    constructor(...args: AmountDeriverConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<AmountDeriver & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): AmountDeriver__factory;
    static readonly bytecode = "0x6080604052348015600e575f80fd5b50603e80601a5f395ff3fe60806040525f80fdfea2646970667358221220a39826498d0de68d571ab26af5858e9d3d7e4d0fb3b081a46a01f21a5a6fc96d64736f6c63430008180033";
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "InexactFraction";
        readonly type: "error";
    }];
    static createInterface(): AmountDeriverInterface;
    static connect(address: string, runner?: ContractRunner | null): AmountDeriver;
}
export {};
