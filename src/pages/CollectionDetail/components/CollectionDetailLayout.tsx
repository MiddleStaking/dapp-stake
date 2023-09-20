import React, { useState, useEffect } from 'react';
import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import { Col, Form, Row } from 'react-bootstrap';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { defaultToken } from 'config';
import notFound from './../../../assets/img/notfoundc.svg';
import { useGetIsPaused, useGetUserRewards } from './Actions/helpers';
import { useGetCollections, useGetCollectionRewards } from './Actions/helpers';
import { useGetESDTInformations } from './Actions/helpers';
import { useGetUserESDT } from './Actions/helpers/useGetUserESDT';
import FundModal from '../../Collections/components/FundModal';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { Button, ToggleSwitch } from '../../../components/Design';
import { HeaderMenuContext } from 'context/Header/HeaderMenuContext';
import CardOfCollection from './CardOfCollection';
import { useWindowDimensions } from 'components/DimensionScreen';
import { Link } from 'react-router-dom';
import { routeNames } from 'routes';
import { ActionStakeNft } from './Actions/ActionStakeNFT';
import { ActionClaimRewards } from './Actions/ActionClaimRewards';
import { useGetUserStakedNft } from './Actions/helpers/useGetUserStakedNft';
import { ActionUnstakeNFT } from './Actions';
import MyNftSection from './CardOfCollection/component/MyNftSection';
import { useGetUserNFT } from 'pages/CollectionDetail/components/Actions/helpers';
import MyStakeSection from './CardOfCollection/component/MyStakeSection';
import { PoolAddCollection } from 'pages/Collections/components/Modal/AddCollection/PoolAddCollection';

export const CollectionsLayout = ({ children }: React.PropsWithChildren) => {
  const [showFund, setShowFund] = useState(false);
  const { address } = useGetAccountInfo();
  const userEsdtBalance = useGetUserESDT();
  const isLoggedIn = useGetIsLoggedIn();
  const isPaused = useGetIsPaused();

  const navigate = useNavigate();
  const { param } = useParams();
  const [url] = useState(param?.toString());

  const collectionRewards = useGetCollectionRewards(url ? url : '');
  const allRewardsForUser = useGetUserRewards(address, url ? url : '');
  const userNftBalance = useGetUserNFT(url ? url : '');
  const userStakedNft = useGetUserStakedNft(address);

  const { setHeaderMenu } = React.useContext(HeaderMenuContext);

  const { width } = useWindowDimensions();
  const heightComponentTypeSection = width > 450 ? '162px' : '114px';

  return (
    <div className='center'>
      {/* <FundModal
        userEsdtBalance={userEsdtBalance}
        show={showFund}
        onClose={() => {
          setHeaderMenu(true), setShowFund(false);
        }}
      /> */}
      <Link
        to={routeNames.collections}
        className='butLine bouton-visiter'
        data-testid='loginBtn'
      >
        Back to Collections
      </Link>
      <div className='col-12'>
        {address && (
          <PoolAddCollection
            userEsdtBalance={userEsdtBalance}
            address={address}
          />
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
        collectionRewards.map((item) => (
          <div
            className='col-12 text-white'
            key={item.pool_id}
            style={{ backgroundColor: 'red', margin: '3px' }}
          >
            pool_id: {item?.pool_id.toString()} <br />
            {item?.identifier} <br />
            vesting: {item?.vesting.toString()} <br />
            rewards: {item?.rewards.toString()}
            <br />
            unbounding: {item?.unbounding.toString()}
            <br />
            speed: {item?.blocks_to_max.toString()}
            <br /> nonce: {item?.nonce.toString()}
            {userNftBalance && (
              <MyNftSection
                pool_id={item?.pool_id}
                nft_balance={userNftBalance}
              />
            )}
            {userStakedNft && (
              <MyStakeSection
                pool={item?.pool_id}
                staked_balance={userStakedNft}
              />
            )}
            <br />
            {allRewardsForUser &&
              allRewardsForUser
                .filter(({ pool_id }) => pool_id == item?.pool_id)
                .map((rew, key) => (
                  <div
                    className='col-12 text-white'
                    key={key}
                    style={{ backgroundColor: 'red', margin: '3px' }}
                  >
                    <ActionClaimRewards
                      rewardsAmount={rew?.rewards}
                      pool_id={rew?.pool_id}
                    />
                  </div>
                ))}
          </div>
        ))}
    </div>
  );
};
