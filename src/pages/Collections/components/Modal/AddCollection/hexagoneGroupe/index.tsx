import React from 'react';
import HexagoneNFT from 'pages/Collections/components/hexagoneNFT';
import './hexagoneGroupe.scss';

const HexagoneGroupe = (props: any) => {
  switch (props.orientationEscalier) {
    case 'reverse':
      return (
        <div className='hexagoeChevaucheModal'>
          {props.collectionInfo &&
            props.collectionInfo
              .slice(
                0,
                props.collectionInfo.length > 4
                  ? 4
                  : props.collectionInfo.length
              )
              .reverse()
              .map((collectionInfo: any, index: number) => (
                <div
                  key={index}
                  className='hexagoeChevauche'
                  style={{ zIndex: 1 + index }}
                >
                  <HexagoneNFT
                    format={collectionInfo.media[0].fileType}
                    url={collectionInfo.media[0].url}
                    width={props.width ? props.width : 100}
                    withBorder={true}
                    borderWidth={2.5}
                    borderColor='linear-gradient(to bottom, #1f67ff, #5e5ffe, #8356fa, #a249f4, #bd37ec)'
                    withShadow={true}
                  />
                </div>
              ))}
          {props.logoToken && (
            <div
              style={{
                position: 'absolute',
                bottom: 0, // Positionne cette div en bas de la div parente
                right: -30, // Positionne cette div à gauche de la div parente
                borderRadius: '50px',
                width: '28px',
                height: '28px',
                background: 'black',
                zIndex: 30
              }}
            >
              <img
                style={{
                  borderRadius: '50px',
                  width: '28px',
                  height: '28px'
                }}
                src={props.logoToken}
                alt=''
              />
            </div>
          )}
        </div>
      );
    default:
      return (
        <div className='hexagoeChevaucheModal'>
          {props.collectionInfo &&
            props.collectionInfo
              .slice(
                0,
                props.collectionInfo.length > 4
                  ? 4
                  : props.collectionInfo.length
              )
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
                    width={props.width ? props.width : 100}
                    withBorder={true}
                    borderWidth={2.5}
                    borderColor='linear-gradient(to bottom, #1f67ff, #5e5ffe, #8356fa, #a249f4, #bd37ec)'
                    withShadow={true}
                  />
                </div>
              ))}
          {props.logoToken && (
            <div
              style={{
                position: 'absolute',
                bottom: 0, // Positionne cette div en bas de la div parente
                left: 0, // Positionne cette div à gauche de la div parente
                borderRadius: '50px',
                width: '28px',
                height: '28px',
                background: 'black',
                zIndex: 30
              }}
            >
              <img
                style={{
                  borderRadius: '50px',
                  width: '28px',
                  height: '28px'
                }}
                src={props.logoToken}
                alt=''
              />
            </div>
          )}
        </div>
      );
  }
};
export default HexagoneGroupe;
