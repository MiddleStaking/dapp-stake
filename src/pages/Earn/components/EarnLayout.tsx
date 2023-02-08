import React, { useState } from 'react';
import styles from './../earn.module.scss';
import { Col, Form, Row } from 'react-bootstrap';

import { TopInfo } from './TopInfo';
import { PoolInfo } from './PoolInfo';
import { defaultToken } from 'config';
import { useGetRewardedTokens } from './Actions/helpers';
import { useGetStakedTokens } from './Actions/helpers';
import { useGetUserESDT } from './Actions/helpers/useGetUserESDT';
import { FormatAmount } from '@multiversx/sdk-dapp/UI/FormatAmount';
import './PoolCol.scss';
import { useParams, useNavigate } from 'react-router-dom';
import image from './../../../assets/img/background2.png';
import notFound from './../../../assets/img/notfound.svg';

export const EarnLayout = ({ children }: React.PropsWithChildren) => {
  const navigate = useNavigate();

  const stakedTokens: string[] = useGetStakedTokens();
  const { param } = useParams();
  const [url, setUrl] = useState(param ? param.toString() : defaultToken);
  const [test, setTest] = useState(
    stakedTokens.includes(url) ? url : defaultToken + ':' + url + ':'
  );

  const userEsdtBalance = useGetUserESDT();
  const [stoken, setStoken] = React.useState(url);
  const rewardedTokens = useGetRewardedTokens(stoken);

  //TODO Remplacer ce tableau par un storage/api
  const tokens_informations = [
    {
      type: 'FungibleESDT',
      identifier: '777DEV-0ddfcf',
      decimals: 18
    },
    {
      type: 'FungibleESDT',
      identifier: 'ASH-4ce444',
      decimals: 18,
      image: 'https://media.elrond.com/tokens/asset/ASH-a642d1/logo.svg'
    },
    {
      type: 'FungibleESDT',
      identifier: 'BKT-6561e8',
      decimals: 18
    },
    {
      type: 'FungibleESDT',
      identifier: 'BUILDO-890d14',
      decimals: 18
    },
    {
      type: 'FungibleESDT',
      identifier: 'BURN-94a071',
      decimals: 6
    },
    {
      type: 'FungibleESDT',
      identifier: 'DJOY-ae20c0',
      decimals: 18
    },
    {
      type: 'FungibleESDT',
      identifier: 'DSUPER-9af8df',
      decimals: 18
    },
    {
      type: 'FungibleESDT',
      identifier: 'EFOO-8e80a5',
      decimals: 18
    },
    {
      type: 'FungibleESDT',
      identifier: 'RENBTC-0b6973',
      decimals: 8
    },
    {
      type: 'FungibleESDT',
      identifier: 'STAKE-1c6362',
      decimals: 18,
      image:
        'https://raw.githubusercontent.com/ElrondNetwork/assets/master/tokens/MID-ecb7bf/logo.svg'
    },
    {
      type: 'FungibleESDT',
      identifier: 'USDC-79d9a4',
      decimals: 18,
      image: 'https://media.elrond.com/tokens/asset/USDC-c76f1f/logo.svg'
    },
    {
      type: 'FungibleESDT',
      identifier: 'USDC-d5181d',
      decimals: 6,
      image: 'https://media.elrond.com/tokens/asset/USDC-c76f1f/logo.svg'
    },
    {
      type: 'FungibleESDT',
      identifier: 'USDT-a55fa7',
      decimals: 6
    },
    {
      type: 'FungibleESDT',
      identifier: 'VITAL-058fd5',
      decimals: 8,
      image: 'https://media.elrond.com/tokens/asset/VITAL-ab7917/logo.svg'
    },
    {
      type: 'FungibleESDT',
      identifier: 'WBTC-3a02ea',
      decimals: 6
    },
    {
      type: 'FungibleESDT',
      identifier: 'WBTC-9bdb9b',
      decimals: 8
    },
    {
      type: 'FungibleESDT',
      identifier: 'WUSDC-3124eb',
      decimals: 6
    },
    {
      type: 'FungibleESDT',
      identifier: 'WUSDC-c01108',
      decimals: 6
    },
    {
      type: 'FungibleEsdt',
      identifier: 'EGLDUSDC-842a92',
      decimals: 18
    }
  ];

  const balance = userEsdtBalance
    .filter((token) => {
      return token.identifier === stoken;
    })
    .map((token) => token.balance);

  const decimals = userEsdtBalance
    .filter((token) => {
      return token.identifier === stoken;
    })
    .map((token) => token.decimals);

  function setFSToken(e: React.ChangeEvent<any>) {
    //setParam(e.target.value);
    navigate(`/earn/${e.target.value}`);

    // const index = stakedTokens
    //   .filter(({ identifier }) => identifier === identifier)
    //   .findIndex((tokens) => tokens === e.target.value);
    setStoken(e.target.value);
  }

  return (
    <div className='container-xxl py-4'>
      <div className='row'>
        <div className='col-12 col-md-10 mx-auto'>
          <div className='card shadow-sm border-0 '>
            <div className='card-body p-1 '>
              <div className='card border-0 bg-primary'>
                <div
                  className='card-body text-center p-4 text-white'
                  style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    opacity: 1
                  }}
                >
                  <TopInfo />
                  Balance :{' '}
                  <FormatAmount
                    value={balance.toString()}
                    egldLabel={stoken}
                    data-testid='balance'
                    digits={2}
                  />
                  <Form>
                    <Row className='mb-3'>
                      <Form.Group as={Col} md='6' controlId='network'>
                        <Form.Label>Staked Token</Form.Label>
                        <Form.Control
                          as='select'
                          onChange={setFSToken}
                          value={stoken}
                          disabled={false}
                        >
                          {stakedTokens &&
                            stakedTokens.map((item) => (
                              <option
                                disabled={false}
                                className='text-center not-allowed disabled'
                                key={item}
                                value={item}
                              >
                                {item}
                              </option>
                            ))}
                        </Form.Control>
                      </Form.Group>
                    </Row>
                  </Form>
                </div>
              </div>
            </div>
          </div>
          <div className='row pt-4'>
            {rewardedTokens[0] != '' ? (
              rewardedTokens.map((rtoken) => (
                <div
                  className='PoolCol col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4'
                  key={rtoken}
                >
                  {' '}
                  <PoolInfo
                    stakedToken={stoken}
                    rewardedToken={rtoken}
                    balance={balance}
                    sdecimals={tokens_informations
                      .filter((token) => {
                        return token.identifier === stoken;
                      })
                      .map((token) => (token.decimals ? token.decimals : 0))}
                    rdecimals={tokens_informations
                      .filter((token) => {
                        return token.identifier === rtoken;
                      })
                      .map((token) => (token.decimals ? token.decimals : 0))}
                    image1={tokens_informations
                      .filter((token) => {
                        return token.identifier === stoken;
                      })
                      .map((token) => (token.image ? token.image : notFound))}
                    image2={tokens_informations
                      .filter((token) => {
                        return token.identifier === rtoken;
                      })
                      .map((token) => (token.image ? token.image : notFound))}
                  />
                </div>
              ))
            ) : (
              <>No pool to load</>
            )}
          </div>

          {/* <div className={styles.transactions}>{children}</div> */}
        </div>
      </div>
    </div>
  );
};
