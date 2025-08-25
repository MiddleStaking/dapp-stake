// import { useEffect, useState } from 'react';
// import {
//   Address,
//   AddressValue,
//   ContractFunction,
//   ResultsParser
// } from '@multiversx/sdk-core/out';
// import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks';
// import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
// import { local_network } from 'config';
// import { smartContract } from './smartContract';

// const resultsParser = new ResultsParser();

// export const useGetUserCredits = (address: string) => {
//   const { hasPendingTransactions } = useGetPendingTransactions();
//   const [userCredits, setUserCredits] = useState(BigInt(0));
//   //const time = new Date();

//   const getUserCredits = async () => {
//     if (hasPendingTransactions == true || address == '') {
//       return;
//     }
//     //using storage to reduce calls
//     // const expire_test = Number(localStorage.getItem('useGetUserStakedexpire'));
//     // const load: any = localStorage.getItem('useGetUserStakedNft');
//     // const storage = JSON.parse(load);
//     // setStakedTokensNft(storage ? storage : []);
//     // if (time.getTime() < expire_test) {
//     //   return;
//     // }

//     try {
//       const query = smartContract.createQuery({
//         func: new ContractFunction('getUserCredits'),
//         args: [new AddressValue(new Address(address))]
//       });
//       //const proxy = new ProxyNetworkProvider(network.apiAddress);
//       const proxy = new ProxyNetworkProvider(network.gatewayAddress);
//       const queryResponse = await proxy.queryContract(query);
//       const endpointDefinition = smartContract.getEndpoint('getUserCredits');
//       const { firstValue: rewards } = resultsParser.parseQueryResponse(
//         queryResponse,
//         endpointDefinition
//       );
//       if (queryResponse.returnCode == 'ok') {
//         setUserCredits(rewards?.valueOf());
//         //storage of 3 secondes
//         // const expire = time.getTime() + 1000 * 3;
//         // localStorage.setItem(
//         //   'useGetUserStakedNft',
//         //   JSON.stringify(rewards?.valueOf())
//         // );
//         // localStorage.setItem('useGetUserStakedexpire', expire.toString());
//       }
//     } catch (err) {
//       console.error('Unable to call getUserCredits', err);
//     }
//   };

//   useEffect(() => {
//     getUserCredits();
//   }, [hasPendingTransactions]);

//   return userCredits;
// };
