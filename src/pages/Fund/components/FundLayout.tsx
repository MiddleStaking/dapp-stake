import React, { useEffect } from 'react';
import styles from './../fund.module.scss';

import { TopInfo } from './TopInfo';
import { PoolInfo } from './PoolInfo';
import { defaultToken } from 'config';
import { useGetUserESDT } from './Actions/helpers/useGetUserESDT';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { FormatAmount } from '@multiversx/sdk-dapp/UI/FormatAmount';

import axios from 'axios';

export const FundLayout = ({ children }: React.PropsWithChildren) => {
  const userEsdtBalance = useGetUserESDT();
  const [stoken, setStoken] = React.useState(defaultToken);
  const [rtoken, setRtoken] = React.useState(defaultToken);
  const [decimals, setDecimals] = React.useState(18);
  const [balance, setBalance] = React.useState(BigInt(0));

  const tokenProps = userEsdtBalance.find((item) => item.identifier === rtoken);

  useEffect(() => {
    if (tokenProps?.decimals) setDecimals(tokenProps.decimals);
    if (tokenProps?.balance) setBalance(tokenProps.balance);
  }, [tokenProps]);

  function setFSToken(e: React.ChangeEvent<any>) {
    const index = userEsdtBalance
      .filter(({ identifier }) => identifier === identifier)
      .findIndex((tokens) => tokens.identifier === e.target.value);
    setStoken(e.target.value);
  }

  function setFRtoken(e: React.ChangeEvent<any>) {
    const index = userEsdtBalance
      .filter(({ identifier }) => identifier === identifier)
      .findIndex((tokens) => tokens.identifier === e.target.value);
    setRtoken(e.target.value);

    if (tokenProps?.decimals) setDecimals(tokenProps.decimals);
    if (tokenProps?.balance) setBalance(tokenProps.balance);
  }

  return (
    <div className='container py-4'>
      <div className='row'>
        <div className='col-12 col-md-10 mx-auto'>
          <div className='card shadow-sm border-0'>
            <div className='card-body p-1'>
              <div className='card border-0 bg-primary'>
                <div className='card-body text-center p-4'>
                  <TopInfo />
                </div>
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
                        {userEsdtBalance &&
                          userEsdtBalance.map((item) => (
                            <option
                              disabled={false}
                              className='text-center not-allowed disabled'
                              key={item.identifier}
                              value={item.identifier}
                            >
                              {item.identifier}
                            </option>
                          ))}
                      </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} md='6' controlId='rtoken'>
                      <Form.Label>Rewarded Token</Form.Label>
                      <Form.Control
                        as='select'
                        onChange={setFRtoken}
                        value={rtoken}
                      >
                        {userEsdtBalance &&
                          userEsdtBalance.map((item) => (
                            <option
                              className='text-center'
                              key={item.identifier}
                              value={item.identifier}
                            >
                              <FormatAmount
                                decimals={item.decimals}
                                value={item.balance.toString()}
                                egldLabel={
                                  item.identifier +
                                  ' (' +
                                  item.decimals +
                                  ' dec)'
                                }
                                data-testid='staked'
                              />
                            </option>
                          ))}
                      </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} md='6' controlId='asset'>
                      <Form.Label>Asset</Form.Label>
                    </Form.Group>
                  </Row>

                  <Row className='mb-3'>
                    <Form.Group as={Col}></Form.Group>
                  </Row>
                </Form>

                <PoolInfo
                  stakedToken={stoken}
                  rewardedToken={rtoken}
                  balance={balance}
                  decimals={decimals}
                />
              </div>
            </div>
          </div>
          <div className={styles.transactions}>{children}</div>
        </div>
      </div>
    </div>
  );
};
