import * as React from 'react';
import { faExternalLinkAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormatAmount } from '@multiversx/sdk-dapp/UI/FormatAmount';
import axios from 'axios';
import { Col, Container, Row } from 'react-bootstrap';
import { network } from 'config';
import styles from './tokenomics.module.scss';
import Truncate from './component/truncate';

const Tokenomics = () => {
  //   [{"id":"1","wallet_address_32":"erd1c3nfhvj5jgulw62yndr6fgh0fcmut34fful733tl998zpt9s2k5qrxumhs","contract_address_32":"erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqyhllllsv4k7x2","staked":"120000000000000000000","serviceFee":"1500","rewards":"1056319668794646154"}]
  const [contracts, setContracts] = React.useState({
    contracts: [
      {
        wallet_address_32:
          'erd1c3nfhvj5jgulw62yndr6fgh0fcmut34fful733tl998zpt9s2k5qrxumhs',
        contract_address_32:
          'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqyhllllsv4k7x2',
        staked: '0',
        serviceFee: '0',
        rewards: '0'
      }
    ],
    supply: [
      {
        id: '1',
        type: 'liquidity',
        amount: '0',
        txHash: ''
      }
    ],
    supply_sum: '',
    burn: [
      {
        id: '1',
        type: 'liquidity',
        amount: '0',
        txHash: ''
      }
    ],
    burn_sum: '',
    circulating: '',
    liquidity: {
      reserves0: '0',
      reserves1: '0',
      firstTokenPriceUSD: '0',
      lockedValueUSD: '0',
      ratio: '1:1000'
    }
  });

  React.useEffect(() => {
    const fetchTokenList = async () => {
      const { data } = await axios(
        'https://internal-api.middlestaking.fr/staking'
      );

      setContracts({
        contracts: data.contracts ? data.contracts : [],
        supply: data.supply ? data.supply : [],
        supply_sum: data.supply_sum ? data.supply_sum : '0',
        burn: data.burn ? data.burn : [],
        burn_sum: data.burn_sum ? data.burn_sum : '0',
        circulating: data.circulating ? data.circulating : '0',
        liquidity: data.liquidity ? data.liquidity : ''
      });
    };
    fetchTokenList();
    // //refresh 60 sec
    // const interval = setInterval(() => {
    //   fetchTokenList();
    // }, 60000);
    // return () => clearInterval(interval);
  }, [setContracts]);

  return (
    <div>
      {/* <div className='row'> */}
      <div className={'col-12 col-md-10 col-sm-10 mx-auto'}>
        <div className={styles.colorborder}>
          <div className={'card-body p-1 mx-auto'}>
            <div
              className={
                'mx-auto card rounded border-0 bg-primary' +
                ' ' +
                styles.colorborder
              }
            >
              <div className={'card-body text-center p-4 '}>
                <Container
                  style={{ marginLeft: 0 }}
                  className={'text-white ' + styles.cardback}
                >
                  <Row
                    className={
                      'sm-12 msbulle' +
                      ' ' +
                      styles.cardscolor +
                      ' ' +
                      styles.cardback
                    }
                  >
                    <Col>
                      $MID tokens are backed with EGLD. Rewards from staking are
                      used to increase the collateral and/or buy back $MID and
                      burn them.
                    </Col>
                  </Row>{' '}
                  {contracts.contracts ? (
                    contracts.contracts.map((item, index) => (
                      <Row
                        key={index}
                        className={
                          'msbulle' +
                          '  ' +
                          styles.cardscolor +
                          ' ' +
                          styles.cardback
                        }
                      >
                        <Col className='sm-12'>
                          <Row>
                            <Col className='lead'>
                              Staking position {'#' + (index + 1)}
                            </Col>
                          </Row>
                          <hr
                            style={{
                              height: '1px',
                              color: 'white',
                              backgroundColor: 'white',
                              marginTop: 0
                            }}
                          />
                          <Row>
                            <Col className={`${styles.headingcenter}`}>
                              <Truncate address={item.contract_address_32} />
                            </Col>
                          </Row>
                          <Row>
                            <Col className={`${styles.headingcenter}`}>
                              <Truncate address={item.wallet_address_32} />
                            </Col>
                          </Row>
                          <hr
                            style={{
                              height: '1px',
                              color: 'white',
                              backgroundColor: 'white',
                              marginTop: 0
                            }}
                          />
                          <Row className='lead'>
                            <Col>Staked</Col>
                            <Col>Rewards</Col>
                            <Col>Service Fees</Col>
                          </Row>
                          <Row className='lead'>
                            <Col>
                              <FormatAmount
                                value={item.staked}
                                egldLabel={'Egld'}
                                data-testid='balance'
                                digits={2}
                              />
                            </Col>
                            <Col>
                              {' '}
                              <FormatAmount
                                value={item.rewards}
                                egldLabel={'Egld'}
                                data-testid='balance'
                                digits={2}
                              />
                            </Col>
                            <Col>{Number(item.serviceFee) / 100} %</Col>
                          </Row>
                        </Col>
                      </Row>
                    ))
                  ) : (
                    <></>
                  )}{' '}
                  {/* <Row className={'msbulle' + '  ' + styles.cardscolor}>
                    <Col className='sm-12'>
                      <Row>
                        <Col className='lead'>DEX Liquidity #1</Col>
                      </Row>
                      <hr
                        style={{
                          height: '1px',
                          color: 'white',
                          backgroundColor: 'white',
                          marginTop: 0
                        }}
                      />
                      <Row>
                        <Col className='lead'>
                          erd1qqqqqqqqqqqqqpgqjs9xspq7usjfd37f3kty9y0q280kqnhl2jpsxh87wn
                        </Col>
                      </Row>{' '}
                      <hr
                        style={{
                          height: '1px',
                          color: 'white',
                          backgroundColor: 'white',
                          marginTop: 0
                        }}
                      />
                      <Row>
                        <Col>

                        </Col>
                        <Col> + </Col>
                        <Col>
                          {' '}
                          <Col>

                          </Col>
                        </Col>
                      </Row>{' '}
                      <Row>
                        <Col>{contracts.liquidity.ratio} </Col>
                      </Row>
                      <Row>
                        <Col>
                          Locked value : {contracts.liquidity.lockedValueUSD}{' '}
                          $USD
                        </Col>
                      </Row>{' '}
                    </Col>
                  </Row> */}
                  <Row>
                    <Col className='sm-6'>
                      <Row
                        className={
                          'msbulle' +
                          '  ' +
                          styles.cardscolor +
                          ' ' +
                          styles.cardback
                        }
                      >
                        <Col className={'sm-6 '}>
                          <Row>
                            <Col className='lead text-center'>Emission</Col>
                          </Row>
                          <hr
                            style={{
                              height: '1px',
                              color: 'white',
                              backgroundColor: 'white',
                              marginTop: 0
                            }}
                          />
                          {contracts.supply ? (
                            contracts.supply.map((item, index) => (
                              <Row key={index}>
                                <Col className='lead text-center '>
                                  {item.txHash ? (
                                    <a
                                      className='text-white'
                                      target='_BLANK'
                                      rel='noreferrer'
                                      href={
                                        'https://explorer.elrond.com/transactions/' +
                                        item.txHash
                                      }
                                    >
                                      <FontAwesomeIcon icon={faSearch} />{' '}
                                      {item.type}
                                    </a>
                                  ) : (
                                    <>{item.type}</>
                                  )}
                                </Col>
                                <Col>
                                  {' '}
                                  <FormatAmount
                                    value={item.amount}
                                    egldLabel={'MID-ecb7bf'}
                                    data-testid='balance'
                                    digits={2}
                                  />
                                </Col>
                              </Row>
                            ))
                          ) : (
                            <></>
                          )}
                        </Col>
                      </Row>
                    </Col>
                    <Col className='sm-6'>
                      <Row
                        className={
                          'msbulle' +
                          '  ' +
                          styles.cardscolor +
                          ' ' +
                          styles.cardback
                        }
                      >
                        <Col className={'sm-6 '}>
                          <Row>
                            <Col className='lead text-center'>Destruction</Col>
                          </Row>
                          <hr
                            style={{
                              height: '1px',
                              color: 'white',
                              backgroundColor: 'white',
                              marginTop: 0
                            }}
                          />
                          {contracts.burn ? (
                            contracts.burn.map((item, index) => (
                              <Row key={index}>
                                <Col className='lead text-center '>
                                  {item.txHash ? (
                                    <a
                                      className='text-white'
                                      target='_BLANK'
                                      rel='noreferrer'
                                      href={
                                        'https://explorer.elrond.com/transactions/' +
                                        item.txHash
                                      }
                                    >
                                      <FontAwesomeIcon icon={faSearch} />{' '}
                                      {item.type}
                                    </a>
                                  ) : (
                                    <>{item.type}</>
                                  )}
                                </Col>
                                <Col>
                                  {' '}
                                  <FormatAmount
                                    value={item.amount}
                                    egldLabel={'MID-ecb7bf'}
                                    data-testid='balance'
                                    digits={2}
                                  />
                                </Col>
                              </Row>
                            ))
                          ) : (
                            <></>
                          )}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  {/* <Row>
                    <Col className={'msbulle' + '  ' + styles.cardscolor}>
                      <FormatAmount
                        value={contracts.supply_sum}
                        egldLabel={'MID-ecb7bf'}
                        data-testid='balance'
                        digits={2}
                      />
                    </Col>
                    <Col className={'msbulle' + '  ' + styles.cardscolor}>
                      {' '}
                      <FormatAmount
                        value={contracts.burn_sum}
                        egldLabel={'MID-ecb7bf'}
                        data-testid='balance'
                        digits={2}
                      />
                    </Col>
                  </Row>{' '} */}
                  <Row
                    className={
                      'sm-12 msbulle' +
                      '  ' +
                      styles.cardscolor +
                      ' ' +
                      styles.cardback
                    }
                  >
                    <Col className='lead text-center'>Circulating :</Col>
                    <Col>
                      {' '}
                      <FormatAmount
                        value={contracts.circulating}
                        egldLabel={'MID-ecb7bf'}
                        data-testid='balance'
                        digits={2}
                      />
                    </Col>
                  </Row>
                </Container>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tokenomics;
