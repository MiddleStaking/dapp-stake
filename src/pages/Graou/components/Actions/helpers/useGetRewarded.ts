import { useEffect, useState } from 'react';
import {
  useGetPendingTransactions,
  useGetSuccessfulTransactions
} from '@multiversx/sdk-dapp/hooks';
import axios from 'axios';
import { network, sftCollection, vouchersCollection } from 'config';

export const useGetRewarded = () => {
  const [hash, setHash] = useState<any>('');
  const [last, setLast] = useState<any>(0);
  const [minted, setMinted] = useState<any>('');
  const [nft, setNft] = useState<any>({});
  const { hasPendingTransactions } = useGetPendingTransactions();

  const { successfulTransactionsArray } = useGetSuccessfulTransactions();

  const getHash = async () => {
    if (hasPendingTransactions) {
      if (nft.identifier) {
        setNft({});
      }
      if (minted != '') {
        setMinted('');
      }
      return;
    }
    const txs = successfulTransactionsArray.length - 1;
    const last_nonce =
      successfulTransactionsArray?.[txs]?.[1]?.transactions?.[0]?.nonce;
    console.log('last_nonce', last_nonce, hash);

    if (last_nonce <= last) {
      return;
    }
    const newhash =
      successfulTransactionsArray?.[txs]?.[1]?.transactions?.[0]?.hash;

    if (!newhash) {
      return;
    }
    setLast(last_nonce);
    setHash(newhash);
  };

  const getMinted = async () => {
    if (!hash) {
      return;
    }
    const url = '/transactions/' + hash;
    try {
      const { data } = await axios.get<any>(url, {
        baseURL: network.apiAddress,
        params: {}
      });

      if (data.action.arguments.functionName == 'lock') {
        const filteredOperations = data.operations.filter(
          (operation: any) => operation?.collection == vouchersCollection
        );
        console.log(
          'filtered',
          data.operations,
          filteredOperations,
          vouchersCollection,
          filteredOperations[0]?.identifier
        );
        setMinted(
          filteredOperations[0]?.identifier
            ? filteredOperations[0]?.identifier
            : 'fail'
        );
      }
    } catch (err) {
      console.error('Unable to fetch Tokens', err);
    }
  };

  const getNftdata = async () => {
    if (!minted) {
      return;
    }
    if (minted == 'fail') {
      setNft({
        identifier: 'fail'
      });
      return;
    }

    const url = '/nfts/' + minted;
    try {
      const { data } = await axios.get<any>(url, {
        baseURL: network.apiAddress,
        params: {}
      });

      if (data.identifier == minted) {
        setNft(data);
      }
    } catch (err) {
      console.error('Unable to fetch nft');
    }
  };
  useEffect(() => {
    getHash();
  }, [successfulTransactionsArray]);

  useEffect(() => {
    getMinted();
  }, [hash]);

  useEffect(() => {
    getNftdata();
  }, [minted]);

  return nft;
};

