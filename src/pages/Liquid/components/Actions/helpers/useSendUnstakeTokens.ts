import { useEffect, useState } from 'react';
import { useGetAccount } from '@multiversx/sdk-dapp/hooks';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers';
import {
  Address,
  AddressValue,
  ContractFunction,
  ResultsParser,
  TokenIdentifierValue
} from '@multiversx/sdk-core/out';
import { smartContract } from './smartContract';
import { defaultToken } from 'config';
import { network } from 'config';

const resultsParser = new ResultsParser();

export const useGetStakingPosition = (stakedToken: any, rewardedToken: any) => {
  //const { network } = useGetNetworkConfig();
  const { address } = useGetAccount();
  const [stakedAmount, setStakedAmount] = useState<bigint>(BigInt(1));

  const getStakingPosition = async () => {
    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('unstake'),
        args: [
          new AddressValue(new Address(address)),
          new TokenIdentifierValue(stakedToken),
          new TokenIdentifierValue(rewardedToken)
        ]
      });

      const proxy = new ProxyNetworkProvider(network.apiAddress);
      const queryResponse = await proxy.queryContract(query);
      const endpointDefinition = smartContract.getEndpoint('unstake');
      const { firstValue: amount } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );
      const position =
        amount?.valueOf()?.toString(10) === undefined
          ? '0'
          : amount?.valueOf()?.toString(10);
      setStakedAmount(position);
    } catch (err) {
      console.error('Unable to call getStakingPosition', err);
    }
  };

  useEffect(() => {
    getStakingPosition();
  }, []);

  return stakedAmount;
};
