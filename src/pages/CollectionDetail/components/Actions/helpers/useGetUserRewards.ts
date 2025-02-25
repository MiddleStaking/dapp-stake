import { useEffect, useState } from 'react';
import {
  Address,
  AddressValue,
  ContractFunction,
  ResultsParser,
  TokenIdentifierValue
} from '@multiversx/sdk-core/out';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
import { network } from 'config';
import { smartContract } from './smartContract';

const resultsParser = new ResultsParser();

export const useGetUserRewards = (address: string, collection: string) => {
  const [stakedTokensNft, setStakedTokensNft] = useState([
    {
      pool_id: 0,
      rewards: ''
    }
  ]);
  const time = new Date();

  const getUserStakedNft = async () => {
    // using storage to reduce calls
    const expire_test = Number(localStorage.getItem('user_rewards_nft_expire'));
    const load: any = localStorage.getItem('user_rewards_nft');
    const storage = JSON.parse(load);
    setStakedTokensNft(storage ? storage : []);
    if (time.getTime() < expire_test) {
      return;
    }

    if (!address) {
      return;
    }

    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('getAllRewardsForUser'),
        args: [
          new AddressValue(new Address(address)),
          new TokenIdentifierValue(collection)
        ]
      });
      //const proxy = new ProxyNetworkProvider(network.apiAddress);
      const proxy = new ProxyNetworkProvider(network.gatewayAddress);
      const queryResponse = await proxy.queryContract(query);
      const endpointDefinition = smartContract.getEndpoint(
        'getAllRewardsForUser'
      );
      const { firstValue: rewards } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );
      if (queryResponse.returnCode == 'ok') {
        setStakedTokensNft(rewards?.valueOf());
        //storage of 10 secondes
        const expire = time.getTime() + 1000 * 10 * 1;
        localStorage.setItem(
          'user_rewards_nft',
          JSON.stringify(rewards?.valueOf())
        );
        localStorage.setItem('user_rewards_nft_expire', expire.toString());
      }
    } catch (err) {
      console.error('Unable to call getStakedCollections', err);
    }
  };

  useEffect(() => {
    getUserStakedNft();
  }, []);

  return stakedTokensNft;
};
