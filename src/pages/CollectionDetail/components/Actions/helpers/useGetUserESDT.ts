import { useEffect, useState } from 'react';
// import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import axios from 'axios';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { network } from 'config';
export const useGetUserESDT = () => {
  // const { network } = useGetNetworkConfig();
  const [esdtBalance, setEsdtBalance] = useState([
    {
      type: '',
      identifier: '',
      name: '',
      ticker: '',
      owner: '',
      decimals: 18,
      isPaused: false,
      transactions: 0,
      accounts: 0,
      canUpgrade: true,
      canMint: true,
      canBurn: true,
      canChangeOwner: true,
      canPause: true,
      canFreeze: true,
      canWipe: true,
      balance: BigInt(1)
    }
  ]);
  const address = useGetAccountInfo().address;

  const url = '/accounts/' + address + '/tokens?size=1000';
  const getUserESDT = async () => {
    if (address != '') {
      try {
        const { data } = await axios.get<[]>(url, {
          baseURL: network.apiAddress,
          params: {}
        });
        setEsdtBalance(data);
      } catch (err) {
        console.error('Unable to fetch Tokens');
        setEsdtBalance([]);
      }
    }
  };

  useEffect(() => {
    getUserESDT();
  }, []);

  return esdtBalance;
};
