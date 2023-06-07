import React, { FC, useState } from 'react';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { useLocation } from 'react-router-dom';
import { ReactComponent as IconFlash } from '../../assets/img/Flash.svg';
import { ReactComponent as IconGlobe } from '../../assets/img/Globe-2.svg';
import notFound from '../../assets/img/notfoundc.svg';
import { ReactComponent as IconTwitter } from '../../assets/img/twitter.svg';
import ButtonGroupe from './Component/Button/ButtonGroupe';
import CardPresentation from './Component/CardPresentation';
import CheckedBoxGroupe from './Component/CheckBox/CheckedBoxGroupe';
import CradPool from './Component/CradPool';
import { useWindowDimensions } from './Component/Header.tsx/DimensionScreen.tsx';
import InputGroupe from './Component/Input/InputGroupe';
import LogosGroupe from './Component/Logos/LogosGroupe';
import OptionGroupe from './Component/Option/OptionGroupe';
import SearchBarGroupe from './Component/SearchBar/SearchBarGroupe';
import ToggleSwitchGroupe from './Component/ToggleSwitch/ToggleSwitchGroupe';
import './gallery.scss';

const Design: FC = () => {
  const [showStake, setShowStake] = useState(false);
  const [showUnstake, setShowUnstake] = useState(false);

  console.log(showStake);
  console.log(showUnstake);

  const { width } = useWindowDimensions();
  const heightComponentTypeSection = width > 450 ? '162px' : '114px';
  const socialNetworks: any = [
    {
      icon: <IconGlobe />,
      url: 'https://www.middlestaking.fr'
    },
    {
      icon: <IconTwitter />,
      url: 'https://twitter.com/MiddleStaking'
    },
    {
      icon: <IconFlash />,
      url: 'https://explorer.multiversx.com/tokens/MEX-455c57'
    }
  ];

  const path = useLocation().pathname;
  const stakedToken = path.split('/')[2];
  const { address } = useGetAccountInfo();

  const rewardedToken = path.split('/')[2];

  return (
    <div>
      {/* <CardPresentation height='150px' width='1200' label='header'>
        <HeaderDekstop />
      </CardPresentation> */}

      <div className='grid-container'>
        <InputGroupe />
        <ButtonGroupe />
        <OptionGroupe />
        <SearchBarGroupe />
        <ToggleSwitchGroupe />
        <CheckedBoxGroupe />
        <LogosGroupe />
        <CardPresentation label='cardPool' width='100%'>
          <CradPool
            height={heightComponentTypeSection}
            WindowDimensions={width}
            image1={notFound}
            image2={notFound}
            StakeTile='Mid'
            EarnTitle='Mid'
            Apr='13'
            decimals={18}
            Rewards='18633490000000000000000'
            Rewards_value={698.8}
            Speed=' 365'
            Staked='143526010000000000000000'
            Staked_value={5382.73}
            Users='91'
            socialNetwork={socialNetworks}
            textColor='#ffffff'
            fontFamily='Plus Jakarta Sans'
            address={address}
            stakedToken={stakedToken}
            stakingPosition={{
              stake_amount: '18633490000000000000000'
            }}
            rest={'1,42'}
            staked_esdt_info={{
              decimals: 18
            }}
            my_staked_value={698.8}
            setShowStake={setShowStake}
            setShowUnstake={setShowUnstake}
            stakingPositionRewards={'18633490000000000000000'}
            rdecimals={18}
            rewarded_esdt_info={{
              price: '1000'
            }}
            my_rewards_value={698.8}
            rewardedToken={rewardedToken}
          />
        </CardPresentation>
      </div>
      {/* <CardPresentation height='150px' width='1200' label='Footer'>
        <FooterDekstop />
      </CardPresentation> */}
    </div>
  );
};

export default Design;
