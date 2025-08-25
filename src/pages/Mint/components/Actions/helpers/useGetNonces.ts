// import { useEffect, useState } from 'react';
// import { ContractFunction, ResultsParser } from '@multiversx/sdk-core/out';
// import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
// import { local_network } from 'config';
// import { smartContract } from './smartContract';

// const resultsParser = new ResultsParser();

// export const useGetNonces = () => {
//   const [stakedTokens, setStakedTokens] = useState<string[]>([]);
//   // const time = new Date();

//   const getStakedTokens = async () => {
//     //using storage to reduce calls
//     // const expire_test = Number(localStorage.getItem('mint_nonces_expire'));
//     // const storage = localStorage.getItem('mint_nonces');
//     // const tokens = storage?.split(',');
//     // setStakedTokens(tokens ? tokens : []);
//     // if (time.getTime() < expire_test) {
//     //   return;
//     // }

//     try {
//       const query = smartContract.createQuery({
//         func: new ContractFunction('getNonces')
//       });
//       //const proxy = new ProxyNetworkProvider(network.apiAddress);
//       const proxy = new ProxyNetworkProvider(network.gatewayCached);
//       const queryResponse = await proxy.queryContract(query);
//       const endpointDefinition = smartContract.getEndpoint('getNonces');
//       const { firstValue: tokens } = resultsParser.parseQueryResponse(
//         queryResponse,
//         endpointDefinition
//       );
//       if (queryResponse.returnCode == 'ok') {
//         setStakedTokens(tokens?.valueOf()?.toString(10).split(','));
//         //storage of 15 minutes
//         // const expire = time.getTime() + 1000 * 60 * 15;
//         //const expire = time.getTime() + 1000 * 60 * 15;
//         // localStorage.setItem(
//         //   'mint_nonces',
//         //   tokens?.valueOf()?.toString(10).split(',')
//         // );
//         // localStorage.setItem('mint_nonces_expire', expire.toString());
//       }
//     } catch (err) {
//       console.error('Unable to call getNonces', err);
//     }
//   };

//   useEffect(() => {
//     getStakedTokens();
//   }, []);

//   return stakedTokens;
// };
