import { useEffect, useState } from 'react';
import { Address } from '@multiversx/sdk-core';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers';
import { network } from 'config';
import BigNumber from 'bignumber.js';

export const useGetEgldBalance = (contract: string) => {
  const [contractBalance, setContractBalance] = useState(new BigNumber(0)); // Balance en EGLD

  const getContractBalance = async () => {
    try {
      const proxy = new ProxyNetworkProvider(network.gatewayAddress);
      const contractAddr = new Address(contract);

      // Récupérer la balance du contrat
      const account = await proxy.getAccount(contractAddr);
      const balance = new BigNumber(account.balance);

      setContractBalance(balance);
    } catch (err) {
      console.error('Unable to fetch contract balance', err);
    }
  };

  useEffect(() => {
    getContractBalance();
  }, [contract]);

  return contractBalance;
};
