import { useEffect, useState } from 'react';
import {
  Abi,
  Address,
  AddressValue,
  ContractFunction,
  decodeBigNumber,
  decodeString,
  decodeUnsignedNumber,
  DevnetEntrypoint,
  TokenIdentifierValue
} from '@multiversx/sdk-core/out';
import {
  useGetAccount,
  useGetNetworkConfig,
  useGetPendingTransactions,
  useGetSuccessfulTransactions
} from 'lib';
import { contractSwap } from 'config';

import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers';

import { local_network, auctionContract } from 'config';
import { useDispatch } from 'context';
import BigNumber from 'bignumber.js';

interface ContractDetailsType {
  automaticActivation: string;
  redelegationCap: string;
  serviceFee: string;
  delegationCap: string;
  owner: boolean;
  withDelegationCap: string;
}

interface globalFetchesType {
  [key: string]: any;
  getContractDetails: {
    key: string;
    handler: () => Promise<ContractDetailsType | string>;
  };
  getNodesNumber: {
    key: string;
    handler: () => Promise<Buffer[] | string>;
  };
  getNodesStates: {
    key: string;
    handler: () => Promise<Buffer[] | string>;
  };
  getTotalActiveStake: {
    key: string;
    handler: () => Promise<string>;
  };
  getUserActiveStake: {
    key: string;
    handler: () => Promise<string>;
  };
  getNetworkConfig: {
    key: string;
    handler: () => Promise<any>;
  };
}

