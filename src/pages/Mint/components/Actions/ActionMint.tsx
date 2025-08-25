// import * as React from 'react';
// import { useState } from 'react';
// import { useGetPendingTransactions } from 'lib';
// import { signAndSendTransactions } from 'helpers';
// import {
//   AbiRegistry,
//   Address,
//   GAS_PRICE,
//   SmartContractTransactionsFactory,
//   Transaction,
//   TransactionsFactoryConfig,
//   useGetAccount,
//   useGetNetworkConfig,
//   useGetAccountInfo
// } from 'lib';
// import { contractMint, defaultToken } from 'config';
// import { Button } from '../../../../components/Design';
// import bigToHex from 'helpers/bigToHex';

// export const ActionMint = ({
//   method,
//   bigValue,
//   disabled,
//   nonce,
//   collection
// }: any) => {
//   const { network } = useGetNetworkConfig();
//   const { address } = useGetAccountInfo();

//   const transactions = useGetPendingTransactions();
//   const hasPendingTransactions = transactions.length > 0;
//   const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
//       string | null
//     >(null);

//   const sendMintTransaction = async () => {
//     let transaction: Transaction | Transaction[] = [];
//     let payload = 'buySft';

//     if (method == 'egld') {
//       transaction = new Transaction({
//         value: BigInt(bigValue),
//         data: new TextEncoder().encode(payload),
//         receiver: new Address(contractMint),
//         gasLimit: BigInt('10000000'),

//         gasPrice: BigInt(GAS_PRICE),
//         chainID: network.chainId,
//         sender: new Address(address),
//         version: 1
//       });
//     } else if (method == 'mid') {
//       payload =
//         'ESDTTransfer@' +
//         Buffer.from(defaultToken, 'utf8').toString('hex') +
//         '@' +
//         bigToHex(bigValue) +
//         '@' +
//         Buffer.from('buySft', 'utf8').toString('hex');
//       transaction = new Transaction({
//         value: BigInt(0),
//         data: new TextEncoder().encode(payload),
//         receiver: new Address(contractMint),
//         gasLimit: BigInt('14000000'),

//         gasPrice: BigInt(GAS_PRICE),
//         chainID: network.chainId,
//         sender: new Address(address),
//         version: 1
//       });
//     } else {
//       //gift method
//       const addressTobech32 = new Address(contractMint);
//       payload =
//         'ESDTNFTTransfer@' +
//         Buffer.from(collection, 'utf8').toString('hex') +
//         '@' +
//         bigToHex(BigInt(nonce)) +
//         '@' +
//         bigToHex(BigInt(1)) +
//         '@' +
//         addressTobech32.toHex() +
//         '@' +
//         Buffer.from('buyNft', 'utf8').toString('hex');

//       transaction = new Transaction({
//         value: BigInt(0),
//         data: new TextEncoder().encode(payload),
//         receiver: new Address(address),
//         gasLimit: BigInt('60000000'),

//         gasPrice: BigInt(GAS_PRICE),
//         chainID: network.chainId,
//         sender: new Address(address),
//         version: 1
//       });
//     }

//     const sessionId = await signAndSendTransactions({
//       transactions: [transaction],
//       transactionsDisplayInfo: {
//         processingMessage: 'Processing Mint transaction',
//         errorMessage: 'An error has occured Mint',
//         successMessage: 'Mint transaction successful'
//       }
//     });
//     if (sessionId != null) {
//       setTransactionSessionId(sessionId);
//     }
//   };

//   return (
//     <>
//       {!hasPendingTransactions && (
//         <>
//           <Button
//             buttonWidth='100%'
//             borderRadius={40}
//             background={['#BD37EC', '#1F67FF']}
//             text='Open Gift'
//             onClick={sendMintTransaction}
//             disabled={disabled}
//           />
//         </>
//       )}
//     </>
//   );
// };
