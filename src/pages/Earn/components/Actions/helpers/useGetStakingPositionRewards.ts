// import { useEffect, useState } from 'react';
// import {
//   Abi,
//   Address,
//   AddressValue,
//   ContractFunction,
//   DevnetEntrypoint,
//   TokenIdentifierValue
// } from '@multiversx/sdk-core/out';
// import {
//   useGetAccount,
//   useGetNetworkConfig,
//   useGetPendingTransactions
// } from 'lib';
// import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers';
// import { contractStake, network } from 'config';
// import json from 'staking-contract.abi.json';

// export const useGetStakingPositionRewards = (
//   stakedToken: any,
//   rewardedToken: any,
//   stake_amount: bigint
// ) => {
//   const { network } = useGetNetworkConfig();
//   const { address } = useGetAccount();
//   const entrypoint = new DevnetEntrypoint({
//     url: network.apiAddress
//   });
//   const contractAddress = Address.newFromBech32(contractStake);
//   const abi = Abi.create(json);
//   const controller = entrypoint.createSmartContractController(abi);
//   const pending = useGetPendingTransactions();
//   const hasPendingTransactions = pending.length > 0;

//   const [rewardsAmount, setRewardsAmount] = useState<bigint>(BigInt(0));
//   const [time, setTime] = useState(new Date());

//   const getStakingPositionRewards = async () => {
//     //Dont call if no stake
//     if (stake_amount == BigInt(0) || address == '') {
//       return;
//     }
//     if (hasPendingTransactions == true) {
//       return;
//     }
//     try {
//       const response = await controller.query({
//         contract: contractAddress,
//         function: 'calculateRewardsForUser',
//         arguments: [
//           new AddressValue(new Address(address)),
//           new TokenIdentifierValue(stakedToken),
//           new TokenIdentifierValue(rewardedToken)
//         ]
//       });

//       // const query = smartContract.createQuery({
//       //   func: new ContractFunction('calculateRewardsForUser'),
//       //   args: [
//       //     new AddressValue(new Address(address)),
//       //     new TokenIdentifierValue(stakedToken),
//       //     new TokenIdentifierValue(rewardedToken)
//       //   ]
//       // });

//       //const proxy = new ProxyNetworkProvider(network.apiAddress);
//       // const proxy = new ProxyNetworkProvider(network.gatewayAddress);
//       // const queryResponse = await proxy.queryContract(query);
//       // const endpointDefinition = smartContract.getEndpoint(
//       //   'calculateRewardsForUser'
//       // );
//       // const { firstValue: amount } = resultsParser.parseQueryResponse(
//       //   queryResponse,
//       //   endpointDefinition
//       // );
//       const position = response?.valueOf();
//       setRewardsAmount(response ? BigInt(position.toString()) : BigInt(0));
//     } catch (err) {
//       console.error('Unable to call calculateRewardsForUser', err);
//     }
//   };

//   useEffect(() => {
//     if (stake_amount > BigInt(0)) {
//       getStakingPositionRewards();
//     }

//     const interval = setInterval(() => {
//       setTime(new Date());
//       if (stake_amount > BigInt(0)) {
//         getStakingPositionRewards();
//       } else {
//         stake_amount = BigInt(0);
//       }
//     }, 300000);

//     return () => clearInterval(interval);
//   }, [stake_amount, hasPendingTransactions, time]);

//   return rewardsAmount;
// };
