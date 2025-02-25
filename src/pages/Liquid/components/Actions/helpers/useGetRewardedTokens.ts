import { useEffect, useState } from 'react';
import {
  ContractFunction,
  ResultsParser,
  TokenIdentifierValue
} from '@multiversx/sdk-core/out';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
import { defaultPairs, network } from 'config';
import { smartContract } from './smartContract';

const resultsParser = new ResultsParser();

export const useGetRewardedTokens = (stakedToken: string) => {
  //const { network } = useGetNetworkConfig();
  const [rewardedTokens, setRewardedTokens] = useState<string[]>([]);
  const time = new Date();

  const getRewardedTokens = async () => {
    //using storage to reduce calls
    const expire_test = Number(
      localStorage.getItem('rewarded_tokens_' + stakedToken + '_expire')
    );
    const storage = localStorage.getItem('rewarded_tokens_' + stakedToken);
    const tok = storage?.split(',');
    setRewardedTokens(tok ? tok : []);
    const pairs =
      localStorage.getItem('pairs_') != null
        ? JSON.parse(localStorage.getItem('pairs_') as string)
        : defaultPairs;
    if (time.getTime() < expire_test) {
      return;
    }

    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('getRewardedTokens'),
        args: [new TokenIdentifierValue(stakedToken)]
      });
      //const proxy = new ProxyNetworkProvider(network.apiAddress);
      const proxy = new ProxyNetworkProvider(
        'https://api.middlestaking.fr/' + network.id
      );
      const queryResponse = await proxy.queryContract(query);
      const endpointDefinition = smartContract.getEndpoint('getRewardedTokens');
      const { firstValue: tokens } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );
      if (queryResponse.returnCode == 'ok') {
        setRewardedTokens(tokens?.valueOf()?.toString(10).split(','));
        //storage of 15 minutes
        const expire = time.getTime() + 1000 * 60 * 15;
        //const expire = time.getTime() + 1000 * 60 * 15;
        localStorage.setItem(
          'rewarded_tokens_' + stakedToken,
          tokens?.valueOf()?.toString(10).split(',')
        );
        localStorage.setItem(
          'rewarded_tokens_' + stakedToken + '_expire',
          expire.toString()
        );

        for (const token of tokens?.valueOf()?.toString(10).split(',')) {
          const p: any = { s: stakedToken, r: token };
          pairs.findIndex((e: any) => e?.s === p.s && e?.r === p.r) === -1
            ? pairs.push(p)
            : '';
        }
        localStorage.setItem('pairs_', JSON.stringify(pairs));
      }
    } catch (err) {
      console.error('Unable to call getRewardedTokens', err);
    }
  };

  useEffect(() => {
    getRewardedTokens();
  }, [stakedToken]);

  return rewardedTokens;
};
