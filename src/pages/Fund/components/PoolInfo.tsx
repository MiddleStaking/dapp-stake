import * as React from 'react';
import { useState } from 'react';
import {
  faCircleInfo,
  faDollar,
  faEarth,
  faChartSimple
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormatAmount } from '@multiversx/sdk-dapp/UI/FormatAmount';
import { Col, Row } from 'react-bootstrap';
import { useGetTokenPosition } from './Actions/helpers';
import FundModal from './FundModal';
import PayFeesModal from './PayFeesModal';
import { useGetESDTInformations } from './Actions/helpers';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import eCompass from './../../../assets/img/ecompass.svg';
import jexchange from './../../../assets/img/jexchange.svg';
import twitter from './../../../assets/img/twitter.svg';
import notFound from './../../../assets/img/notfoundc.svg';

export const PoolInfo = ({
  stakedToken,
  rewardedToken,
  balance,
  decimals
}: any) => {
  const [show, setShow] = useState(false);
  const [showFees, setShowFees] = useState(false);
  const tokenPosition = useGetTokenPosition(stakedToken, rewardedToken);
  const { network } = useGetNetworkConfig();

  const staked_esdt_info = useGetESDTInformations(stakedToken);
  const rewarded_esdt_info = useGetESDTInformations(rewardedToken);
  const sdecimals = staked_esdt_info?.decimals ? staked_esdt_info?.decimals : 0;
  const rdecimals = rewarded_esdt_info?.decimals
    ? rewarded_esdt_info?.decimals
    : 0;

  const image1 = staked_esdt_info?.assets?.svgUrl
    ? staked_esdt_info?.assets?.svgUrl
    : notFound;
  const image2 = rewarded_esdt_info?.assets?.svgUrl
    ? rewarded_esdt_info?.assets?.svgUrl
    : notFound;
  const staked_value = staked_esdt_info?.price
    ? Number(BigInt(tokenPosition.total_stake) / BigInt(10 ** sdecimals)) *
      staked_esdt_info?.price
    : 0;
  const rewarded_value = rewarded_esdt_info?.price
    ? Number(BigInt(tokenPosition.balance) / BigInt(10 ** sdecimals)) *
      rewarded_esdt_info?.price
    : 0;

  let apr = BigInt(100);
  if (tokenPosition.total_stake > BigInt(0)) {
    apr =
      (BigInt(tokenPosition.balance) * apr) / BigInt(tokenPosition.total_stake);
  }

  let fees = BigInt(10);
  if (tokenPosition.fee_percentage) {
    fees = BigInt(tokenPosition.fee_percentage) / BigInt(100);
  }

  const speed =
    (BigInt(tokenPosition.blocks_to_max) * BigInt(6)) /
    BigInt(24) /
    BigInt(60) /
    BigInt(60);
  const stakedPopover = (
    <Popover id='popover-basic'>
      <Popover.Header as='h3'>Staked in pool</Popover.Header>
      <Popover.Body>
        This is the total amount of tokens staked in pools by users.
      </Popover.Body>
    </Popover>
  );

  const leftPopover = (
    <Popover id='popover-basic'>
      <Popover.Header as='h3'>Tokens left in pool</Popover.Header>
      <Popover.Body>
        This is the amount of tokens left in pool to be claimed by users.
      </Popover.Body>
    </Popover>
  );

  const speedPopover = (
    <Popover id='popover-basic'>
      <Popover.Header as='h3'>Time before max rewards</Popover.Header>
      <Popover.Body>
        This is the time users have to stay in pool before they can get a full
        share of the pool.
      </Popover.Body>
    </Popover>
  );

  const aprPopover = (
    <Popover id='popover-basic'>
      <Popover.Header as='h3'>APR (calulated)</Popover.Header>
      <Popover.Body>
        This is an estimation of the APR based on the Total staked an token left
        in the reward pool. <br />
        It does not take in count the value of each token (yet)
      </Popover.Body>
    </Popover>
  );

  const allTimeRewardsPopover = (
    <Popover id='popover-basic'>
      <Popover.Header as='h3'>All time rewarded</Popover.Header>
      <Popover.Body>
        This is the number of token this pool have rewarded since its creation
      </Popover.Body>
    </Popover>
  );

  const depositFeesPopover = (
    <Popover id='popover-basic'>
      <Popover.Header as='h3'>Deposit fees</Popover.Header>
      <Popover.Body>
        The fees are sent to a wallet owned by Middle Staking.
      </Popover.Body>
    </Popover>
  );
  return (
    <>
      <FundModal
        rewardedToken={rewardedToken}
        stakedToken={stakedToken}
        balance={balance}
        decimals={decimals}
        onClose={() => setShow(false)}
        show={show}
        fees={fees}
      />
      <PayFeesModal
        rewardedToken={rewardedToken}
        stakedToken={stakedToken}
        onClose={() => setShowFees(false)}
        showFees={showFees}
      />
      <div className='text-white text-center' data-testid='poolInfo'>
        <Row>
          <Row className='mx-auto'>
            <Col className='col-6'>
              <h4>STAKE : {stakedToken}</h4>

              <img className='thirdPoolLogo' src={image1} />

              <div className='rewardedInfo'>
                <div className='col-6 float-left '>
                  <a
                    className='text-white'
                    href={
                      network.explorerAddress +
                      '/tokens/' +
                      staked_esdt_info?.identifier
                    }
                    target={'_blank'}
                    rel={'noreferrer'}
                  >
                    <img
                      className='smallInfoLogo'
                      src={
                        staked_esdt_info?.assets?.svgUrl
                          ? staked_esdt_info?.assets?.svgUrl
                          : notFound
                      }
                    />{' '}
                    <br />
                    Explorer
                  </a>
                </div>

                {staked_esdt_info?.price ? (
                  <div className='col-6 float-left'>
                    <FontAwesomeIcon icon={faDollar} /> <br />
                    {Number(staked_esdt_info?.price).toLocaleString()}
                  </div>
                ) : (
                  ''
                )}

                {staked_esdt_info?.assets?.website ? (
                  <div className='col-6 float-left'>
                    <a
                      className='text-white'
                      href={staked_esdt_info?.assets?.website}
                      target={'_blank'}
                      rel={'noreferrer'}
                    >
                      <FontAwesomeIcon icon={faEarth} className='text-muted' />{' '}
                      <br /> Website
                    </a>
                  </div>
                ) : (
                  ''
                )}

                {staked_esdt_info?.assets?.social?.twitter ? (
                  <div className='col-6 float-left'>
                    <img className='smallInfoLogo' src={twitter} />
                    <br />
                    <a
                      className='text-white'
                      href={staked_esdt_info?.assets?.social?.twitter}
                      target={'_blank'}
                      rel={'noreferrer'}
                    >
                      {' '}
                      Twitter
                    </a>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </Col>
            <Col className='col-6'>
              {' '}
              <h4>Earn : {rewardedToken}</h4>
              <img className='thirdPoolLogo' src={image2} />
              <div className='rewardedInfo'>
                <div className='col-6 float-left '>
                  <a
                    className='text-white'
                    href={
                      network.explorerAddress +
                      '/tokens/' +
                      rewarded_esdt_info?.identifier
                    }
                    target={'_blank'}
                    rel={'noreferrer'}
                  >
                    <img
                      className='smallInfoLogo'
                      src={
                        rewarded_esdt_info?.assets?.svgUrl
                          ? rewarded_esdt_info?.assets?.svgUrl
                          : notFound
                      }
                    />{' '}
                    <br />
                    Explorer
                  </a>
                </div>

                {rewarded_esdt_info?.price ? (
                  <div className='col-6 float-left'>
                    <FontAwesomeIcon icon={faDollar} /> <br />
                    {Number(rewarded_esdt_info?.price).toLocaleString()}
                  </div>
                ) : (
                  ''
                )}

                {rewarded_esdt_info?.assets?.website ? (
                  <div className='col-6 float-left'>
                    <a
                      className='text-white'
                      href={rewarded_esdt_info?.assets?.website}
                      target={'_blank'}
                      rel={'noreferrer'}
                    >
                      <FontAwesomeIcon icon={faEarth} className='text-muted' />{' '}
                      <br /> Website
                    </a>
                  </div>
                ) : (
                  ''
                )}

                {rewarded_esdt_info?.assets?.social?.twitter ? (
                  <div className='col-6 float-left'>
                    <img className='smallInfoLogo' src={twitter} />
                    <br />
                    <a
                      className='text-white'
                      href={rewarded_esdt_info?.assets?.social?.twitter}
                      target={'_blank'}
                      rel={'noreferrer'}
                    >
                      {' '}
                      Twitter
                    </a>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </Col>
          </Row>
        </Row>
      </div>
      {tokenPosition.blocks_to_max ? (
        <div className='text-white text-center' data-testid='poolInfo'>
          <div className='poolTop'>
            <Row className='topLogo'>
              <Col className='col-12'>
                {' '}
                <div className='blueButton leftInPoolInfo'>
                  <OverlayTrigger placement='right' overlay={leftPopover}>
                    <a>
                      <FontAwesomeIcon
                        icon={faCircleInfo}
                        className='text-muted'
                      />
                    </a>
                  </OverlayTrigger>{' '}
                  Rewards :{' '}
                  <FormatAmount
                    value={tokenPosition.balance.toString()}
                    decimals={Number(rdecimals)}
                    egldLabel={' '}
                    data-testid='balance'
                    digits={2}
                  />{' '}
                  {rewarded_esdt_info?.price && (
                    <>
                      {' '}
                      <br />
                      {rewarded_value.toLocaleString()}{' '}
                      <FontAwesomeIcon icon={faDollar} />
                    </>
                  )}
                  <br />
                  <OverlayTrigger
                    placement='right'
                    overlay={allTimeRewardsPopover}
                  >
                    <a>
                      <FontAwesomeIcon
                        icon={faCircleInfo}
                        className='text-muted'
                      />
                    </a>
                  </OverlayTrigger>{' '}
                  depositFeesPopover All time rewarded :{' '}
                  <FormatAmount
                    value={tokenPosition.total_rewards.toString()}
                    decimals={Number(rdecimals)}
                    egldLabel={' '}
                    data-testid='balance'
                    digits={2}
                  />
                </div>{' '}
              </Col>
              <Col className='col-6 sub2'>
                {' '}
                <OverlayTrigger placement='right' overlay={speedPopover}>
                  <a>
                    <FontAwesomeIcon
                      icon={faCircleInfo}
                      className='text-muted'
                    />
                  </a>
                </OverlayTrigger>{' '}
                speed : {speed.toString()} days
              </Col>
              <Col className='col-6 sub2'>
                {' '}
                <OverlayTrigger placement='right' overlay={aprPopover}>
                  <a>
                    <FontAwesomeIcon
                      icon={faCircleInfo}
                      className='text-muted'
                    />
                  </a>
                </OverlayTrigger>{' '}
                apr : {apr.toString()} %
              </Col>
              <Col>
                {' '}
                <div className='blueButton leftInPoolInfo'>
                  <OverlayTrigger placement='right' overlay={stakedPopover}>
                    <a>
                      <FontAwesomeIcon
                        icon={faCircleInfo}
                        className='text-muted'
                      />
                    </a>
                  </OverlayTrigger>{' '}
                  Total Staked :{' '}
                  <FormatAmount
                    value={tokenPosition.total_stake.toString()}
                    decimals={Number(sdecimals)}
                    egldLabel={' '}
                    data-testid='staked'
                    digits={2}
                  />{' '}
                  {staked_esdt_info?.price && (
                    <>
                      <br />
                      {staked_value.toLocaleString()}{' '}
                      <FontAwesomeIcon icon={faDollar} />
                    </>
                  )}
                </div>{' '}
              </Col>
            </Row>
          </div>
          <Row className='m-3'>
            <Col>
              <div>
                {' '}
                <h4>
                  {' '}
                  <OverlayTrigger
                    placement='right'
                    overlay={depositFeesPopover}
                  >
                    <a>
                      <FontAwesomeIcon
                        icon={faCircleInfo}
                        className='text-muted'
                      />
                    </a>
                  </OverlayTrigger>{' '}
                  Deposit Fees : {fees.toString()} %
                </h4>
              </div>{' '}
            </Col>
          </Row>{' '}
          <Row className='m-3'>
            <Col>
              <button onClick={() => setShow(true)}>ADD TOKEN TO POOL</button>{' '}
              {fees > 0 ? (
                <>
                  {' '}
                  <button onClick={() => setShowFees(true)}>
                    PAY TO REMOVE FEES BEFORE NEXT DEPOSIT
                  </button>
                </>
              ) : (
                <> </>
              )}
            </Col>
          </Row>
        </div>
      ) : (
        <>
          <div className='text-white text-center' data-testid='poolInfo'>
            <Row>
              <Col>
                <h3>PAIR POOL NOT FOUND</h3>
              </Col>
            </Row>
            <Row>
              <Col>
                <button onClick={() => setShow(true)}>
                  LOCK TOKEN TO NEW POOL
                </button>

                {fees > 0 ? (
                  <>
                    {' '}
                    <button onClick={() => setShowFees(true)}>
                      PAY TO REMOVE FEES BEFORE FIRST DEPOSIT
                    </button>
                  </>
                ) : (
                  <>
                    {' '}
                    <button disabled={true}>FEES PAID</button>
                  </>
                )}
              </Col>
            </Row>{' '}
          </div>
        </>
      )}
    </>
  );
};
