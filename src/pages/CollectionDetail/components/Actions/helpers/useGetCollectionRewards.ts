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
      pool_id: 0,
      identifier: stakedToken,
      rewards: BigInt(0),
      total_staked: BigInt(0),
      total_rewarded: BigInt(0),
      last_fund_block: 0,
      paused: 0,
      blocks_to_max: 0,
      vesting: 0,
      unbounding: 0,
      nonce: 0
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
        //storage of 15 minutes
        const expire = time.getTime() + 1000 * 60 * 15;
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
  }, []);

  return stakedTokens;
};
