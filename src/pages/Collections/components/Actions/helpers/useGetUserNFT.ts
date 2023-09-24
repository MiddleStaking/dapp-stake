import { useEffect, useState } from 'react';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import axios from 'axios';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { network } from 'config';
export const useGetUserNFT = () => {
  // const { network } = useGetNetworkConfig();
  const [esdtBalance, setNftBalance] = useState([
    {
      type: '',
      collection: '',
      name: '',
      ticker: '',
      owner: '',
      timestamp: 1693581858,
      canFreeze: true,
      canWipe: true,
      canPause: true,
      canTransferNftCreateRole: false,
      canChangeOwner: true,
      canUpgrade: true,
      canAddSpecialRoles: true,
      count: BigInt(1)
    }
  ]);
  const address = useGetAccountInfo().address;

  const url = '/accounts/' + address + '/collections?excludeMetaESDT=true';
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
