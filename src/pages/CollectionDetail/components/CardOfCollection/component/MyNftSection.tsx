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

interface MyNftSectionProps {
  nft_balance: any[];
  pool_id: number;
}
const MyNftSection: FC<MyNftSectionProps> = ({ pool_id, nft_balance }) => {
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

  return (
    // <>
    <div style={sectionStyle}>
      {nft_balance &&
        nft_balance.map((item, key) => (
          <div
            className='col-12 text-white'
            key={key}
            style={{ backgroundColor: 'red', margin: '3px' }}
          >
            <div className='imgCheminCard'>
              <HexagoneNFT
                format={
                  item?.media[0]?.fileType == 'video/mp4'
                    ? 'video/mp4'
                    : 'image'
                }
                url={item?.media[0]?.url ? item?.media[0]?.url : ''}
                width={100}
                withBorder={true}
                borderWidth={2.5}
                borderColor='linear-gradient(to bottom, #1f67ff, #5e5ffe, #8356fa, #a249f4, #bd37ec)'
              />
            </div>
            <ActionStakeNft
              address={address}
              stakedNFT={item?.collection}
              user_fund={1}
              pool_id={pool_id}
              nft_nonce={item?.nonce}
            />
            <br />
          </div>
        ))}
    </div>
  );
};

export default MyNftSection;
