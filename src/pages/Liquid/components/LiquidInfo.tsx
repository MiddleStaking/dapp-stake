import * as React from 'react';
import { useState } from 'react';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { FormatAmount } from '@multiversx/sdk-dapp/UI/FormatAmount';
import { Col, Row, Container } from 'react-bootstrap';
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
import { ActionAdd } from './Actions';
import axios from 'axios';
import bigToHex from 'helpers/bigToHex';
import BigNumber from 'bignumber.js';
import { ActionExec } from './Actions/ActionExec';

export const LiquidInfo = ({ userEsdtBalance, second_token }: any) => {
  const [showLiquid, setShowLiquid] = useState(false);
  const [showRemoveLP, setShowRemoveLP] = useState(false);
  //const { network } = useGetNetworkConfig();
  const { hasPendingTransactions } = useGetPendingTransactions();
  const lp_token = useGetPoolLpIdentifier(defaultToken, second_token);
  const user_list = useGetUserList();
  const totalusers = useGetTotalUsers();
  const totalamount = useGetTotalAmount();
  const gift = useGetGift();
  console.log('total_users', BigNumber(totalusers.toString()).toFixed());
  console.log('total_amount', BigNumber(totalamount.toString()).toFixed());
  // console.log(user_list);
  console.log(gift);

  const datas = [];
  datas[0] = 'add';
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
      datas[batch] = 'add';
    }
    add++;
    datas[batch] += '@';
    datas[batch] += addressTobech32.hex();
    datas[batch] += '@';
    //data += '01';
    datas[batch] += bigToHex(gift[i]?.mid_rewards ? gift[i]?.mid_rewards : 1);
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

  const lp_balance = userEsdtBalance.find(
    (item: any) => item.identifier === lp_token.token_identifier
  );

  const firstPoolPosition = useGetPoolPosition(
    defaultToken,
    second_token,
    hasPendingTransactions,
    true
  );
  const first_esdt_info = useGetESDTInformations(defaultToken);
  const second_esdt_info = useGetESDTInformations(second_token);

  const first_price = first_esdt_info.price
    ? BigInt((first_esdt_info.price * 1000000).toFixed())
    : BigInt(1000000);
  const first_value = BigInt(
    (BigInt(firstPoolPosition.first_token_amount) * BigInt(first_price)) /
      BigInt(1000000)
  );

  const second_price = second_esdt_info.price
    ? BigInt((second_esdt_info.price * 1000000).toFixed())
    : BigInt(1000000);
  const second_value = BigInt(
    (BigInt(firstPoolPosition.second_token_amount) * BigInt(second_price)) /
      BigInt(1000000)
  );

  const ecart = (first_value - second_value) / BigInt(2);
  const ecart2 = (second_value - first_value) / BigInt(2);
  return (
    <>
      <div className={'center text-white'}>
        <LiquidModal
          userEsdtBalance={userEsdtBalance}
          firstPoolPosition={firstPoolPosition}
          first_esdt_info={first_esdt_info}
          second_esdt_info={second_esdt_info}
          show={showLiquid}
          onClose={() => {
            setShowLiquid(false);
          }}
        />
        <RemoveLpModal
          userEsdtBalance={userEsdtBalance}
          firstPoolPosition={firstPoolPosition}
          first_esdt_info={first_esdt_info}
          second_esdt_info={second_esdt_info}
          lp_token={lp_token.token_identifier}
          show={showRemoveLP}
          onClose={() => {
            setShowRemoveLP(false);
          }}
        />

        <Container>
          <Row>
            <Col>${defaultToken.split('-')[0]}</Col>
            <Col>${second_token.split('-')[0]}</Col>
          </Row>
          <Row>
            <Col>
              {' '}
              <FormatAmount
                decimals={first_esdt_info.decimals}
                value={firstPoolPosition.first_token_amount.toString()}
                egldLabel={' '}
                data-testid='balance'
              />{' '}
            </Col>

            <Col>
              {' '}
              <FormatAmount
                decimals={first_esdt_info.decimals}
                value={firstPoolPosition.second_token_amount.toString()}
                egldLabel={' '}
                data-testid='balance'
              />{' '}
            </Col>
          </Row>
          <Row>
            <Col>
              <FormatAmount
                decimals={first_esdt_info.decimals}
                value={first_value.toString()}
                egldLabel={'$'}
                data-testid='balance'
              />
            </Col>
            <Col>
              <FormatAmount
                decimals={second_esdt_info.decimals}
                value={second_value.toString()}
                egldLabel={'$'}
                data-testid='balance'
              />
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col>
              {ecart > 0 && (
                <>
                  SELL{' '}
                  <FormatAmount
                    decimals={second_esdt_info.decimals}
                    value={ecart.toString()}
                    egldLabel={'$'}
                    data-testid='balance'
                  />
                </>
              )}
              {ecart2 > 0 && (
                <>
                  BUY{' '}
                  <FormatAmount
                    decimals={second_esdt_info.decimals}
                    value={ecart2.toString()}
                    egldLabel={'$'}
                    data-testid='balance'
                  />{' '}
                  of MID with {second_token.split('-')[0]}
                </>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              {' '}
              <div
                className='button-icon-border  cursor-pointer'
                onClick={() => {
                  setShowLiquid(true);
                }}
              >
                <div className='button-icon'>
                  <svg
                    className='plus'
                    width='20'
                    height='20'
                    viewBox='0 0 32 32'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M17.3334 6.66683C17.3334 5.93045 16.7364 5.3335 16 5.3335C15.2637 5.3335 14.6667 5.93045 14.6667 6.66683V14.6668H6.66671C5.93033 14.6668 5.33337 15.2638 5.33337 16.0002C5.33337 16.7365 5.93033 17.3335 6.66671 17.3335H14.6667V25.3335C14.6667 26.0699 15.2637 26.6668 16 26.6668C16.7364 26.6668 17.3334 26.0699 17.3334 25.3335V17.3335H25.3334C26.0698 17.3335 26.6667 16.7365 26.6667 16.0002C26.6667 15.2638 26.0698 14.6668 25.3334 14.6668H17.3334V6.66683Z'
                      fill='white'
                    />
                  </svg>
                </div>
              </div>
            </Col>
            <Col>
              {lp_balance?.balance > 0 && (
                <div
                  className='button-icon-border  cursor-pointer'
                  onClick={() => {
                    setShowRemoveLP(true);
                  }}
                >
                  <div className='button-icon'>
                    <svg
                      className='plus'
                      width='20'
                      height='20'
                      viewBox='0 0 32 32'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M6 12L18 12'
                        stroke='#ffffff'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />{' '}
                    </svg>
                  </div>
                </div>
              )}
              {/* {lp_token.token_identifier}{' '}
              <FormatAmount
                decimals={0}
                value={lp_balance?.balance}
                egldLabel={' '}
                data-testid='balance'
                digits={0}
              />{' '}
              {} */}
            </Col>{' '}
            <Col></Col>
          </Row>
        </Container>
        <ActionAdd datas={datas} />
        <ActionExec datas={datas} />
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
