// import { useEffect, useState } from 'react';
// import { useGetPendingTransactions, useGetSuccessfulTransactions } from 'lib';
// import axios from 'axios';
// import { network, sftCollection } from 'config';

// export const useGetMinted = () => {
//   const [hash, setHash] = useState<any>('');
//   const [last, setLast] = useState<any>(0);
//   const [minted, setMinted] = useState<any>('');
//   const [nft, setNft] = useState<any>({});
//   const pendingTransactions = useGetPendingTransactions();
//   const hasPendingTransactions = pendingTransactions.length > 0;
//   const successfulTransactions: any[] = useGetSuccessfulTransactions();
//   const hasSuccessfulTransactions = successfulTransactions.length > 0;
//   const getHash = async () => {
//     if (hasPendingTransactions) {
//       if (nft.identifier) {
//         setNft({});
//       }
//       if (minted != '') {
//         setMinted('');
//       }
//       return;
//     }
//     const txs = successfulTransactions.length - 1;
//     const last_nonce =
//       successfulTransactions?.[txs]?.[1]?.transactions?.[0]?.nonce;
//     if (last_nonce <= last) {
//       return;
//     }
//     const newhash = successfulTransactions?.[txs]?.[1]?.transactions?.[0]?.hash;
//     if (!newhash) {
//       return;
//     }
//     setLast(last_nonce);
//     setHash(newhash);
//   };

//   const getMinted = async () => {
//     if (!hash) {
//       return;
//     }
//     const url = '/transactions/' + hash;
//     try {
//       const { data } = await axios.get<any>(url, {
//         baseURL: network.apiAddress,
//         params: {}
//       });
//       // console.log('buySft', data);
//       if (data.action.name == 'buySft') {
//         // console.log('minted', data.operations[0].identifier);

//         const filteredOperations = data.operations.filter(
//           (operation: any) => operation?.collection === sftCollection
//         );
//         setMinted(filteredOperations[0].identifier);
//       }
//     } catch (err) {
//       console.error('Unable to fetch Tokens');
//     }
//   };

//   const getNftdata = async () => {
//     if (!minted) {
//       return;
//     }
//     const url = '/nfts/' + minted;
//     try {
//       const { data } = await axios.get<any>(url, {
//         baseURL: network.apiAddress,
//         params: {}
//       });

//       if (data.identifier == minted) {
//         setNft(data);
//       }
//     } catch (err) {
//       console.error('Unable to fetch nft');
//     }
//   };
//   useEffect(() => {
//     getHash();
//   }, [successfulTransactions]);

//   useEffect(() => {
//     getMinted();
//   }, [hash]);

//   useEffect(() => {
//     getNftdata();
//   }, [minted]);

//   return nft;
// };

// // [
// //   [
// //       "1704047688655",
// //       {
// //           "transactions": [
// //               {
// //                   "nonce": 458,
// //                   "value": "10000000000000000",
// //                   "receiver": "erd1qqqqqqqqqqqqqpgq7zl9anenveu2vfz7z8m3kd4kcjlzq2wpch9sjgjyqh",
// //                   "sender": "erd10p0ke87tg4g2wnpah6ngmqmmlv604avfqwrlw7f3a7xpl8p3ugws7t3828",
// //                   "senderUsername": "",
// //                   "receiverUsername": "",
// //                   "gasPrice": 1000000000,
// //                   "gasLimit": 10000000,
// //                   "data": "YnV5U2Z0",
// //                   "chainID": "D",
// //                   "version": 1,
// //                   "signature": "1d039468745789071a213b3bf0279821facb67034b052e7fa76e41d31ed2421eed3b201087de4159ff73df972d6796e6b480793db00335bc6f0c5736868e1f08",
// //                   "hash": "ded576c26661e86f97432349c40924dd2d7f2fcb4c6c50d5447deb5913b413a5",
// //                   "status": "success"
// //               }
// //           ],
// //           "status": "success",
// //           "customTransactionInformation": {
// //               "signWithoutSending": false,
// //               "redirectAfterSign": false
// //           }
// //       }
// //   ]
// // ]

