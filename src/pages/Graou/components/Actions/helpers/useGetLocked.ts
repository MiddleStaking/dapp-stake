import { useEffect, useState } from 'react';
import {
  Abi,
  Address,
  AddressValue,
  ContractFunction,
  DevnetEntrypoint,
  TokenIdentifierValue
} from '@multiversx/sdk-core/out';
import {
  useGetAccount,
  useGetNetworkConfig,
  useGetPendingTransactions
} from 'lib';
import { contractLockdinogaz, local_network } from 'config';
import json from 'lock-graou.abi.json';

export const useGetLocked = () => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccount();
  const entrypoint = new DevnetEntrypoint({
    url: local_network.gatewayCached
  });
  const contractAddress = Address.newFromBech32(contractLockdinogaz);
  const abi = Abi.create(json);
  const controller = entrypoint.createSmartContractController(abi);
  const pending = useGetPendingTransactions();
  const hasPendingTransactions = pending.length > 0;

  const [locked, setLocked] = useState<any>([]);

  const getIsPaused = async () => {
    if (hasPendingTransactions == true || address == '') {
      return;
    }
    try {
      const response = await controller.query({
        contract: contractAddress,
        function: 'getUserNonces',
        arguments: [new AddressValue(new Address(address))]
      });

      console.log('locked', response);
      setLocked(response ? response.toString().split(',') : []);
    } catch (err) {
      console.error('Unable to call getIsPaused', err);
    }
  };

  useEffect(() => {
    getIsPaused();
  }, [hasPendingTransactions]);

  return locked;
};
