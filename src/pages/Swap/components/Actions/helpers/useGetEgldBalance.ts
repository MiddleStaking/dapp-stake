import { useEffect, useState } from 'react';
import { Address, ApiNetworkProvider } from '@multiversx/sdk-core';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers';
import { local_network } from 'config';
import BigNumber from 'bignumber.js';

export const useGetEgldBalance = (contract: string) => {
  const provider = new ApiNetworkProvider(local_network.apiAddress);

  const [contractBalance, setContractBalance] = useState(new BigNumber(0)); // Balance en EGLD

  const getContractBalance = async () => {
    try {
      const proxy = new ProxyNetworkProvider(local_network.gatewayAddress);
      const contractAddr = new Address(contract);

      // Récupérer la balance du contrat

      const account = await provider.getAccount(new Address(contract));
      const balance = new BigNumber(account.balance.toString());

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