// {
//     "txHash": "72d3d2d8c5ea260c08be15af50c5060fae113663e7c867056dd5becae8171cab",
//     "gasLimit": 14000000,
//     "gasPrice": 1000000000,
//     "gasUsed": 3756736,
//     "miniBlockHash": "c1fa9a357629d661c50ee1781b8dbd374253b0c0ba8344573945b0f0aae12c01",
//     "nonce": 537,
//     "receiver": "erd10p0ke87tg4g2wnpah6ngmqmmlv604avfqwrlw7f3a7xpl8p3ugws7t3828",
//     "receiverShard": 1,
//     "round": 1865610,
//     "sender": "erd10p0ke87tg4g2wnpah6ngmqmmlv604avfqwrlw7f3a7xpl8p3ugws7t3828",
//     "senderShard": 1,
//     "signature": "8102cb50113ad8eb8fe0a96574871b498b65f8b2c2fee8ee2214020ff1a6afe3e8d3b0c964fff36e6d6c1758bebd5c650ceee694a39c00f997674a0bd46c750e",
//     "status": "success",
//     "value": "0",
//     "fee": "280117360000000",
//     "timestamp": 1705193660,
//     "data": "RVNEVE5GVFRyYW5zZmVyQDU0NGY0YjQ1NGU1NDQ5NDM0YjQ1MmQzMzM4NjIzMDM3MzVAMTZAMDFAMDAwMDAwMDAwMDAwMDAwMDA1MDBiNWRiZWZkZjE3NzU1NTgxNDYxZGJiNDc4MmQyZGJjOTQyNjk4OTFjYzVjYkA2YzZmNjM2Yg==",
//     "function": "lock",
//     "action": {
//         "category": "esdtNft",
//         "name": "transfer",
//         "description": "Transfer",
//         "arguments": {
//             "transfers": [
//                 {
//                     "type": "SemiFungibleESDT",
//                     "name": "TokenName12345678901",
//                     "ticker": "TOKENTICKE-38b075",
//                     "collection": "TOKENTICKE-38b075",
//                     "identifier": "TOKENTICKE-38b075-16",
//                     "value": "1"
//                 }
//             ],
//             "receiver": "erd1qqqqqqqqqqqqqpgqkhd7lhchw42cz3sahdrc95kme9pxnzguch9srygudw",
//             "functionName": "lock"
//         }
//     },
//     "results": [
//         {
//             "hash": "3f37f4fcede4e6b2627554af04165e0e4bcf8cdea65d1561ba6d26e76c345c6f",
//             "timestamp": 1705193660,
//             "nonce": 0,
//             "gasLimit": 13546350,
//             "gasPrice": 1000000000,
//             "value": "0",
//             "sender": "erd10p0ke87tg4g2wnpah6ngmqmmlv604avfqwrlw7f3a7xpl8p3ugws7t3828",
//             "receiver": "erd1qqqqqqqqqqqqqpgqkhd7lhchw42cz3sahdrc95kme9pxnzguch9srygudw",
//             "data": "bG9jaw==",
//             "prevTxHash": "72d3d2d8c5ea260c08be15af50c5060fae113663e7c867056dd5becae8171cab",
//             "originalTxHash": "72d3d2d8c5ea260c08be15af50c5060fae113663e7c867056dd5becae8171cab",
//             "callType": "0",
//             "miniBlockHash": "8721afc0829ed28cdd3bb5ceb1ede4e96b005e57c1794d5578671ee3d3d67454",
//             "function": "lock"
//         },
//         {
//             "hash": "5f6224dcc565c291962b0407eafcd7f76b0c807c99da3e9828ece0dd2eaee0d4",
//             "timestamp": 1705193660,
//             "nonce": 538,
//             "gasLimit": 0,
//             "gasPrice": 1000000000,
//             "value": "102432640000000",
//             "sender": "erd10p0ke87tg4g2wnpah6ngmqmmlv604avfqwrlw7f3a7xpl8p3ugws7t3828",
//             "receiver": "erd10p0ke87tg4g2wnpah6ngmqmmlv604avfqwrlw7f3a7xpl8p3ugws7t3828",
//             "data": "QDZmNmI=",
//             "prevTxHash": "72d3d2d8c5ea260c08be15af50c5060fae113663e7c867056dd5becae8171cab",
//             "originalTxHash": "72d3d2d8c5ea260c08be15af50c5060fae113663e7c867056dd5becae8171cab",
//             "callType": "0",
//             "miniBlockHash": "8721afc0829ed28cdd3bb5ceb1ede4e96b005e57c1794d5578671ee3d3d67454",
//             "function": "transfer"
//         },
//         {
//             "hash": "70859f1bbb229f2f34d5dccea1759b5a080ef7293cd65c95890f4d316b0c9d09",
//             "timestamp": 1705193660,
//             "nonce": 0,
//             "gasLimit": 0,
//             "gasPrice": 1000000000,
//             "value": "0",
//             "sender": "erd1qqqqqqqqqqqqqpgqkhd7lhchw42cz3sahdrc95kme9pxnzguch9srygudw",
//             "receiver": "erd10p0ke87tg4g2wnpah6ngmqmmlv604avfqwrlw7f3a7xpl8p3ugws7t3828",
//             "data": "RVNEVE5GVFRyYW5zZmVyQDUzNDY1NDJkMzIzMjMxNjM2MTM3QDAxQDAxQDc4NWY2YzlmY2I0NTUwYTc0YzNkYmVhNjhkODM3YmZiMzRmYWY1ODkwMzg3Zjc3OTMxZWY4YzFmOWMzMWUyMWQ=",
//             "prevTxHash": "72d3d2d8c5ea260c08be15af50c5060fae113663e7c867056dd5becae8171cab",
//             "originalTxHash": "72d3d2d8c5ea260c08be15af50c5060fae113663e7c867056dd5becae8171cab",
//             "callType": "0",
//             "miniBlockHash": "8721afc0829ed28cdd3bb5ceb1ede4e96b005e57c1794d5578671ee3d3d67454",
//             "function": "ESDTNFTTransfer"
//         }
//     ],
//     "price": 54.16,
//     "logs": {
//         "id": "72d3d2d8c5ea260c08be15af50c5060fae113663e7c867056dd5becae8171cab",
//         "address": "erd10p0ke87tg4g2wnpah6ngmqmmlv604avfqwrlw7f3a7xpl8p3ugws7t3828",
//         "events": [
//             {
//                 "identifier": "ESDTNFTTransfer",
//                 "address": "erd10p0ke87tg4g2wnpah6ngmqmmlv604avfqwrlw7f3a7xpl8p3ugws7t3828",
//                 "additionalData": [
//                     "",
//                     "RVNEVE5GVFRyYW5zZmVy",
//                     "VE9LRU5USUNLRS0zOGIwNzU=",
//                     "Fg==",
//                     "AQ==",
//                     "AAAAAAAAAAAFALXb798XdVWBRh27R4LS28lCaYkcxcs=",
//                     "bG9jaw=="
//                 ],
//                 "topics": [
//                     "VE9LRU5USUNLRS0zOGIwNzU=",
//                     "Fg==",
//                     "AQ==",
//                     "AAAAAAAAAAAFALXb798XdVWBRh27R4LS28lCaYkcxcs="
//                 ],
//                 "order": 0
//             },
//             {
//                 "identifier": "ESDTNFTTransfer",
//                 "address": "erd1qqqqqqqqqqqqqpgqkhd7lhchw42cz3sahdrc95kme9pxnzguch9srygudw",
//                 "additionalData": [
//                     "RGlyZWN0Q2FsbA==",
//                     "RVNEVE5GVFRyYW5zZmVy",
//                     "U0ZULTIyMWNhNw==",
//                     "AQ==",
//                     "AQ==",
//                     "eF9sn8tFUKdMPb6mjYN7+zT69YkDh/d5Me+MH5wx4h0="
//                 ],
//                 "data": "RGlyZWN0Q2FsbA==",
//                 "topics": [
//                     "U0ZULTIyMWNhNw==",
//                     "AQ==",
//                     "AQ==",
//                     "eF9sn8tFUKdMPb6mjYN7+zT69YkDh/d5Me+MH5wx4h0="
//                 ],
//                 "order": 1
//             },
//             {
//                 "identifier": "completedTxEvent",
//                 "address": "erd10p0ke87tg4g2wnpah6ngmqmmlv604avfqwrlw7f3a7xpl8p3ugws7t3828",
//                 "topics": [
//                     "ctPS2MXqJgwIvhWvUMUGD64RNmPnyGcFbdW+yugXHKs="
//                 ],
//                 "order": 2
//             }
//         ]
//     },
//     "operations": [
//         {
//             "id": "72d3d2d8c5ea260c08be15af50c5060fae113663e7c867056dd5becae8171cab",
//             "action": "transfer",
//             "type": "nft",
//             "esdtType": "SemiFungibleESDT",
//             "collection": "TOKENTICKE-38b075",
//             "identifier": "TOKENTICKE-38b075-16",
//             "ticker": "TOKENTICKE-38b075",
//             "name": "Tam",
//             "sender": "erd10p0ke87tg4g2wnpah6ngmqmmlv604avfqwrlw7f3a7xpl8p3ugws7t3828",
//             "receiver": "erd1qqqqqqqqqqqqqpgqkhd7lhchw42cz3sahdrc95kme9pxnzguch9srygudw",
//             "value": "1"
//         },
//         {
//             "id": "72d3d2d8c5ea260c08be15af50c5060fae113663e7c867056dd5becae8171cab",
//             "action": "transfer",
//             "type": "nft",
//             "esdtType": "SemiFungibleESDT",
//             "collection": "SFT-221ca7",
//             "identifier": "SFT-221ca7-01",
//             "ticker": "SFT-221ca7",
//             "name": "ONE",
//             "sender": "erd1qqqqqqqqqqqqqpgqkhd7lhchw42cz3sahdrc95kme9pxnzguch9srygudw",
//             "receiver": "erd10p0ke87tg4g2wnpah6ngmqmmlv604avfqwrlw7f3a7xpl8p3ugws7t3828",
//             "value": "1"
//         }
//     ]
// }
