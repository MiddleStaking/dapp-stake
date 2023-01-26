import React from 'react';
import styles from './../earn.module.scss';
import { Button, Col, Form, Row } from 'react-bootstrap';

import { TopInfo } from './TopInfo';
import { PoolInfo } from './PoolInfo';
import { defaultToken } from 'config';
import { useGetRewardedTokens } from './Actions/helpers';
import { useGetStakedTokens } from './Actions/helpers';
import { useGetUserESDT } from './Actions/helpers/useGetUserESDT';
import { FormatAmount } from '@multiversx/sdk-dapp/UI/FormatAmount';

export const EarnLayout = ({ children }: React.PropsWithChildren) => {
  const stakedTokens = useGetStakedTokens();
  const userEsdtBalance = useGetUserESDT();
  const [stoken, setStoken] = React.useState(defaultToken);
  const rewardedTokens = useGetRewardedTokens(stoken);

  function handleSubmit() {
    console.log('submited');
  }
  const balance = userEsdtBalance
    .filter((token) => {
      return token.identifier === stoken;
    })
    .map((token) => token.balance);

  const decimals = userEsdtBalance
    .filter((token) => {
      return token.identifier === defaultToken;
    })
    .map((token) => token.decimals);

  function setFSToken(e: React.ChangeEvent<any>) {
    const index = stakedTokens
      .filter(({ identifier }) => identifier === identifier)
      .findIndex((tokens) => tokens === e.target.value);
    setStoken(e.target.value);
    console.log(e.target.value);
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
                  Balance :{' '}
                  <FormatAmount
                    value={balance.toString()}
                    egldLabel={stoken}
                    data-testid='balance'
                  />
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

                    <Form.Group as={Col} md='6' controlId='asset'>
                      <Form.Label>Asset</Form.Label>
                    </Form.Group>
                  </Row>

                  <Row className='mb-3'>
                    <Form.Group as={Col}>
                      <Button
                        variant='primary'
                        type='button'
                        onClick={handleSubmit}
                      >
                        Submit
                      </Button>
                    </Form.Group>
                  </Row>
                </Form>

                {rewardedTokens[0] != '' ? (
                  rewardedTokens.map((rtoken) => (
                    <div key={rtoken}>
                      <PoolInfo
                        stakedToken={stoken}
                        rewardedToken={rtoken}
                        balance={balance}
                        decimals={decimals}
                      />
                    </div>
                  ))
                ) : (
                  <>No pool to load</>
                )}
              </div>
            </div>
          </div>
          <div className={styles.transactions}>{children}</div>
        </div>
      </div>
    </div>
  );
};
