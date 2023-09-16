import { useEffect, useState } from 'react';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import axios from 'axios';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { network } from 'config';
export const useGetUserNFT = (search: string) => {
  // const { network } = useGetNetworkConfig();
  const [esdtBalance, setNftBalance] = useState([]);
  const address = useGetAccountInfo().address;

  const url = '/accounts/' + address + '/nfts?from=0&size=100&search=' + search;
  const getUserNFT = async () => {
    if (address != '') {
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
    }
  };

  useEffect(() => {
    getUserNFT();
  }, []);

  return esdtBalance;
};
