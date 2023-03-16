import {
  AbiRegistry,
  SmartContractAbi,
  SmartContract,
  Address
} from '@multiversx/sdk-core/out';

import { contractAddressDelegation } from 'config';
import json from '../delegation-contract.abi.json';

const abiRegistry = AbiRegistry.create(json);
const abi = new SmartContractAbi(abiRegistry);

export const smartContract = new SmartContract({
  address: new Address(contractAddressDelegation),
  abi
});
