import React, { useEffect } from 'react';
import HexagoneNFT from 'pages/Collections/components/hexagoneNFT';
import './hexagoneGroupe.scss';

const HexagoneGroupe = (props: any) => {
  return (
    <div className='hexagoeChevaucheModal'>
      {props.collectionInfo
        .slice(0, 4)
        .map((collectionInfo: any, index: number) => (
          <div
            key={index}
            className='hexagoeChevauche'
            style={{ zIndex: 10 - index }}
          >
            <HexagoneNFT
              format={
                collectionInfo.media[0].fileType == 'video/mp4'
                  ? 'video/mp4'
                  : 'image'
              }
              url={collectionInfo.media[0].url}
              width={100}
              withBorder={true}
              borderWidth={2.5}
              borderColor='linear-gradient(to bottom, #1f67ff, #5e5ffe, #8356fa, #a249f4, #bd37ec)'
              withShadow={true}
            />
          </div>
        ))}
    </div>
  );
};
export default HexagoneGroupe;
