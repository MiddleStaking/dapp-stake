//NOTE - partie inferieure
import React, { FC } from 'react';
import { useGetNft } from 'pages/Collections/components/Actions/helpers/useGetNft';
import HexagoneNFT from 'pages/Collections/components/hexagoneNFT';

const MyStakedNft: FC<any> = ({
  nft_identifier,
  nft_nonce,
  isOpen,
  nft_qty,
  jump,
  jumpDesabled,
  setOpenModalJump,
  setNftsJump,
  nftsDetail,
  collectionReward,
  collectionRewards
}) => {
  const nft: any = useGetNft(nft_identifier, nft_nonce, isOpen);

  return (
    <>
      {nft?.media && (
        <HexagoneNFT
          collectionRewards={collectionRewards}
          collectionReward={collectionReward}
          nftsDetail={nftsDetail}
          setNftsJump={setNftsJump}
          setOpenModalJump={setOpenModalJump}
          jump={jump}
          jumpDesabled={jumpDesabled}
          format={nft?.media[0]?.fileType}
          url={nft?.media[0]?.url}
          width={100}
          withBorder={true}
          borderWidth={2.5}
          borderColor='linear-gradient(to bottom, #1f67ff, #5e5ffe, #8356fa, #a249f4, #bd37ec)'
          nft_qty={nft_qty}
        />
      )}
    </>
  );
};

export default MyStakedNft;
