import { useEffect, useState } from 'react';
import {
  useGetAccountInfo,
  useGetPendingTransactions
} from '@multiversx/sdk-dapp/hooks';
import axios from 'axios';
import { network } from 'config';
export const useGetScNFT = (search: string, address: string) => {
  // const { network } = useGetNetworkConfig();
  const [esdtBalance, setNftBalance] = useState(<any>[]);
  const { hasPendingTransactions } = useGetPendingTransactions();

  const url = '/accounts/' + address + '/nfts?from=0&size=100&search=' + search;
  const getUserNFT = async () => {
    if (hasPendingTransactions == true || address == '') {
      return;
    }
    try {
      const { data } = await axios.get<[]>(url, {
        baseURL: network.apiAddress,
        params: {}
      });
      setNftBalance(data);
    } catch (err) {
      console.error('Unable to fetch Tokens');
      setNftBalance([]);
    }
  };

  useEffect(() => {
    getUserNFT();
  }, [hasPendingTransactions]);

  return esdtBalance;
};
