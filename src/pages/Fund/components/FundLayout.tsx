import React, { useEffect } from 'react';
import { FormatAmount } from '@multiversx/sdk-dapp/UI/FormatAmount';
import { Col, Form, Row } from 'react-bootstrap';
import { defaultToken } from 'config';
import styles from './../fund.module.scss';
import { useGetUserESDT } from './Actions/helpers/useGetUserESDT';
import { PoolInfo } from './PoolInfo';
import { TopInfo } from './TopInfo';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const FundLayout = ({ children }: React.PropsWithChildren) => {
  const userEsdtBalance = useGetUserESDT();
  const [stoken, setStoken] = React.useState(defaultToken);
  const [rtoken, setRtoken] = React.useState(defaultToken);
  const [decimals, setDecimals] = React.useState(18);
  const [balance, setBalance] = React.useState(BigInt(0));
  const [warning, setWarning] = React.useState(true);

  const tokenProps = userEsdtBalance.find((item) => item.identifier === rtoken);
  const handleChange = () => {
    setWarning(!warning);
  };

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

                {warning && (
                  <>
                    <div className='alert alert-danger mx-auto text-center'>
                      {' '}
                      <div className='text-center'>
                        <FontAwesomeIcon
                          icon={faTriangleExclamation}
                          size='2x'
                        />{' '}
                      </div>
                      <br />
                      This page is here to handle deposit of the{' '}
                      <u>Rewarded token</u> into a staking pool. <br />
                      <br /> Once deposited, the tokens{' '}
                      <u>
                        <b>cannot be withdrawn</b>
                      </u>
                      .<br />
                      <br /> Users will be then able to stake the{' '}
                      <u>Staked token</u> and gain the <u>Rewarded token</u>{' '}
                      over time.
                      <br /> <br />
                      <label>
                        <input
                          checked={!warning}
                          onChange={handleChange}
                          type='checkbox'
                        />{' '}
                        I&apos;m here to distribute esdt. Show me the interface{' '}
                      </label>
                    </div>
                  </>
                )}

                {!warning && (
                  <div className=''>
                    {' '}
                    <Form>
                      <Row className='mb-3'>
                        <Col>
                          <Form.Group as={Col} controlId='network'>
                            <Form.Label className='text-white'>
                              Users will stake :
                            </Form.Label>
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
                        </Col>

                        <Col>
                          {' '}
                          <Form.Group as={Col} controlId='rtoken'>
                            <Form.Label className='text-white'>
                              Users will be rewarded with :
                            </Form.Label>
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
                        </Col>
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
                )}
              </div>
            </div>
          </div>
          {/* <div className={styles.transactions}>{children}</div> */}
        </div>
      </div>
    </div>
  );
};
