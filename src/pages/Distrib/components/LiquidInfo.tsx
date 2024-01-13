import * as React from 'react';
import { useState } from 'react';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { defaultToken } from 'config';
import { useGetESDTInformations } from './Actions/helpers';
import { useGetPoolPosition } from './Actions/helpers';
import { useGetPoolLpIdentifier } from './Actions/helpers';
import LiquidModal from './LiquidModal';
import RemoveLpModal from './RemoveLpModal';
import {
  useGetTotalAmount,
  useGetTotalUsers,
  useGetUserList
} from './../../Distrib/components/Actions/helpers';
import { useGetGift } from 'pages/Distrib/components/Actions/helpersApi';
import { Address } from '@multiversx/sdk-core/out';
import { ActionAdd, ActionDeposit, ActionExec } from './Actions';
import axios from 'axios';
import bigToHex from 'helpers/bigToHex';
import BigNumber from 'bignumber.js';
import toHex from 'helpers/toHex';

export const LiquidInfo = ({ userEsdtBalance, second_token }: any) => {
  // const config = {
  //   tab: 1,
  //   cell: '1',
  //   collection: 'SFT-221ca7',
  //   nonce: 1,
  //   amount: 918
  // };
  // const config = {
  //   tab: 2,
  //   cell: '2',
  //   collection: 'SFT-221ca7',
  //   nonce: 2,
  //   amount: 468
  // };
  const config = {
    tab: 3,
    cell: '3',
    collection: 'SFT-221ca7',
    nonce: 3,
    amount: 114
  };

  const tab = config.tab; //tableau de campagne
  const cell = config.cell; //cellule du json pour la qté
  const collection = config.collection; //identifier de la collection à distribuer
  const nonce = config.nonce; //numéro du nonce à déposer
  const sft_amount = config.amount;
  // const sft_amount = 918;
  // const sft_amount = 468;
  // const sft_amount = 114;

  const user_list = useGetUserList(tab);
  const totalusers = useGetTotalUsers(tab);
  const totalamount = useGetTotalAmount(tab);
  const gift = useGetGift();
  console.log('total_users', BigNumber(totalusers.toString()).toFixed());
  console.log('total_amount', BigNumber(totalamount.toString()).toFixed());
  // console.log(user_list);
  console.log(gift);

  const datas = [];
  datas[0] = 'add@' + toHex(tab);
  // let user_list = [
  //   {
  //     address: {
  //       bech32:
  //         'erd12l6sk3ceklpf5jx6atut5mydqh3dqfpt73h2gxqh7zzmqxwx2jwqf5yj8e',
  //       pubkey:
  //         '57f50b4719b7c29a48daeaf8ba6c8d05e2d0242bf46ea41817f085b019c6549c'
  //     },
  //     amount: '1'
  //   },
  //   {
  //     address: {
  //       bech32:
  //         'erd10y0lmy2s5hyt8en3cz62ekghexmdwj4vtf7ddnqtq39m269d2z3q4t0ccj',
  //       pubkey:
  //         '791ffd9150a5c8b3e671c0b4acd917c9b6d74aac5a7cd6cc0b044bb568ad50a2'
  //     },
  //     amount: '1'
  //   }
  // ];
  let add = 0;
  let batch = 0;
  let i = 0;
  const max = 250 + i;
  while (i < gift.length && i < max) {
    const addressTobech32 = new Address(gift[i]?.address);

    if (add < 50) {
    } else {
      batch++;
      add = 0;
      datas[batch] = 'add@' + toHex(tab);
    }
    add++;
    datas[batch] += '@';
    datas[batch] += addressTobech32.hex();
    datas[batch] += '@';
    //data += '01';
    datas[batch] += bigToHex(gift[i]?.[cell] ? gift[i]?.[cell] : 0);
    // console.log(add, batch);
    if (!user_list.some((item: any) => item?.address == gift[i]?.address)) {
      // if (add < 50) {
      //   datas[0] += '@';
      //   datas[0] += addressTobech32.hex();
      //   datas[0] += '@';
      //   //data += '01';
      //   datas[0] += bigToHex(gift[i]?.mid_rewards);
      // } else {
      //   datas[1] += '@';
      //   datas[1] += addressTobech32.hex();
      //   datas[1] += '@';
      //   //data += '01';
      //   datas[1] += bigToHex(gift[i]?.mid_rewards);
      // }
      console.log('add');
    } else {
      console.log('ok');
      const config = {
        headers: {
          'Access-Control-Allow-Origin': '*', // Remplacez '*' par le domaine autorisé si possible
          'Access-Control-Allow-Methods': 'PUT', // Remplacez par les méthodes HTTP autorisées
          'Content-Type': 'application/json' // Le type de contenu que vous envoyez
        }
      };

      const formdata = {
        tx_hash: 'hashe'
      };
      axios
        .put('https://test.mvx.fr/gift/' + gift[i]?.id, formdata, config)
        .then((res) => {
          console.log('ok');
        })
        .catch((error) => {
          console.log('nok');

          console.error(error); // Affichez l'erreur dans la console pour le débogage
        });
    }
    i++;
  }
  console.log(datas);

  return (
    <>
      <div className={'center text-white'}>
        <ActionDeposit
          tab={tab}
          collection={collection}
          nonce={nonce}
          qty={sft_amount}
        />
        <ActionAdd datas={datas} tab={tab} />
        <ActionExec datas={datas} tab={tab} />
      </div>
      {/* 
      <div className={opacity}>
        <div className='text-black PoolCard' data-testid='poolInfo'>
          <div className='poolTop'></div>
        </div>
      </div> */}
    </>
  );
};