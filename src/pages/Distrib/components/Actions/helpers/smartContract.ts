import { AbiRegistry, SmartContract, Address } from '@multiversx/sdk-core/out';
import { contractDistrib } from 'config';
import json from 'mid-distrib.abi.json';

// const abiRegistry = AbiRegistry.create(json);
// const abi = new SmartContractAbi(abiRegistry);
const abi = AbiRegistry.create(json);

export const smartContract = new SmartContract({
  address: new Address(contractDistrib),
  abi
});
