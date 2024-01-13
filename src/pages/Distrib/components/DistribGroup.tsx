import * as React from 'react';
import { ActionAdd, ActionDeposit, ActionExec } from './Actions';
import {
  useGetTotalAmount,
  useGetTotalUsers,
  useGetUserList
} from './../../Distrib/components/Actions/helpers';
import { useGetGift } from 'pages/Distrib/components/Actions/helpersApi';
import { Address } from '@multiversx/sdk-core/out';
import bigToHex from 'helpers/bigToHex';
import BigNumber from 'bignumber.js';
import toHex from 'helpers/toHex';

export const DistribGroup = ({
  tab,
  cell,
  collection,
  nonce,
  sft_amount
}: any) => {
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
    datas[batch] += bigToHex(gift[i]?.[cell] ? gift[i]?.[cell] : 0);
    if (!user_list.some((item: any) => item?.address == gift[i]?.address)) {
      console.log('add');
    } else {
      console.log('ok');

      // const config = {
      //   headers: {
      //     'Access-Control-Allow-Origin': '*', // Remplacez '*' par le domaine autorisé si possible
      //     'Access-Control-Allow-Methods': 'PUT', // Remplacez par les méthodes HTTP autorisées
      //     'Content-Type': 'application/json' // Le type de contenu que vous envoyez
      //   }
      // };
      // const formdata = {
      //   tx_hash: 'hashe'
      // };
      // axios
      //   .put('https://test.mvx.fr/gift/' + gift[i]?.id, formdata, config)
      //   .then((res) => {
      //     console.log('ok');
      //   })
      //   .catch((error) => {
      //     console.log('nok');

      //     console.error(error); // Affichez l'erreur dans la console pour le débogage
      //   });
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
    </>
  );
};
