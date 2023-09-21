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
  pool_nonce: bigint;
}
const MyNftSection: FC<MyNftSectionProps> = ({
  pool_id,
  nft_balance,
  pool_nonce
}) => {
  const { address } = useGetAccountInfo();

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        justifyContent: 'center'
      }}
    >
      {nft_balance &&
        nft_balance.map((item, key) => (
          <div key={key}>
            {(item.nonce == pool_nonce || pool_nonce == BigInt(0)) && (
              <div
                style={{
                  width: '100px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}
              >
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
                <ActionStakeNft
                  address={address}
                  stakedNFT={item?.collection}
                  user_fund={1}
                  pool_id={pool_id}
                  nft_nonce={item?.nonce}
                />
              </div>
            )}
            {/* {pool_nonce == BigInt(0) ||
              (pool_nonce == item.nonce && (
                <div
                  style={{
                    width: '100px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
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
                  <ActionStakeNft
                    address={address}
                    stakedNFT={item?.collection}
                    user_fund={1}
                    pool_id={pool_id}
                    nft_nonce={item?.nonce}
                  />
                </div>
              ))} */}
          </div>
        ))}
    </div>
  );
};

export default MyNftSection;
