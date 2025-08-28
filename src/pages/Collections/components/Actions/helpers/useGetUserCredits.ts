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

export const useGetUserCredits = (address: string) => {
  const { network } = useGetNetworkConfig();

  const entrypoint = new DevnetEntrypoint({
    url: network.apiAddress
  });
  const contractAddress = Address.newFromBech32(contractNftStake);
  const abi = Abi.create(json);
  const controller = entrypoint.createSmartContractController(abi);
  const pending = useGetPendingTransactions();
  const hasPendingTransactions = pending.length > 0;
  const [userCredits, setUserCredits] = useState(BigInt(0));
  //const time = new Date();

  const getUserCredits = async () => {
    if (hasPendingTransactions == true || address == '') {
      return;
    }
    //using storage to reduce calls
    // const expire_test = Number(localStorage.getItem('useGetUserStakedexpire'));
    // const load: any = localStorage.getItem('useGetUserStakedNft');
    // const storage = JSON.parse(load);
    // setStakedTokensNft(storage ? storage : []);
    // if (time.getTime() < expire_test) {
    //   return;
    // }

    try {
      const response = await controller.query({
        contract: contractAddress,
        function: 'getUserCredits',
        arguments: [new AddressValue(new Address(address))]
      });

      // Assuming response is an array and the credit value is at index 0
      const creditValue = BigInt(response?.[0]);
      setUserCredits(creditValue);
      //storage of 3 secondes
      // const expire = time.getTime() + 1000 * 3;
      // localStorage.setItem(
      //   'useGetUserStakedNft',
      //   JSON.stringify(rewards?.valueOf())
      // );
      // localStorage.setItem('useGetUserStakedexpire', expire.toString());
    } catch (err) {
      console.error('Unable to call getUserCredits', err);
    }
  };

  useEffect(() => {
    getUserCredits();
  }, [hasPendingTransactions]);

  return userCredits;
};
