import { useEffect, useState } from 'react';
import { useGetAccountInfo, useGetPendingTransactions } from 'lib';
import axios from 'axios';
import { local_network } from 'config';
export const useGetUserNFT = (search: string) => {
  // const { network } = useGetNetworkConfig();
  const [esdtBalance, setNftBalance] = useState(<any>[]);
  const address = useGetAccountInfo().address;
  const pending = useGetPendingTransactions();
  const hasPendingTransactions = pending.length > 0;
  const url = '/accounts/' + address + '/nfts?from=0&size=100&search=' + search;
  const getUserNFT = async () => {
    if (hasPendingTransactions == true || address == '') {
      return;
    }
    try {
      const { data } = await axios.get<[]>(url, {
        baseURL: local_network.apiAddress,
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
