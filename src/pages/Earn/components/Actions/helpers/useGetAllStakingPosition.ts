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
import { contractStake } from 'config';
import json from 'staking-contract.abi.json';
import BigNumber from 'bignumber.js';

export const useGetAllStakingPosition = (stakedToken: any) => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccount();
  const entrypoint = new DevnetEntrypoint({
    url: network.apiAddress
  });
  const contractAddress = Address.newFromBech32(contractStake);
  const abi = Abi.create(json);
  const controller = entrypoint.createSmartContractController(abi);
  const pending = useGetPendingTransactions();
  const hasPendingTransactions = pending.length > 0;
  const [tokenPosition, setTokenPosition] = useState([
    {
      rewarded_token: '',
      staking_position: {
        stake_amount: BigNumber(0),
        last_action_block: BigNumber(1)
      }
    }
  ]);

  const getAllStakingPosition = async () => {
    if (!address) {
      setTokenPosition([]);
      return;
    }
    if (hasPendingTransactions == true) {
      return;
    }

    try {
      const response = await controller.query({
        contract: contractAddress,
        function: 'getAllStakingPosition',
        arguments: [
          new AddressValue(new Address(address)),
          new TokenIdentifierValue(stakedToken)
        ]
      });

      setTokenPosition(response);

      //const expire = time.getTime() + 1000 * 60 * 1;

      // console.log(renderJson(position?.valueOf()));
      // localStorage.setItem(
      //   'all_token_position_' + stakedToken,
      //   renderJson(position?.valueOf())
      // );
      // localStorage.setItem(
      //   'all_token_position_' + stakedToken + '_expire',
      //   expire.toString()
      // );
    } catch (err) {
      console.error('Unable to call getStakingPosition', err);
    }
  };

  useEffect(() => {
    getAllStakingPosition();
  }, [stakedToken, hasPendingTransactions]);

  return tokenPosition;
};
