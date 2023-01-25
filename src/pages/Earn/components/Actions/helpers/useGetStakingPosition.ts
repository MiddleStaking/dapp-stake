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

const resultsParser = new ResultsParser();

export const useGetStakingPosition = (stakedToken: any, rewardedToken: any) => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccount();
  const [stakedAmount, setStakedAmount] = useState<bigint>(BigInt(1));

  const getStakingPosition = async () => {
    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('getStakingPosition'),
        args: [
          new AddressValue(new Address(address)),
          new TokenIdentifierValue(stakedToken),
          new TokenIdentifierValue(rewardedToken)
        ]
      });

      const proxy = new ProxyNetworkProvider(network.apiAddress);
      const queryResponse = await proxy.queryContract(query);
      const endpointDefinition =
        smartContract.getEndpoint('getStakingPosition');
      const { firstValue: amount } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );
      const position: bigint =
        amount?.valueOf()?.toFixed() === undefined
          ? '0'
          : amount?.valueOf().toFixed();
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
