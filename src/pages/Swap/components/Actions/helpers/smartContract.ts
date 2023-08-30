import { AbiRegistry, SmartContract, Address } from '@multiversx/sdk-core/out';
import { contractAddress } from 'config';
import json from 'staking-contract.abi.json';

// const abiRegistry = AbiRegistry.create(json);
// const abi = new SmartContractAbi(abiRegistry);
const abi = AbiRegistry.create(json);

export const smartContract = new SmartContract({
  address: new Address(contractAddress),
  abi
});
