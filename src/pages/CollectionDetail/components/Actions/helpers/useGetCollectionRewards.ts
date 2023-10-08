import { useEffect, useState } from 'react';
import {
  ContractFunction,
  ResultsParser,
  TokenIdentifierValue
} from '@multiversx/sdk-core/out';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
import { smartContract } from './smartContract';
import { network } from 'config';

const resultsParser = new ResultsParser();

export const useGetCollectionRewards = (stakedToken: string) => {
  const [stakedTokens, setStakedTokens] = useState([
    {
      pool_id: BigInt(0),
      collection: '',
      total_staked: BigInt(1),
      identifier: '',
      rewards: BigInt(1),
      total_rewarded: BigInt(1),
      last_fund_block: BigInt(1),
      speed: BigInt(1),
      vesting: BigInt(0),
      unbounding: BigInt(0),
      nonce: BigInt(0)
    }
  ]);

  const time = new Date();

  const getStakedTokens = async () => {
    //using storage to reduce calls
    const expire_test = Number(
      localStorage.getItem('collection_rewards_' + stakedToken + '_expire')
    );
    const load: any = localStorage.getItem('collection_rewards_' + stakedToken);
    const storage = JSON.parse(load);
    setStakedTokens(storage ? storage : []);
    if (time.getTime() < expire_test) {
      return;
    }

    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('getRewards'),
        args: [new TokenIdentifierValue(stakedToken)]
      });
      //const proxy = new ProxyNetworkProvider(network.apiAddress);
      const proxy = new ProxyNetworkProvider(network.gatewayCached);
      const queryResponse = await proxy.queryContract(query);
      const endpointDefinition = smartContract.getEndpoint('getRewards');
      const { firstValue: rewards } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );
      if (queryResponse.returnCode == 'ok') {
        setStakedTokens(rewards?.valueOf());
        //storage of 1 minutes
        const expire = time.getTime() + 1000 * 60 * 1;
        localStorage.setItem(
          'collection_rewards_' + stakedToken,
          JSON.stringify(rewards?.valueOf())
        );
        localStorage.setItem(
          'collection_rewards_' + stakedToken + '_expire',
          expire.toString()
        );
      }
    } catch (err) {
      console.error('Unable to call getStakedCollections', err);
    }
  };

  useEffect(() => {
    getStakedTokens();
  }, [stakedToken]);

  return stakedTokens;
};
