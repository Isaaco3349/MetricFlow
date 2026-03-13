import type { Abi, ContractFunctionParameters } from 'viem';
export type Contract<TAbi extends Abi = []> = Omit<ContractFunctionParameters<TAbi>, 'functionName' | 'args'>;
//# sourceMappingURL=contract.d.ts.map