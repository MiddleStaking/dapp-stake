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
import { useGetNft } from 'pages/Collections/components/Actions/helpers/useGetNft';

interface MyStakeSectionProps {
  staked_balance: any[];
  pool: number;
}
const MyStakedNft: FC<any> = ({ nft_identifier, nft_nonce }) => {
  const nft: any = useGetNft(nft_identifier, nft_nonce);

  //   console.log(nft_identifier);
  //   console.log(nft_nonce);
  //   console.log(nft);

  return (
    <>
      {nft?.media && (
        <HexagoneNFT
          format={nft?.media[0]?.fileType}
          url={nft?.media[0]?.url}
          width={100}
          withBorder={true}
          borderWidth={2.5}
          borderColor='linear-gradient(to bottom, #1f67ff, #5e5ffe, #8356fa, #a249f4, #bd37ec)'
        />
      )}
    </>
  );
};

export default MyStakedNft;
