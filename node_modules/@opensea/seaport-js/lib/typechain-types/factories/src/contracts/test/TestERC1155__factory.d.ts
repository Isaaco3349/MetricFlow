import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type { TestERC1155, TestERC1155Interface } from "../../../../src/contracts/test/TestERC1155";
type TestERC1155ConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class TestERC1155__factory extends ContractFactory {
    constructor(...args: TestERC1155ConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<TestERC1155 & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): TestERC1155__factory;
    static readonly bytecode = "0x608060405234801561000f575f80fd5b50610fe58061001d5f395ff3fe608060405234801561000f575f80fd5b506004361061008f575f3560e01c80632eb2c2d6116100635780632eb2c2d61461013c5780634e1273f414610151578063a22cb46514610171578063e985e9c514610184578063f242432a146101b1575f80fd5b8062fdd58e1461009357806301ffc9a7146100cd5780630e89341c146100f0578063156e29f614610129575b5f80fd5b6100ba6100a13660046109c6565b5f60208181529281526040808220909352908152205481565b6040519081526020015b60405180910390f35b6100e06100db366004610a06565b6101c4565b60405190151581526020016100c4565b61011c6100fe366004610a28565b5060408051808201909152600381526275726960e81b602082015290565b6040516100c49190610a82565b6100e0610137366004610a94565b610215565b61014f61014a366004610b4a565b61023a565b005b61016461015f366004610bfd565b6104da565b6040516100c49190610c64565b61014f61017f366004610ca7565b61060a565b6100e0610192366004610ce0565b600160209081525f928352604080842090915290825290205460ff1681565b61014f6101bf366004610d11565b610675565b5f6301ffc9a760e01b6001600160e01b0319831614806101f45750636cdb3d1360e11b6001600160e01b03198316145b8061020f57506303a24d0760e21b6001600160e01b03198316145b92915050565b5f61023084848460405180602001604052805f815250610869565b5060019392505050565b8483146102805760405162461bcd60e51b815260206004820152600f60248201526e0988a9c8ea890be9a92a69a82a8869608b1b60448201526064015b60405180910390fd5b336001600160a01b03891614806102b957506001600160a01b0388165f90815260016020908152604080832033845290915290205460ff165b6102f65760405162461bcd60e51b815260206004820152600e60248201526d1393d517d055551213d49256915160921b6044820152606401610277565b5f805f5b878110156103ad5788888281811061031457610314610d84565b90506020020135925086868281811061032f5761032f610d84565b6001600160a01b038e165f908152602081815260408083208984528252822080549390910294909401359550859392509061036b908490610dac565b90915550506001600160a01b038a165f90815260208181526040808320868452909152812080548492906103a0908490610dbf565b90915550506001016102fa565b50886001600160a01b03168a6001600160a01b0316336001600160a01b03167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8b8b8b8b6040516104019493929190610e02565b60405180910390a46001600160a01b0389163b156104a55760405163bc197c8160e01b808252906001600160a01b038b169063bc197c81906104559033908f908e908e908e908e908e908e90600401610e5b565b6020604051808303815f875af1158015610471573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906104959190610ebe565b6001600160e01b031916146104b2565b6001600160a01b03891615155b6104ce5760405162461bcd60e51b815260040161027790610ed9565b50505050505050505050565b606083821461051d5760405162461bcd60e51b815260206004820152600f60248201526e0988a9c8ea890be9a92a69a82a8869608b1b6044820152606401610277565b8367ffffffffffffffff81111561053657610536610f03565b60405190808252806020026020018201604052801561055f578160200160208202803683370190505b5090505f5b84811015610601575f8087878481811061058057610580610d84565b90506020020160208101906105959190610f17565b6001600160a01b03166001600160a01b031681526020019081526020015f205f8585848181106105c7576105c7610d84565b9050602002013581526020019081526020015f20548282815181106105ee576105ee610d84565b6020908102919091010152600101610564565b50949350505050565b335f8181526001602090815260408083206001600160a01b03871680855290835292819020805460ff191686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b336001600160a01b03871614806106ae57506001600160a01b0386165f90815260016020908152604080832033845290915290205460ff165b6106eb5760405162461bcd60e51b815260206004820152600e60248201526d1393d517d055551213d49256915160921b6044820152606401610277565b6001600160a01b0386165f908152602081815260408083208784529091528120805485929061071b908490610dac565b90915550506001600160a01b0385165f9081526020818152604080832087845290915281208054859290610750908490610dbf565b909155505060408051858152602081018590526001600160a01b03808816929089169133917fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62910160405180910390a46001600160a01b0385163b156108385760405163f23a6e6160e01b808252906001600160a01b0387169063f23a6e61906107e89033908b908a908a908a908a90600401610f30565b6020604051808303815f875af1158015610804573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906108289190610ebe565b6001600160e01b03191614610845565b6001600160a01b03851615155b6108615760405162461bcd60e51b815260040161027790610ed9565b505050505050565b6001600160a01b0384165f9081526020818152604080832086845290915281208054849290610899908490610dbf565b909155505060408051848152602081018490526001600160a01b038616915f9133917fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62910160405180910390a46001600160a01b0384163b1561097c5760405163f23a6e6160e01b808252906001600160a01b0386169063f23a6e619061092c9033905f90899089908990600401610f76565b6020604051808303815f875af1158015610948573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061096c9190610ebe565b6001600160e01b03191614610989565b6001600160a01b03841615155b6109a55760405162461bcd60e51b815260040161027790610ed9565b50505050565b80356001600160a01b03811681146109c1575f80fd5b919050565b5f80604083850312156109d7575f80fd5b6109e0836109ab565b946020939093013593505050565b6001600160e01b031981168114610a03575f80fd5b50565b5f60208284031215610a16575f80fd5b8135610a21816109ee565b9392505050565b5f60208284031215610a38575f80fd5b5035919050565b5f81518084525f5b81811015610a6357602081850181015186830182015201610a47565b505f602082860101526020601f19601f83011685010191505092915050565b602081525f610a216020830184610a3f565b5f805f60608486031215610aa6575f80fd5b610aaf846109ab565b95602085013595506040909401359392505050565b5f8083601f840112610ad4575f80fd5b50813567ffffffffffffffff811115610aeb575f80fd5b6020830191508360208260051b8501011115610b05575f80fd5b9250929050565b5f8083601f840112610b1c575f80fd5b50813567ffffffffffffffff811115610b33575f80fd5b602083019150836020828501011115610b05575f80fd5b5f805f805f805f8060a0898b031215610b61575f80fd5b610b6a896109ab565b9750610b7860208a016109ab565b9650604089013567ffffffffffffffff80821115610b94575f80fd5b610ba08c838d01610ac4565b909850965060608b0135915080821115610bb8575f80fd5b610bc48c838d01610ac4565b909650945060808b0135915080821115610bdc575f80fd5b50610be98b828c01610b0c565b999c989b5096995094979396929594505050565b5f805f8060408587031215610c10575f80fd5b843567ffffffffffffffff80821115610c27575f80fd5b610c3388838901610ac4565b90965094506020870135915080821115610c4b575f80fd5b50610c5887828801610ac4565b95989497509550505050565b602080825282518282018190525f9190848201906040850190845b81811015610c9b57835183529284019291840191600101610c7f565b50909695505050505050565b5f8060408385031215610cb8575f80fd5b610cc1836109ab565b915060208301358015158114610cd5575f80fd5b809150509250929050565b5f8060408385031215610cf1575f80fd5b610cfa836109ab565b9150610d08602084016109ab565b90509250929050565b5f805f805f8060a08789031215610d26575f80fd5b610d2f876109ab565b9550610d3d602088016109ab565b94506040870135935060608701359250608087013567ffffffffffffffff811115610d66575f80fd5b610d7289828a01610b0c565b979a9699509497509295939492505050565b634e487b7160e01b5f52603260045260245ffd5b634e487b7160e01b5f52601160045260245ffd5b8181038181111561020f5761020f610d98565b8082018082111561020f5761020f610d98565b8183525f6001600160fb1b03831115610de9575f80fd5b8260051b80836020870137939093016020019392505050565b604081525f610e15604083018688610dd2565b8281036020840152610e28818587610dd2565b979650505050505050565b81835281816020850137505f828201602090810191909152601f909101601f19169091010190565b6001600160a01b0389811682528816602082015260a0604082018190525f90610e87908301888a610dd2565b8281036060840152610e9a818789610dd2565b90508281036080840152610eaf818587610e33565b9b9a5050505050505050505050565b5f60208284031215610ece575f80fd5b8151610a21816109ee565b60208082526010908201526f155394d0519157d49150d2541251539560821b604082015260600190565b634e487b7160e01b5f52604160045260245ffd5b5f60208284031215610f27575f80fd5b610a21826109ab565b6001600160a01b03878116825286166020820152604081018590526060810184905260a0608082018190525f90610f6a9083018486610e33565b98975050505050505050565b6001600160a01b03868116825285166020820152604081018490526060810183905260a0608082018190525f90610e2890830184610a3f56fea2646970667358221220ec74e0d7d66f1c1290ad4b687119dcd8d1c065edb860f43b04d1fa3c05894fc864736f6c63430008180033";
    static readonly abi: readonly [{
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "owner";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "operator";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "bool";
            readonly name: "approved";
            readonly type: "bool";
        }];
        readonly name: "ApprovalForAll";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "operator";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "from";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256[]";
            readonly name: "ids";
            readonly type: "uint256[]";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256[]";
            readonly name: "amounts";
            readonly type: "uint256[]";
        }];
        readonly name: "TransferBatch";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "operator";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "from";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "id";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "TransferSingle";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "string";
            readonly name: "value";
            readonly type: "string";
        }, {
            readonly indexed: true;
            readonly internalType: "uint256";
            readonly name: "id";
            readonly type: "uint256";
        }];
        readonly name: "URI";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly name: "balanceOf";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address[]";
            readonly name: "owners";
            readonly type: "address[]";
        }, {
            readonly internalType: "uint256[]";
            readonly name: "ids";
            readonly type: "uint256[]";
        }];
        readonly name: "balanceOfBatch";
        readonly outputs: readonly [{
            readonly internalType: "uint256[]";
            readonly name: "balances";
            readonly type: "uint256[]";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly name: "isApprovedForAll";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "tokenId";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "mint";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "from";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly internalType: "uint256[]";
            readonly name: "ids";
            readonly type: "uint256[]";
        }, {
            readonly internalType: "uint256[]";
            readonly name: "amounts";
            readonly type: "uint256[]";
        }, {
            readonly internalType: "bytes";
            readonly name: "data";
            readonly type: "bytes";
        }];
        readonly name: "safeBatchTransferFrom";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "from";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "id";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes";
            readonly name: "data";
            readonly type: "bytes";
        }];
        readonly name: "safeTransferFrom";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "operator";
            readonly type: "address";
        }, {
            readonly internalType: "bool";
            readonly name: "approved";
            readonly type: "bool";
        }];
        readonly name: "setApprovalForAll";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes4";
            readonly name: "interfaceId";
            readonly type: "bytes4";
        }];
        readonly name: "supportsInterface";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly name: "uri";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly stateMutability: "pure";
        readonly type: "function";
    }];
    static createInterface(): TestERC1155Interface;
    static connect(address: string, runner?: ContractRunner | null): TestERC1155;
}
export {};
