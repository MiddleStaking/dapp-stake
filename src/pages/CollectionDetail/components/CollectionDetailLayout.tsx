import React, { useState, useEffect } from 'react';
import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import { Col, Form, Row } from 'react-bootstrap';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { defaultToken } from 'config';
import notFound from './../../../assets/img/notfoundc.svg';
import { useGetRewardsPoolsID } from './Actions/helpers';
import { useGetIsPaused } from './Actions/helpers';
import {
  useGetCollections,
  useGetSwapedTokens,
  useGetCollectionDetail
} from './Actions/helpers';
import { useGetESDTInformations } from './Actions/helpers';
import { useGetUserESDT } from './Actions/helpers/useGetUserESDT';
import FundModal from '../../Collections/components/FundModal';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { ToggleSwitch } from '../../../components/Design';
import { HeaderMenuContext } from 'context/Header/HeaderMenuContext';
import CardOfCollection from './CardOfCollection';
import { useWindowDimensions } from 'components/DimensionScreen';
import { Link } from 'react-router-dom';
import { routeNames } from 'routes';

export const CollectionsLayout = ({ children }: React.PropsWithChildren) => {
  const [showFund, setShowFund] = useState(false);
  const { address } = useGetAccountInfo();
  const userEsdtBalance = useGetUserESDT();
  const isLoggedIn = useGetIsLoggedIn();
  const isPaused = useGetIsPaused();

  const navigate = useNavigate();
  const { param } = useParams();
  const [url] = useState(param?.toString());

  const stakedCollections: string[] = useGetCollections();
  const test: string[] = useGetRewardsPoolsID(url ? url : '');
  console.log(test);

  const collectionRewards = useGetCollectionDetail(url ? url : '');
  console.log(collectionRewards);

  const { setHeaderMenu } = React.useContext(HeaderMenuContext);

  const { width } = useWindowDimensions();
  const heightComponentTypeSection = width > 450 ? '162px' : '114px';

  return (
    <div className='center'>
      <FundModal
        userEsdtBalance={userEsdtBalance}
        show={showFund}
        onClose={() => {
          setHeaderMenu(true), setShowFund(false);
        }}
      />
      <Link
        to={routeNames.collections}
        className='butLine bouton-visiter'
        data-testid='loginBtn'
      >
        Back to Collections
      </Link>
      <div className='col-12'>
        {address && (
          <div
            className='button-icon-border  cursor-pointer'
            onClick={() => {
              setShowFund(true), setHeaderMenu(false);
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
        )}
      </div>
      {/* <div className='col-12 text-white'>
        {url} : <br /> <h1> {collectionRewards[0]?.identifier}</h1>
        {collectionRewards[0]?.rewards.toString()}
        {collectionRewards[0]?.total_staked.toString()}
        {collectionRewards[0]?.total_rewarded.toString()}
        {collectionRewards[0]?.last_fund_block.toString()}
        {collectionRewards[0]?.paused.toString()}
        {collectionRewards[0]?.blocks_to_max.toString()}
        {collectionRewards[0]?.vesting.toString()}
        {collectionRewards[0]?.unbounding.toString()}
      </div> */}
      <br />
      {collectionRewards &&
        collectionRewards.map((item, key) => (
          <div
            className='col-12 text-white'
            key={key}
            style={{ backgroundColor: 'red', margin: '3px' }}
          >
            key:{key} <br />
            {item?.identifier} <br />
            vesting:{item?.vesting.toString()} <br />
            rewards:{item?.rewards.toString()}
            <br />
            unbounding:{item?.unbounding.toString()}
            <br />
            speed:{item?.blocks_to_max.toString()}
            {/* <br /> nonce:{item?.nonce.toString()} //NOTE : UseGetCollectionDetail*/}
          </div>
        ))}
    </div>
  );
};
