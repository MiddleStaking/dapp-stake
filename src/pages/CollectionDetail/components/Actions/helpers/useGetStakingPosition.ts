import { useEffect, useState } from 'react';
import {
  Abi,
  Address,
  AddressValue,
  ContractFunction,
  DevnetEntrypoint,
  TokenIdentifierValue
} from '@multiversx/sdk-core/out';
import {
  useGetAccount,
  useGetNetworkConfig,
  useGetPendingTransactions
} from 'lib';
import { contractNftStake } from 'config';
import json from 'staking-nft.abi.json';
import { BigNumber } from 'bignumber.js';

export const useGetStakingPosition = (stakedToken: any, rewardedToken: any) => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccount();
  const entrypoint = new DevnetEntrypoint({
    url: network.apiAddress
  });
  const contractAddress = Address.newFromBech32(contractNftStake);
  const abi = Abi.create(json);
  const controller = entrypoint.createSmartContractController(abi);
  const pending = useGetPendingTransactions();
  const hasPendingTransactions = pending.length > 0;

  const [stakingPosition, setStakingPosition] = useState({
    stake_amount: BigInt(0),
    last_action_block: BigInt(0)
  });

  const getStakingPosition = async () => {
    if (hasPendingTransactions == true || address == '') {
      return;
    }
    try {
      const response = await controller.query({
        contract: contractAddress,
        function: 'getStakingPosition',
        arguments: [
          new AddressValue(new Address(address)),
          new TokenIdentifierValue(stakedToken),
          new TokenIdentifierValue(rewardedToken)
        ]
      });

      const tab = response[0];

      if (tab) {
        setStakingPosition({
          stake_amount: tab[0].toFixed(),
          last_action_block: tab[1].toFixed()
        });
      } else {
        setStakingPosition({
          stake_amount: BigInt(0),
          last_action_block: BigInt(0)
        });
      }
    } catch (err) {
      console.error('Unable to call getStakingPosition', err);
    }
  };

  useEffect(() => {
    getStakingPosition();
  }, [hasPendingTransactions]);

  return stakingPosition;
};
