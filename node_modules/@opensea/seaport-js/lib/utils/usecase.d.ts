import { BaseContract, ContractTransaction, Overrides, Signer, TransactionResponse } from "ethers";
import { CreateBulkOrdersAction, CreateOrderAction, ExchangeAction, OrderUseCase } from "../types";
import { DefaultReturnType, TypedContractMethod } from "../typechain-types/common";
export declare const executeAllActions: <T extends CreateOrderAction | CreateBulkOrdersAction | ExchangeAction>(actions: OrderUseCase<T>["actions"]) => Promise<TransactionResponse | import("../types").OrderWithCounter | import("../types").OrderWithCounter[]>;
export type ContractMethodReturnType<T extends BaseContract, U extends keyof T> = T[U] extends TypedContractMethod<any, infer Output, any> ? Output : never;
export type TransactionMethods<T = unknown> = {
    buildTransaction: (overrides?: Overrides) => Promise<ContractTransaction>;
    staticCall: (overrides?: Overrides) => Promise<DefaultReturnType<T>>;
    estimateGas: (overrides?: Overrides) => Promise<bigint>;
    transact: (overrides?: Overrides) => Promise<TransactionResponse>;
};
export declare const getTransactionMethods: <T extends BaseContract, U extends keyof T>(signer: Signer | Promise<Signer>, contract: T, method: U, args: T[U] extends TypedContractMethod<infer Args, any, any> ? Args | [...Args, Overrides | undefined] : never, domain?: string) => TransactionMethods<ContractMethodReturnType<T, U>>;
export declare const getTagFromDomain: (domain: string) => string;
