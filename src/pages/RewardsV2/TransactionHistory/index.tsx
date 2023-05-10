import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormatAmount } from '@multiversx/sdk-dapp/UI';
import * as React from 'react';
import { Col, Row } from 'react-bootstrap';
import styles from './TransactionHistory.module.scss';
import { defaultToken, network } from 'config';
import Truncate from './components/truncate';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';

const TransactionHistory = (data: any) => {
  const { address } = useGetAccountInfo();
  const [searchValue, setSearchValue] = React.useState(''); // State pour stocker la valeur de recherche

  const handleSearchChange = (e: any) => {
    setSearchValue(e.target.value);
  };

  const filteredData = () => {
    if (searchValue.length < 3) {
      return data.points.points;
    }

    return data.points.points.filter((Ditem: any) => {
      const txs = data.rewards.tx[Ditem];

      return txs.some((tx: any) => {
        const { function: txFunction, txHash, earn } = tx;
        const searchString = searchValue.toLowerCase();

        return (
          txFunction.toLowerCase().includes(searchString) ||
          txHash.toLowerCase().includes(searchString) ||
          earn.toString().toLowerCase().includes(searchString)
        );
      });
    });
  };

  return (
    <div className={styles.panel}>
      <Row>
        <Col>
          MID tokens are distributed annually to users participating in EGLD
          staking on our contract in proportion to the amount of rewards they
          generate. <br />
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
      <Row style={{ textAlign: 'center' }}>
        <Col>
          <div>
            Rewards from staking (All time) :{' '}
            <FormatAmount
              value={data.yRewards.sum}
              egldLabel={'egld'}
              data-testid='balance'
              digits={2}
            />
          </div>
        </Col>{' '}
      </Row>
      {data.yRewards.yrewards ? (
        data.yRewards.yrewards.map((item: string, index: string) => (
          <Row key={index} style={{ textAlign: 'center' }}>
            <Col>
              <div>
                Rewards from staking ({data.yRewards.yrewards[index].year}) :{' '}
                <FormatAmount
                  value={data.yRewards.yrewards[index].rewards}
                  egldLabel={'egld'}
                  data-testid='balance'
                  digits={2}
                />
                {network.egldLabel}
              </div>
            </Col>{' '}
            <Col>
              <div>
                {data.yRewards.yrewards[index].txHash ? (
                  <a
                    className='text-white'
                    href={
                      'https://explorer.multiversx.com/transactions/' +
                      data.yRewards.yrewards[index].txHash
                    }
                    target={'_blank'}
                    rel='noreferrer'
                  >
                    <>
                      Mid received (
                      {parseInt(data.yRewards.yrewards[index].year) + 1}) :{' '}
                      <FormatAmount
                        value={data.yRewards.yrewards[index].mid_rewards}
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
                    {parseInt(data.yRewards.yrewards[index].year) + 1}) :{' '}
                    <FormatAmount
                      value={data.yRewards.yrewards[index].mid_rewards}
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
      <Row className='my-3'>
        <Col>
          <div className='input-group'>
            <input
              type='text'
              className='form-control'
              value={searchValue}
              onChange={handleSearchChange}
              placeholder='Rechercher une transaction...'
            />
            <div className='input-group-append'>
              <span className='input-group-text'>
                <FontAwesomeIcon icon={faSearch} />
              </span>
            </div>
          </div>
        </Col>
      </Row>
      {data.points.points ? (
        filteredData().map((Ditem: any, Dindex: number) => (
          <Row key={Dindex}>
            <Col>
              <Row>
                <Col className='lead'>
                  <strong>{Ditem}</strong>
                </Col>
              </Row>
              {data.rewards.tx[Ditem] &&
                data.rewards.tx[Ditem].map((item: string, index: number) => (
                  <Row key={Ditem + 'L' + index}>
                    <Col
                      style={{ textAlign: 'center' }}
                      className='col-12 col-md-3 col-sm-3'
                    >
                      {data.rewards.tx[Ditem][index].function.includes(
                        'unDelegate'
                      ) ? (
                        <>unDelegate</>
                      ) : (
                        data.rewards.tx[Ditem][index].function
                      )}
                    </Col>
                    <Col
                      style={{ textAlign: 'center' }}
                      className='col-12 col-md-7 col-sm-7'
                    >
                      <Row
                        style={{
                          display: 'flex',
                          alignItems: 'center' // Pour aligner les éléments verticalement
                        }}
                      >
                        <Truncate
                          href={
                            'https://explorer.multiversx.com/transactions/' +
                            data.rewards.tx[Ditem][index].txHash
                          }
                          address={data.rewards.tx[Ditem][index].txHash}
                        />
                      </Row>
                    </Col>
                    <Col
                      style={{ textAlign: 'center' }}
                      className='col-12 col-md-2 col-sm-2'
                    >
                      <FormatAmount
                        value={data.rewards.tx[Ditem][index].earn}
                        egldLabel={'Egld'}
                        data-testid='balance'
                        digits={2}
                      />
                    </Col>
                    <hr
                      style={{
                        width: '100%',
                        color: 'grey',
                        backgroundColor: 'white',
                        marginTop: 0
                      }}
                    />
                  </Row>
                ))}
            </Col>
          </Row>
        ))
      ) : (
        <></>
      )}
      {data.yRewards.sum == '0' && (
        <Row className={''}>
          <Col> We found no rewards for {address}</Col>
        </Row>
      )}
    </div>
  );
};

export default TransactionHistory;
