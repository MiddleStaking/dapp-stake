import { useEffect, useState } from 'react';
import {
  Address,
  AddressValue,
  ContractFunction,
  ResultsParser
} from '@multiversx/sdk-core/out';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks';
import { smartContract } from './smartContract';
import { network } from 'config';

const resultsParser = new ResultsParser();

export const useGetUserStakedNft = (address: string) => {
  const { hasPendingTransactions } = useGetPendingTransactions();
  const [stakedTokensNft, setStakedTokensNft] = useState([
    {
      staked_nft: {
        nft_id: 0,
        pool_id: 0,
        nft_identifier: '',
        nft_nonce: 0,
        nft_qty: 1,
        lock: 0,
        unbound: 0,
        jump_unbound: 0
      },
      current_block: 0
    }
  ]);
  const time = new Date();

  const getUserStakedNft = async () => {
    if (hasPendingTransactions == true || address == '') {
      return;
    }
    //using storage to reduce calls
    const expire_test = Number(
      localStorage.getItem('useGetUserStakedNft_expire')
    );
    const load: any = localStorage.getItem('useGetUserStakedNft');
    const storage = JSON.parse(load);
    setStakedTokensNft(storage ? storage : []);
    if (time.getTime() < expire_test) {
      return;
    }

    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('getUserNfts'),
        args: [new AddressValue(new Address(address))]
      });
      //const proxy = new ProxyNetworkProvider(network.apiAddress);
      const proxy = new ProxyNetworkProvider(network.gatewayCached);
      const queryResponse = await proxy.queryContract(query);
      const endpointDefinition = smartContract.getEndpoint('getUserNfts');
      const { firstValue: rewards } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );
      if (queryResponse.returnCode == 'ok') {
        setStakedTokensNft(rewards?.valueOf());
        //storage of 3 secondes
        const expire = time.getTime() + 1000 * 3;
        localStorage.setItem(
          'useGetUserStakedNft',
          JSON.stringify(rewards?.valueOf())
        );
        localStorage.setItem('useGetUserStakedNft_expire', expire.toString());
      }
    } catch (err) {
      console.error('Unable to call getStakedCollections', err);
    }
  };

  useEffect(() => {
    getUserStakedNft();
  }, [hasPendingTransactions]);

  return stakedTokensNft;
};
