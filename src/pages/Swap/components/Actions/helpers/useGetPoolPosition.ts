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
import { contractSwap } from 'config';
import json from 'swap-contract.abi.json';
import { BigNumber } from 'bignumber.js';

export const useGetPoolPosition = (
  stakedToken: any,
  rewardedToken: any,
  showStake: boolean,
  isDual: boolean
) => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccount();
  const entrypoint = new DevnetEntrypoint({
    url: network.apiAddress
  });
  const contractAddress = Address.newFromBech32(contractSwap);
  const abi = Abi.create(json);
  const controller = entrypoint.createSmartContractController(abi);
  const pending = useGetPendingTransactions();
  const hasPendingTransactions = pending.length > 0;

  //const { network } = useGetNetworkConfig();
  const [tokenPosition, setTokenPosition] = useState({
    first_token: stakedToken,
    second_token: rewardedToken,
    isDual: isDual,
    has_roles: 0,
    first_token_amount: BigNumber(1),
    second_token_amount: BigNumber(1),
    lp_supply: BigNumber(1),
    first_fee: BigNumber(1),
    second_fee: BigNumber(1)
  });
  const time = new Date();

  const getTokenPosition = async () => {
    if (stakedToken == rewardedToken || hasPendingTransactions || !isDual) {
      return;
    }

    // setTokenPosition({
    //   first_token: stakedToken,
    //   second_token: rewardedToken,
    //   isDual: isDual,
    //   has_roles: 0,
    //   first_token_amount: BigInt(1),
    //   second_token_amount: BigInt(1),
    //   lp_supply: BigInt(1),
    //   first_fee: BigInt(1),
    //   second_fee: BigInt(1)
    // });

    //Do not refresh if modal is closed using storage
    // if (showStake == false) {
    //   const expire_test = Number(
    //     localStorage.getItem(
    //       'pool_position_' + stakedToken + '_' + rewardedToken + '_expire'
    //     )
    //   );
    //   const load: any = localStorage.getItem(
    //     'pool_position_' + stakedToken + '_' + rewardedToken
    //   );
    //   const storage = JSON.parse(load);
    //   if (storage) {
    //     setTokenPosition(storage);
    //   }
    //   if (time.getTime() < expire_test) {
    //     return;
    //   }
    // }

    try {
      const response = await controller.query({
        contract: contractAddress,
        function: 'getPoolPosition',
        arguments: [
          new TokenIdentifierValue(stakedToken),
          new TokenIdentifierValue(rewardedToken)
        ]
      });
      const tab = response[0];
      if (response) {
        setTokenPosition({
          first_token: stakedToken,
          second_token: rewardedToken,
          isDual: isDual,
          has_roles: tab[0],
          first_token_amount: new BigNumber(tab[1]),
          second_token_amount: new BigNumber(tab[2]),
          lp_supply: new BigNumber(tab[3]),
          first_fee: new BigNumber(tab[4]),
          second_fee: new BigNumber(tab[5])
        });
        //storage of 10 minutes
        const expire = time.getTime() + 1000 * 60 * 10;
        localStorage.setItem(
          'pool_position_' + stakedToken + '_' + rewardedToken,
          JSON.stringify({
            first_token: stakedToken,
            second_token: rewardedToken,
            isDual: isDual,
            has_roles: tab[0],
            first_token_amount: new BigNumber(tab[1]),
            second_token_amount: new BigNumber(tab[2]),
            lp_supply: new BigNumber(tab[3]),
            first_fee: new BigNumber(tab[4]),
            second_fee: new BigNumber(tab[5])
          })
        );
        localStorage.setItem(
          'pool_position_' + stakedToken + '_' + rewardedToken + '_expire',
          expire.toString()
        );
      }
    } catch (err) {
      console.error('Unable to call getPoolPosition', err);
    }
  };

  useEffect(() => {
    getTokenPosition();
  }, [stakedToken, rewardedToken, showStake]);

  return tokenPosition;
};
