import * as React from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { Col, Container, Row } from 'react-bootstrap';
import { defaultToken } from 'config';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import { FormatAmount } from '@multiversx/sdk-dapp/UI/FormatAmount';
import styles from './rewards.module.scss';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';

const Rewards = () => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccountInfo();

  //New mid rewards
  //https://app.middlestaking.fr/rewards.php?var1=accounts&var2=erd1ve2jekzgdeg2mvss8su56p0huuqkr7rjp9cl94xy65y9k3mxlp9s5uxtfe
  //  {"id":"745","address":"erd1ve2jekzgdeg2mvss8su56p0huuqkr7rjp9cl94xy65y9k3mxlp9s5uxtfe","rewards":[{"year":"2022","month":"0","rewards":"11832620848935730515","mid_rewards":"1268365818471368117112","txHash":""},{"year":"2021","month":"0","rewards":"4869022104481611492","mid_rewards":"565496702766578368046","txHash":"3e2b2be6675fe0e8f199effbe01f62a4d01a42412a5f8d87c74a789eb01b6544"}]}
  const [yRewards, setYRewards] = React.useState<any>({
    yrewards: [
      {
        year: '2021',
        month: '0',
        rewards: '0',
        mid_rewards: '0',
        txHash: ''
      }
    ],
    sum: 0
  });

  const [points, setPoints] = React.useState({
    points: ['202111']
  });

  const [rewards, setRewards] = React.useState<any>({
    tx: {
      '202111': [
        {
          txHash:
            'ff8c4102739b9468127273b8f35a6b1a376731141185a0c177151e3677d2d2bb',
          value: '0',
          function: 'withdraw',
          timestamp: '1637005044',
          earn: '0'
        }
      ]
    }
  });

  React.useEffect(() => {
    const fetchRewardsList = async () => {
      const { data } = await axios(
        'https://api.middlestaking.fr/rewards.php?var1=accounts&var2=' + address
      );
      setPoints({
        points: data.points
      });
      setRewards({
        tx: data.tx
      });
      setYRewards({
        yrewards: data.rewards,
        sum: data.sum
      });
    };
    fetchRewardsList();
  }, [setYRewards]);

  return (
    <div className={'mx-auto ' + styles.dashboard}>
      {/* <div className='row'> */}
      <div className={'col-12 col-md-10 mx-auto' + ' ' + styles.colorborder}>
        <div className={'card shadow-sm' + ' ' + styles.colorborder}>
          <div className={'card-body p-1 '}>
            <div
              className={
                'card rounded border-0 card-content bg-primary' +
                ' ' +
                styles.colorborder
              }
            >
              <div className='card-body card-content text-center p-4'>
                <Container className={'text-white ' + styles.cardback}>
                  <Row className={'sm-12 '}>
                    <Col>
                      MID tokens are distributed annually to users participating
                      in EGLD staking on our contract in proportion to the
                      amount of rewards they generate. <br />
                      Read our{' '}
                      <a
                        href='https://www.middlestaking.fr/en/lite-paper'
                        target={'_blank'}
                        rel={'noreferrer'}
                        className={'text-white'}
                      >
                        <u>lite paper</u>
                      </a>{' '}
                      for more details.
                    </Col>
                  </Row>{' '}
                  <Row className={styles.cardback}>
                    <Col>
                      <div className={'sm-12 '}>
                        Rewards from staking (All time) :{' '}
                        <FormatAmount
                          value={yRewards.sum}
                          egldLabel={'egld'}
                          data-testid='balance'
                          digits={2}
                        />
                      </div>
                    </Col>{' '}
                  </Row>
                  {yRewards.yrewards ? (
                    yRewards.yrewards.map((item: string, index: string) => (
                      <Row key={index}>
                        <Col>
                          <div className={'sm-12'}>
                            Rewards from staking (
                            {yRewards.yrewards[index].year}) :{' '}
                            <FormatAmount
                              value={yRewards.yrewards[index].rewards}
                              egldLabel={'egld'}
                              data-testid='balance'
                              digits={2}
                            />
                            {network.egldLabel}
                          </div>
                        </Col>{' '}
                        <Col>
                          <div className={''}>
                            {yRewards.yrewards[index].txHash ? (
                              <a
                                className='text-white'
                                href={
                                  'https://explorer.multiversx.com/transactions/' +
                                  yRewards.yrewards[index].txHash
                                }
                                target={'_blank'}
                                rel='noreferrer'
                              >
                                <>
                                  Mid received (
                                  {parseInt(yRewards.yrewards[index].year) + 1})
                                  :{' '}
                                  <FormatAmount
                                    value={yRewards.yrewards[index].mid_rewards}
                                    egldLabel={defaultToken}
                                    data-testid='balance'
                                    digits={2}
                                  />{' '}
                                  <FontAwesomeIcon icon={faSearch} />
                                </>
                              </a>
                            ) : (
                              <>
                                Mid to receive (
                                {parseInt(yRewards.yrewards[index].year) + 1}) :{' '}
                                <FormatAmount
                                  value={yRewards.yrewards[index].mid_rewards}
                                  egldLabel={defaultToken}
                                  data-testid='balance'
                                  digits={2}
                                />
                              </>
                            )}
                          </div>
                        </Col>
                      </Row>
                    ))
                  ) : (
                    <></>
                  )}
                  {points.points ? (
                    points.points.map((Ditem, Dindex) => (
                      <Row key={Dindex} className={styles.cardback}>
                        <Col className='sm-12'>
                          <Row>
                            <Col className='lead'>{Ditem}</Col>
                          </Row>
                          <Row className='lead'>
                            <Col>Action</Col>
                            {/* <Col>Value</Col> */}
                            <Col>Earn</Col>
                          </Row>{' '}
                          <hr
                            style={{
                              height: '1px',
                              color: 'white',
                              backgroundColor: 'white',
                              marginTop: 0
                            }}
                          />
                          {rewards.tx[Ditem] &&
                            rewards.tx[Ditem].map(
                              (item: string, index: number) => (
                                <Row
                                  className='text-center'
                                  key={Ditem + 'L' + index}
                                >
                                  <Col className=''>
                                    <a
                                      className='text-white'
                                      target='_BLANK'
                                      rel='noreferrer'
                                      href={
                                        'https://explorer.multiversx.com/transactions/' +
                                        rewards.tx[Ditem][index].txHash
                                      }
                                    >
                                      {rewards.tx[Ditem][
                                        index
                                      ].function.includes('unDelegate') ? (
                                        <>unDelegate</>
                                      ) : (
                                        rewards.tx[Ditem][index].function
                                      )}{' '}
                                      <FontAwesomeIcon icon={faSearch} />
                                    </a>
                                  </Col>
                                  {/* <Col>
                                    <FormatAmount
                                      value={rewards.tx[Ditem][index].value}
                                      egldLabel={'Egld'}
                                      data-testid='balance'
                                      digits={2}
                                    />
                                  </Col> */}
                                  <Col>
                                    {' '}
                                    <FormatAmount
                                      value={rewards.tx[Ditem][index].earn}
                                      egldLabel={'Egld'}
                                      data-testid='balance'
                                      digits={2}
                                    />
                                  </Col>
                                </Row>
                              )
                            )}
                        </Col>
                      </Row>
                    ))
                  ) : (
                    <></>
                  )}
                  {yRewards.sum == '0' && (
                    <Row className={''}>
                      <Col> We found no rewards for {address}</Col>
                    </Row>
                  )}
                </Container>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
