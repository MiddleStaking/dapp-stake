import * as React from 'react';
import { useState } from 'react';
import {
  faCircleInfo,
  faDollar,
  faEarth,
  faChartSimple
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { FormatAmount } from '@multiversx/sdk-dapp/UI/FormatAmount';
import { Col, Row } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { Link } from 'react-router-dom';
import { routeNames } from 'routes';
import image from './../../../assets/img/background2.png';
import notFound from './../../../assets/img/notfoundc.svg';
import { useGetWinner } from './Actions/helpers';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import eCompass from './../../../assets/img/ecompass.svg';
import jexchange from './../../../assets/img/jexchange.svg';
import twitter from './../../../assets/img/twitter.svg';
import styles from './../earn.module.scss';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { local_network } from 'config';

export const PoolInfo = ({
  stakedToken,
  rewardedToken,
  balance,
  canBeStaked
}: any) => {
  //const { network } = useGetNetworkConfig();
  const { address } = useGetAccountInfo();
  const [showStake, setShowStake] = useState(false);
  const [showUnstake, setShowUnstake] = useState(false);
  const { hasPendingTransactions } = useGetPendingTransactions();
  const lastUser = useGetWinner();

  // Pas bon j'ai besoin de connaitre le block courant pour connaitre la prgression
  // let rewardsLoading = BigInt(0);
  // if (stakingPosition.last_action_block > BigInt(0)) {
  //   rewardsLoading = BigInt(
  //     (BigInt(stakingPosition.last_action_block) /
  //       BigInt(tokenPosition.blocks_to_max)) *
  //       BigInt(100)
  //   );
  // }

  return (
    <div className='card'>
      {' '}
      <div
        className='text-black PoolCard'
        data-testid='poolInfo'
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          opacity: 1
        }}
      >
        <div className='poolTop'>
          {canBeStaked && (
            <>
              {' '}
              <Row>
                <Col>
                  <Link
                    to={routeNames.stake + `/${rewardedToken}`}
                    className='butLine bouton-visiter'
                    data-testid='loginBtn'
                  >
                    Stake {rewardedToken}
                  </Link>
                </Col>
              </Row>
            </>
          )}
        </div>

        <div className='poolPosition'>
          {!address ? (
            <Link
              to={routeNames.unlock + `/stake/${stakedToken}`}
              className='butLine goldButton'
              data-testid='loginBtn'
            >
              Login
            </Link>
          ) : (
            <div className='text-black' data-testid='myPosition'></div>
          )}
        </div>
      </div>
    </div>
  );
};
