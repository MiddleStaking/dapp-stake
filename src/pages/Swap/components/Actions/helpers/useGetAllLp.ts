import { useEffect, useState } from 'react';
import { ContractFunction, ResultsParser } from '@multiversx/sdk-core/out';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers';
import { BigNumber } from 'bignumber.js';
import { network } from 'config';
import { smartContract } from './smartContract';

const resultsParser = new ResultsParser();

export const useGetAllLp = () => {
  const [tokenPosition, setTokenPosition] = useState([
    {
      swaped_token: '',
      lp_token: '',
      first_token_amount: BigNumber(1),
      second_token_amount: BigNumber(1)
    }
  ]);
  const time = new Date();

  const getAllLp = async () => {
    const expire_test = Number(localStorage.getItem('all_lp_expire'));
    const item = localStorage.getItem('all_lp');
    const storage = item && item !== 'undefined' ? JSON.parse(item) : null;

    if (storage) {
      setTokenPosition(storage);
    }
    if (time.getTime() < expire_test) {
      return;
    }

    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('getAllLp'),
        args: []
      });

      const proxy = new ProxyNetworkProvider(network.gatewayCached);

      const queryResponse = await proxy.queryContract(query);
      const endpointDefinition = smartContract.getEndpoint('getAllLp');
      const { firstValue: position } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );
      if (queryResponse.returnCode == 'ok') {
        setTokenPosition(position?.valueOf());
        const expire = time.getTime() + 1000 * 15 * 1;
        localStorage.setItem('all_lp', JSON.stringify(position?.valueOf()));
        localStorage.setItem('all_lp_expire', expire.toString());
      }
    } catch (err) {
      console.error('Unable to call getAllLp', err);
    }
  };

  useEffect(() => {
    getAllLp();
  }, []);

  return tokenPosition;
};