// // {
// //   "txHash": "ded576c26661e86f97432349c40924dd2d7f2fcb4c6c50d5447deb5913b413a5",
// //   "gasLimit": 10000000,
// //   "gasPrice": 1000000000,
// //   "gasUsed": 8927484,
// //   "miniBlockHash": "eeed2ddac46d94ddfa1e1211ea0faf138fb07e42a950cd29c44ea4dad1dec2e6",
// //   "nonce": 458,
// //   "receiver": "erd1qqqqqqqqqqqqqpgq7zl9anenveu2vfz7z8m3kd4kcjlzq2wpch9sjgjyqh",
// //   "receiverShard": 1,
// //   "round": 1674616,
// //   "sender": "erd10p0ke87tg4g2wnpah6ngmqmmlv604avfqwrlw7f3a7xpl8p3ugws7t3828",
// //   "senderShard": 1,
// //   "signature": "1d039468745789071a213b3bf0279821facb67034b052e7fa76e41d31ed2421eed3b201087de4159ff73df972d6796e6b480793db00335bc6f0c5736868e1f08",
// //   "status": "success",
// //   "value": "10000000000000000",
// //   "fee": "147684840000000",
// //   "timestamp": 1704047696,
// //   "data": "YnV5U2Z0",
// //   "function": "buySft",
// //   "action": {
// //     "category": "scCall",
// //     "name": "buySft"
// //   },
// //   "results": [
// //     {
// //       "hash": "02bf479238238eb84441c09015c31b35f72e8db6c8d64d7ce703ad8b094b60ec",
// //       "timestamp": 1704047696,
// //       "nonce": 0,
// //       "gasLimit": 0,
// //       "gasPrice": 1000000000,
// //       "value": "0",
// //       "sender": "erd1qqqqqqqqqqqqqpgq7zl9anenveu2vfz7z8m3kd4kcjlzq2wpch9sjgjyqh",
// //       "receiver": "erd10p0ke87tg4g2wnpah6ngmqmmlv604avfqwrlw7f3a7xpl8p3ugws7t3828",
// //       "data": "RVNEVE5GVFRyYW5zZmVyQDU0NGY0YjQ1NGU1NDQ5NDM0YjQ1MmQzMzM4NjIzMDM3MzVAMTFAMDFANzg1ZjZjOWZjYjQ1NTBhNzRjM2RiZWE2OGQ4MzdiZmIzNGZhZjU4OTAzODdmNzc5MzFlZjhjMWY5YzMxZTIxZA==",
// //       "prevTxHash": "ded576c26661e86f97432349c40924dd2d7f2fcb4c6c50d5447deb5913b413a5",
// //       "originalTxHash": "ded576c26661e86f97432349c40924dd2d7f2fcb4c6c50d5447deb5913b413a5",
// //       "callType": "0",
// //       "miniBlockHash": "73cfd97d776cdacb3e87cdf13771337dac68f0584739b8d0e72a5aa24acb60d4",
// //       "function": "ESDTNFTTransfer"
// //     },
// //     {
// //       "hash": "5ef67782a9a87e43a671cf13a7bdae4309b47a9a2484e99fc35ba356de16ce0f",
// //       "timestamp": 1704047696,
// //       "nonce": 459,
// //       "gasLimit": 0,
// //       "gasPrice": 1000000000,
// //       "value": "10725160000000",
// //       "sender": "erd1qqqqqqqqqqqqqpgq7zl9anenveu2vfz7z8m3kd4kcjlzq2wpch9sjgjyqh",
// //       "receiver": "erd10p0ke87tg4g2wnpah6ngmqmmlv604avfqwrlw7f3a7xpl8p3ugws7t3828",
// //       "data": "QDZmNmI=",
// //       "prevTxHash": "ded576c26661e86f97432349c40924dd2d7f2fcb4c6c50d5447deb5913b413a5",
// //       "originalTxHash": "ded576c26661e86f97432349c40924dd2d7f2fcb4c6c50d5447deb5913b413a5",
// //       "callType": "0",
// //       "miniBlockHash": "73cfd97d776cdacb3e87cdf13771337dac68f0584739b8d0e72a5aa24acb60d4",
// //       "function": "transfer"
// //     }
// //   ],
// //   "price": 69.51,
// //   "logs": {
// //     "id": "ded576c26661e86f97432349c40924dd2d7f2fcb4c6c50d5447deb5913b413a5",
// //     "address": "erd1qqqqqqqqqqqqqpgq7zl9anenveu2vfz7z8m3kd4kcjlzq2wpch9sjgjyqh",
// //     "events": [
// //       {
// //         "identifier": "ESDTNFTAddQuantity",
// //         "address": "erd1qqqqqqqqqqqqqpgq7zl9anenveu2vfz7z8m3kd4kcjlzq2wpch9sjgjyqh",
// //         "topics": [
// //           "VE9LRU5USUNLRS0zOGIwNzU=",
// //           "EQ==",
// //           "AQ=="
// //         ],
// //         "order": 0
// //       },
// //       {
// //         "identifier": "ESDTNFTTransfer",
// //         "address": "erd1qqqqqqqqqqqqqpgq7zl9anenveu2vfz7z8m3kd4kcjlzq2wpch9sjgjyqh",
// //         "additionalData": [
// //           "RGlyZWN0Q2FsbA==",
// //           "RVNEVE5GVFRyYW5zZmVy",
// //           "VE9LRU5USUNLRS0zOGIwNzU=",
// //           "EQ==",
// //           "AQ==",
// //           "eF9sn8tFUKdMPb6mjYN7+zT69YkDh/d5Me+MH5wx4h0="
// //         ],
// //         "data": "RGlyZWN0Q2FsbA==",
// //         "topics": [
// //           "VE9LRU5USUNLRS0zOGIwNzU=",
// //           "EQ==",
// //           "AQ==",
// //           "eF9sn8tFUKdMPb6mjYN7+zT69YkDh/d5Me+MH5wx4h0="
// //         ],
// //         "order": 1
// //       },
// //       {
// //         "identifier": "completedTxEvent",
// //         "address": "erd1qqqqqqqqqqqqqpgq7zl9anenveu2vfz7z8m3kd4kcjlzq2wpch9sjgjyqh",
// //         "topics": [
// //           "3tV2wmZh6G+XQyNJxAkk3S1/L8tMbFDVRH3rWRO0E6U="
// //         ],
// //         "order": 2
// //       }
// //     ]
// //   },
// //   "operations": [
// //     {
// //       "id": "ded576c26661e86f97432349c40924dd2d7f2fcb4c6c50d5447deb5913b413a5",
// //       "action": "addQuantity",
// //       "type": "nft",
// //       "esdtType": "SemiFungibleESDT",
// //       "collection": "TOKENTICKE-38b075",
// //       "identifier": "TOKENTICKE-38b075-11",
// //       "ticker": "TOKENTICKE-38b075",
// //       "name": "Ama",
// //       "sender": "erd1qqqqqqqqqqqqqpgq7zl9anenveu2vfz7z8m3kd4kcjlzq2wpch9sjgjyqh",
// //       "receiver": "erd1qqqqqqqqqqqqqpgq7zl9anenveu2vfz7z8m3kd4kcjlzq2wpch9sjgjyqh",
// //       "value": "1"
// //     },
// //     {
// //       "id": "ded576c26661e86f97432349c40924dd2d7f2fcb4c6c50d5447deb5913b413a5",
// //       "action": "transfer",
// //       "type": "nft",
// //       "esdtType": "SemiFungibleESDT",
// //       "collection": "TOKENTICKE-38b075",
// //       "identifier": "TOKENTICKE-38b075-11",
// //       "ticker": "TOKENTICKE-38b075",
// //       "name": "Ama",
// //       "sender": "erd1qqqqqqqqqqqqqpgq7zl9anenveu2vfz7z8m3kd4kcjlzq2wpch9sjgjyqh",
// //       "receiver": "erd10p0ke87tg4g2wnpah6ngmqmmlv604avfqwrlw7f3a7xpl8p3ugws7t3828",
// //       "value": "1"
// //     }
// //   ]
// // }
