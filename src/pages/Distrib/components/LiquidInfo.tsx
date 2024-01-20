import * as React from 'react';
import { DistribGroup } from './DistribGroup';
import { vouchersCollection } from 'config';

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
  const config = [
    {
      tab: 1,
      cell: '1',
      collection: vouchersCollection,
      nonce: 1,
      amount: 918
    },
    {
      tab: 2,
      cell: '2',
      collection: vouchersCollection,
      nonce: 2,
      amount: 468
    },
    {
      tab: 3,
      cell: '3',
      collection: vouchersCollection,
      nonce: 3,
      amount: 114
    }
  ];

  // const tab = config[0].tab; //tableau de campagne
  // const cell = config[0].cell; //cellule du json pour la qté
  // const collection = config[0].collection; //identifier de la collection à distribuer
  // const nonce = config[0].nonce; //numéro du nonce à déposer
  // const sft_amount = config[0].amount;
  // const sft_amount = 918;
  // const sft_amount = 468;
  // const sft_amount = 114;

  // const user_list = useGetUserList(tab);
  // const totalusers = useGetTotalUsers(tab);
  // const totalamount = useGetTotalAmount(tab);
  // const gift = useGetGift();
  // console.log('total_users', BigNumber(totalusers.toString()).toFixed());
  // console.log('total_amount', BigNumber(totalamount.toString()).toFixed());
  // // console.log(user_list);
  // console.log(gift);

  // const datas = [];
  // datas[0] = 'add@' + toHex(tab);
  // let add = 0;
  // let batch = 0;
  // let i = 0;
  // const max = 250 + i;
  // while (i < gift.length && i < max) {
  //   const addressTobech32 = new Address(gift[i]?.address);
  //   if (add < 50) {
  //   } else {
  //     batch++;
  //     add = 0;
  //     datas[batch] = 'add@' + toHex(tab);
  //   }
  //   add++;
  //   datas[batch] += '@';
  //   datas[batch] += addressTobech32.hex();
  //   datas[batch] += '@';
  //   datas[batch] += bigToHex(gift[i]?.[cell] ? gift[i]?.[cell] : 0);
  //   if (!user_list.some((item: any) => item?.address == gift[i]?.address)) {
  //     console.log('add');
  //   } else {
  //     console.log('ok');

  //     // const config = {
  //     //   headers: {
  //     //     'Access-Control-Allow-Origin': '*', // Remplacez '*' par le domaine autorisé si possible
  //     //     'Access-Control-Allow-Methods': 'PUT', // Remplacez par les méthodes HTTP autorisées
  //     //     'Content-Type': 'application/json' // Le type de contenu que vous envoyez
  //     //   }
  //     // };
  //     // const formdata = {
  //     //   tx_hash: 'hashe'
  //     // };
  //     // axios
  //     //   .put('https://test.mvx.fr/gift/' + gift[i]?.id, formdata, config)
  //     //   .then((res) => {
  //     //     console.log('ok');
  //     //   })
  //     //   .catch((error) => {
  //     //     console.log('nok');

  //     //     console.error(error); // Affichez l'erreur dans la console pour le débogage
  //     //   });
  //   }
  //   i++;
  // }
  // console.log(datas);

  return (
    <>
      {config.map((item) => (
        <div style={{ color: 'white' }}>
          {item.tab} :
          <DistribGroup
            tab={item.tab}
            cell={item.cell}
            collection={item.collection}
            nonce={item.nonce}
            sft_amount={item.amount}
          />
        </div>
      ))}
      {/* <div className={'center text-white'}>
        <ActionDeposit
          tab={tab}
          collection={collection}
          nonce={nonce}
          qty={sft_amount}
        />
        <ActionAdd datas={datas} tab={tab} />
        <ActionExec datas={datas} tab={tab} />
      </div> */}
    </>
  );
};