const useGlobalData = () => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccount();
  const entrypoint = new DevnetEntrypoint({
    url: local_network.gatewayCached
  });
  const contractAddress = Address.newFromBech32(
    local_network.delegationContract
  );
  const abi = Abi.create({
    endpoints: [
      {
        name: 'getContractConfig',
        inputs: [],
        outputs: [
          { name: 'ownerAddress', type: 'Address' },
          { name: 'serviceFee', type: 'BigUint' },
          { name: 'maxDelegationCap', type: 'BigUint' },
          { name: 'initialOwnerFunds', type: 'BigUint' },
          { name: 'automaticActivation', type: 'u8' },
          { name: 'withDelegationCap', type: 'u8' },
          { name: 'changeableServiceFee', type: 'u8' },
          { name: 'createdNonce', type: 'u64' },
          { name: 'unBondPeriod', type: 'u64' }
        ]
      },
      {
        name: 'getAllNodeStates',
        inputs: [],
        outputs: [
          {
            type: 'variadic<tuple<bytes,u8>>',
            multi_result: true
          }
        ]
      },
      {
        name: 'getTotalActiveStake',
        inputs: [],
        outputs: [{ name: 'stake', type: 'BigUint' }]
      },
      {
        name: 'getUserActiveStake',
        inputs: [{ name: 'addr', type: 'Address' }],
        outputs: [{ name: 'stake', type: 'BigUint' }]
      },
      {
        name: 'getBlsKeysStatus',
        inputs: [{ name: 'addr', type: 'Address' }],
        outputs: [{ name: 'keys', type: 'variadic<bytes>', multi_result: true }]
      }
      // outputs: [
      //       {
      //         type: 'variadic<tuple<bytes,bytes>>',
      //         multi_result: true
      //       }
      //     ]
      //   }
    ]
  });
  const controller = entrypoint.createSmartContractController(abi);
  const transactions = useGetSuccessfulTransactions();
  const hasSuccessfulTransactions = transactions.length > 0;

  const dispatch = useDispatch();
  const provider = new ProxyNetworkProvider(local_network.gatewayAddress);
  const criticalFetches: globalFetchesType = {
    getContractDetails: {
      key: 'contractDetails',
      handler: async (): Promise<ContractDetailsType | string> => {
        try {
          const response = await controller.query({
            contract: contractAddress,
            function: 'getContractConfig',
            arguments: []
          });

          //   const query = new Query({
          //     address: new Address(local_network.delegationContract),
          //     func: new ContractFunction('getContractConfig')
          //   });

          //   const data = await provider.queryContract(query);
          //   const response = data.getReturnDataParts();

          //   0 { name: 'ownerAddress', type: 'Address' },
          //   1 { name: 'serviceFee', type: 'BigUint' },
          //   2 { name: 'maxDelegationCap', type: 'BigUint' },
          //   3 { name: 'initialOwnerFunds', type: 'BigUint' },
          //   4 { name: 'automaticActivation', type: 'u8' },
          //   5 { name: 'withDelegationCap', type: 'u8' },
          //   6 { name: 'changeableServiceFee', type: 'u8' },
          //   7 { name: 'createdNonce', type: 'u64' },
          //   8 { name: 'unBondPeriod', type: 'u64' }

          const ownerAddressIndex = 0;
          const serviceFeeIndex = 1;
          const delegationCapIndex = 2;
          const automaticActivationIndex = 4;
          const withDelegationCapIndex = 5;
          const redelegationCapIndex = 7;

          const ownerAddress = response[ownerAddressIndex];
          const serviceFee = new BigNumber(response[serviceFeeIndex]);

          const delegationCap = new BigNumber(response[delegationCapIndex]);
          const activationStatus = response[automaticActivationIndex];
          const withDelegationCap = response[withDelegationCapIndex];
          const redelegationCap = new BigNumber(response[redelegationCapIndex]);
          //   return {
          //     withDelegationCap: String(withDelegationCap),
          //     owner:
          //       new Address(address).toHex() === ownerAddress.toString('hex'),
          //     delegationCap: decodeBigNumber(delegationCap).toFixed(),
          //     redelegationCap:
          //       decodeString(redelegationCap) === 'true' ? 'ON' : 'OFF',
          //     serviceFee:
          //       (decodeUnsignedNumber(serviceFee) / 100).toString() + '%',
          //     automaticActivation:
          //       decodeString(activationStatus) === 'true' ? 'ON' : 'OFF'
          //   };
          console.log('getContractConfig decoded');
          console.log('redelegationCap', redelegationCap);
          return {
            automaticActivation: 'string',
            redelegationCap: 'zzreez',
            serviceFee: serviceFee.dividedBy(100).toFixed() + ' %',
            delegationCap: delegationCap.toFixed(),
            owner: true,
            withDelegationCap: 'string'
          };
        } catch (error) {
          console.error('Error fetching contract details', error);
          return Promise.reject(error);
        }
      }
    },
    getNodesNumber: {
      key: 'nodesNumber',
      handler: async (): Promise<Buffer[] | string> => {
        try {
          const response = await controller.query({
            contract: new Address(
              'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqplllst77y4l'
            ),
            function: 'getBlsKeysStatus',
            arguments: [
              new AddressValue(new Address(local_network.delegationContract))
            ]
          });
          console.log('getBlsKeysStatus', response[0]);

          //   const query = new Query({
          //     address: new Address(auctionContract),
          //     func: new ContractFunction('getBlsKeysStatus'),
          //     args: [
          //       new AddressValue(new Address(local_network.delegationContract))
          //     ]
          //   });

          //   const data = await provider.queryContract(query);
          //   const response = data.getReturnDataParts();

          return response[0];
        } catch (error) {
          console.error('Error fetching nodes number', error);
          return Promise.reject(error);
        }
      }
    },
    getNodesStates: {
      key: 'nodesStates',
      handler: async (): Promise<Buffer[] | string> => {
        try {
          const response = await controller.query({
            contract: contractAddress,
            function: 'getAllNodeStates',
            arguments: []
          });
          console.log('getAllNodeStates', response);

          //   const query = new Query({
          //     address: new Address(local_network.delegationContract),
          //     func: new ContractFunction('getAllNodeStates')
          //   });

          //   const data = await provider.queryContract(query);
          //   const response = data.getReturnDataParts();

          return response;
        } catch (error) {
          return Promise.reject(error);
        }
      }
    },
    getTotalActiveStake: {
      key: 'totalActiveStake',
      handler: async (): Promise<string> => {
        try {
          const response = await controller.query({
            contract: contractAddress,
            function: 'getTotalActiveStake',
            arguments: []
          });

          console.log('getTotalActiveStake', response);
          //   const query = new Query({
          //     address: new Address(local_network.delegationContract),
          //     func: new ContractFunction('getTotalActiveStake')
          //   });

          //   const data = await provider.queryContract(query);
          const [totalNodes] = response;

          return response[0] ? new BigNumber(response[0]).toFixed() : '0';
        } catch (error) {
          return Promise.reject(error);
        }
      }
    },
    getUserActiveStake: {
      key: 'userActiveStake',
      handler: async (): Promise<string> => {
        try {
          const response = await controller.query({
            contract: contractAddress,
            function: 'getUserActiveStake',
            arguments: [new AddressValue(new Address(address))]
          });

          console.log('getUserActiveStake', response);
          const userStake = new BigNumber(response[0]);

          if (!userStake) {
            return '0';
          }

          return userStake.toFixed();
        } catch (error) {
          return Promise.reject(error);
        }
      }
    },
    getNetworkConfig: {
      key: 'networkConfig',
      handler: async (): Promise<any> => {
        try {
          return await provider.getNetworkConfig();
        } catch (error) {
          return Promise.reject(error);
        }
      }
    }
  };

  const fetchCriticalData = (): void => {
    const fetchData = async () => {
      const keys = Object.keys(criticalFetches);

      keys.forEach((key) => {
        dispatch({
          type: key,
          [criticalFetches[key].key]: {
            status: 'loading',
            data: null,
            error: null
          }
        });
      });

      const data = await Promise.allSettled(
        keys.map((key: string) => criticalFetches[key].handler())
      );

      data.forEach((item: any, index: any) => {
        dispatch({
          type: keys[index],
          [criticalFetches[keys[index]].key]: {
            status: item.status === 'rejected' ? 'error' : 'loaded',
            error: item.reason || null,
            data: item.value || null
          }
        });
      });
    };

    fetchData();
  };

  useEffect(fetchCriticalData, []);
  useEffect(() => {
    if (hasSuccessfulTransactions && transactions.length > 0) {
      fetchCriticalData();
    }
  }, [hasSuccessfulTransactions, transactions.length]);
};

export default useGlobalData;
