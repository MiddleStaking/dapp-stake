import { useEffect, useState } from 'react';
import {
  Address,
  AddressValue,
  ContractFunction,
  ResultsParser,
  TokenIdentifierValue
} from '@multiversx/sdk-core/out';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
import { smartContract } from './smartContract';
import { network } from 'config';

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
    //using storage to reduce calls
    // const expire_test = Number(
    //     localStorage.getItem('collection_rewards_' + stakedToken + '_expire')
    // );
    // const load: any = localStorage.getItem('collection_rewards_' + stakedToken);
    // const storage = JSON.parse(load);
    // setStakedTokens(storage ? storage : []);
    // if (time.getTime() < expire_test) {
    //     return;
    // }

    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('getAllRewardsForUser'),
        args: [
          new AddressValue(new Address(address)),
          new TokenIdentifierValue(collection)
        ]
      });
      //const proxy = new ProxyNetworkProvider(network.apiAddress);
      const proxy = new ProxyNetworkProvider(network.gatewayCached);
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
        //storage of 15 minutes
        // const expire = time.getTime() + 1000 * 60 * 15;
        // localStorage.setItem(
        //     'collection_rewards_' + stakedToken,
        //     JSON.stringify(rewards?.valueOf())
        // );
        // localStorage.setItem(
        //     'collection_rewards_' + stakedToken + '_expire',
        //     expire.toString()
        // );
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