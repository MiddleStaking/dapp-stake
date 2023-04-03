import { useEffect, useState } from 'react';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import axios from 'axios';

export const useGetUserESDT = () => {
  const { network } = useGetNetworkConfig();
  const [esdtBalance, setEsdtBalance] = useState([
    {
      type: 'FungibleESDT',
      identifier: '777DEV-0ddfcf',
      name: 'DJOY',
      ticker: '777DEV-0ddfcf',
      owner: 'erd1lkyhxmrfpfx3fftfxdt43l6fes06md9jqd0k9hfq0jyl8h36lrqswg3uch',
      decimals: 18,
      isPaused: false,
      transactions: 144,
      accounts: 85,
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
  };

  useEffect(() => {
    getUserESDT();
  }, []);

  return esdtBalance;
};
