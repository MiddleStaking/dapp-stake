//NOTE - partie inferieure
import React, { CSSProperties, FC, useState } from 'react';
import { FormatAmount } from '@multiversx/sdk-dapp/UI';
import { useNavigate } from 'react-router-dom';
import { defaultToken } from 'config';
import { routeNames } from 'routes';
import { Button } from 'components/Design';
import { HeaderMenuContext } from 'context/Header/HeaderMenuContext';
import UnstakeModal from '../../UnstakeModal';
import StakeModal from '../../StakeModal';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { ActionStakeNft } from '../../Actions/ActionStakeNFT';
import HexagoneGroupe from 'pages/Collections/components/Modal/AddCollection/hexagoneGroupe';
import HexagoneNFT from 'pages/Collections/components/hexagoneNFT';
import { ActionUnstakeNFT } from '../../Actions';
import MyStakedNft from './MyStakedNft';

interface MyStakeSectionProps {
  staked_balance: any[];
  pool: number;
}
const MyNftSection: FC<MyStakeSectionProps> = ({ pool, staked_balance }) => {
  const navigate = useNavigate();
  const [showStake, setShowStake] = useState(false);
  const [showUnstake, setShowUnstake] = useState(false);
  const { setHeaderMenu } = React.useContext(HeaderMenuContext);
  const { address } = useGetAccountInfo();

  const sectionStyle: CSSProperties = {
    background: 'var(--bgtransparency, rgba(99, 74, 203, 0.32))',
    borderRadius: '0px 0px 8px 8px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    flexShrink: 0,
    position: 'relative',
    overflow: 'hidden',
    width: '100%'
    // height: '202px'
  };

  const MyStackedStyle: CSSProperties = {
    color: '#FFFFFF',
    fontFamily: '',
    fontSize: '14px',
    fontWeight: '300',
    lineHeight: '18px',
    letterSpacing: '0em',
    textAlign: 'left'
  };

  const Content: CSSProperties = {
    background: '#634ACB52',
    borderRadius: '8px',
    width: '100%',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '12px',
    marginTop: '12px',
    color: '#FFFFFF',
    fontSize: '10px'
    // justifyContent: 'center'
  };

  const MyStackedContentStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '100%'
  };
  // console.log(staked_balance);

  // nft_identifier
  // nft_nonce

  return (
    // <>
    <div style={sectionStyle}>
      {staked_balance &&
        staked_balance
          .filter(({ pool_id }) => pool_id == pool)
          .map((item, key) => (
            <div
              className='col-12 text-white'
              key={key}
              style={{ backgroundColor: 'red', margin: '3px' }}
            >
              <div className='imgCheminCard'>
                {item.nft_identifier && (
                  <MyStakedNft
                    nft_identifier={item.nft_identifier}
                    nft_nonce={item.nft_nonce}
                  />
                )}
              </div>
              <ActionUnstakeNFT nft_id={item?.nft_id} />
              <br />
            </div>
          ))}
    </div>
  );
};

export default MyNftSection;
