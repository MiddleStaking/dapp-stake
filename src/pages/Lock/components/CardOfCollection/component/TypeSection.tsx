import React, {
  CSSProperties,
  FC,
  JSXElementConstructor,
  ReactElement
} from 'react';

import {
  faCertificate,
  faSkullCrossbones
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'components/Design';
import Tooltip from 'components/Tooltip/Tooltip';
import { verified } from 'verified-collections';
import notFound from '../../../../../assets/img/notfoundc.svg';
import HexagoneNFT from '../../hexagoneNFT';

interface TypeSectionProps {
  height: string;
  width?: string;
  background?: string | [string, string];
  gradientDirection?: string;
  borderRadius?: string;
  WindowDimensions: number;
  collectionIdentifier: string;
  collectionInfo: any;
  textColor?: string;
  address: string;
  fontFamily?: string;
  collection?: any;
  socialNetwork?: [
    {
      icon: ReactElement<any, string | JSXElementConstructor<any>>;
      url: string;
    }
  ];
}

// heightComponentTypeSection
const TypeSection: FC<TypeSectionProps> = ({
  height,
  width = '100%',
  background = 'linear-gradient(0deg, rgba(99, 74, 203, 0.32), rgba(99, 74, 203, 0.32)),linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%)',
  gradientDirection = 'to right',
  borderRadius = '8px 8px 8px 8px',
  WindowDimensions,
  textColor = '#ffffff',
  fontFamily = 'sans-serif',
  // collectionIdentifier,
  // collectionInfo,
  collection
}) => {
  const isGradient = (
    value: string | [string, string]
  ): value is [string, string] => {
    return Array.isArray(value);
  };

  const TypeSectionStyle: CSSProperties = {
    minHeight: height,
    width: width,
    background: isGradient(background)
      ? `linear-gradient(${gradientDirection}, ${background[0]}, ${background[1]})`
      : background,
    borderRadius: borderRadius,
    borderWidth: '1px',
    // borderStyle: 'solid',
    borderStyle: '',
    borderImage:
      'linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.00) 100%) 1',
    padding: WindowDimensions > 450 ? '24px 24px 12px 24px' : '16px 16px 10px',
    display: 'flex',
    flexDirection: 'column',
    gap: WindowDimensions > 450 ? '18px' : '14px',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    flexShrink: 0,
    overflow: 'hidden'
    // marginTop: '15px'
  };

  const top: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexShrink: 0
  };

  const left: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexShrink: 0
  };

  const title: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    alignItems: 'flex-start',
    justifyContent: 'flex-star',
    flexShrink: 0
  };

  const earnMex: CSSProperties = {
    color: textColor,
    textAlign: 'left',
    fontFamily: fontFamily,
    fontWeight: 700,
    fontSize: WindowDimensions > 450 ? '22px' : '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  };

  const stakeMex: CSSProperties = {
    color: textColor,
    textAlign: 'left',
    fontFamily: fontFamily,
    fontWeight: 300,
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  };

  const uniqueTokens = new Set();

  const filteredRewards = collection?.rewards.filter((item: any) => {
    const token = item?.rewarded_token.split('-')[0];
    if (uniqueTokens.has(token)) {
      return false;
    }
    uniqueTokens.add(token);
    return true;
  });

  return (
    <div
      onClick={() =>
        (window.location.href = `/collections/${collection?.identifier}`)
      }
      style={TypeSectionStyle}
    >
      <div style={top}>
        <div style={left}>
          <div style={title}>
            <div style={earnMex}>
              {collection?.identifier.split('-')[0]}
              {verified
                .filter((a) => {
                  return a.c === collection?.identifier && a.s === 'verified';
                })
                .map((a, key) => (
                  <FontAwesomeIcon
                    key={key}
                    icon={faCertificate}
                    style={{ color: '#66bf1d' }}
                    size={'sm'}
                  />
                ))}{' '}
              {verified
                .filter((a) => {
                  return a.c === collection?.identifier && a.s === 'scam';
                })
                .map((a, key) => (
                  <FontAwesomeIcon
                    key={key}
                    icon={faSkullCrossbones}
                    style={{ color: 'red' }}
                    size={'sm'}
                  />
                ))}
            </div>

            <div style={stakeMex}>Earn tokens</div>
            <div
              style={{
                width: '144px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '5px'
              }}
            >
              {filteredRewards.map((item: any, index: number) => (
                <Tooltip
                  content={
                    <div>
                      <div>{item?.rewarded_token}</div>
                    </div>
                  }
                  key={index}
                >
                  <div
                    key={index}
                    style={{
                      borderRadius: '50px',
                      width: '28px',
                      height: '28px',
                      background: 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                    onClick={() =>
                      window.open(
                        `https://explorer.multiversx.com/tokens/${item?.rewarded_token}`,
                        '_blank'
                      )
                    }
                  >
                    <img
                      style={{
                        borderRadius: '50px',
                        width: '28px',
                        height: '28px'
                      }}
                      src={item?.svgUrl ? item.svgUrl : notFound}
                      alt=''
                    />
                  </div>
                </Tooltip>
              ))}
            </div>

            <div
              className='butLine bouton-visiter'
              data-testid='loginBtn'
            ></div>
          </div>
        </div>
        {/* ---- IMAGE CARD ---- */}
        <div className='imgCheminCard'>
          {collection && (
            <div
            // onClick={(e) => {
            //   e.stopPropagation(); // Arrête la propagation de l'événement
            //   window.open(collection?.media.frameitUrl, '_blank');
            // }}
            >
              <HexagoneNFT
                format={collection?.media?.fileType}
                url={collection?.media.url}
                width={100}
                withBorder={true}
                borderWidth={2.5}
                borderColor='linear-gradient(to bottom, #1f67ff, #5e5ffe, #8356fa, #a249f4, #bd37ec)'
              />
            </div>
          )}
        </div>
      </div>
      <div style={{ margin: 'auto' }}>
        <Button
          borderRadius={40}
          buttonHeight='31px'
          // buttonWidth='240px'
          textColor='#ffffff'
          background={'#000000'}
          onClick={() =>
            (window.location.href = `/collections/${collection?.identifier}`)
          }
          text={'Rewards'}
        />
      </div>
    </div>
    // <div
    //   onClick={() =>
    //     (window.location.href = `/collections/${collectionIdentifier}`)
    //   }
    //   style={TypeSectionStyle}
    // >
    //   <div style={top}>
    //     <div style={left}>
    //       <div style={title}>
    //         <div style={earnMex}>
    //           {collectionIdentifier.split('-')[0]}
    //           {verified
    //             .filter((a) => {
    //               return a.c === collectionIdentifier && a.s === 'verified';
    //             })
    //             .map((a, key) => (
    //               <FontAwesomeIcon
    //                 key={key}
    //                 icon={faCertificate}
    //                 style={{ color: '#66bf1d' }}
    //                 size={'sm'}
    //               />
    //             ))}{' '}
    //           {verified
    //             .filter((a) => {
    //               return a.c === collectionIdentifier && a.s === 'scam';
    //             })
    //             .map((a, key) => (
    //               <FontAwesomeIcon
    //                 key={key}
    //                 icon={faSkullCrossbones}
    //                 style={{ color: 'red' }}
    //                 size={'sm'}
    //               />
    //             ))}
    //         </div>

    //         <div style={stakeMex}>Earn tokens</div>

    //         <div
    //           onClick={() =>
    //             (window.location.href = `/collections/${collectionIdentifier}`)
    //           }
    //           className='butLine bouton-visiter'
    //           data-testid='loginBtn'
    //         ></div>
    //       </div>
    //     </div>
    //     {/* ---- IMAGE CARD ---- */}
    //     <div className='imgCheminCard'>
    //       {collectionInfo && (
    //         <HexagoneNFT
    //           format={
    //             collectionInfo[0]?.media[0]?.fileType == 'video/mp4'
    //               ? 'video/mp4'
    //               : 'image'
    //           }
    //           url={collectionInfo[0]?.media[0]?.url}
    //           width={100}
    //           withBorder={true}
    //           borderWidth={2.5}
    //           borderColor='linear-gradient(to bottom, #1f67ff, #5e5ffe, #8356fa, #a249f4, #bd37ec)'
    //         />
    //       )}
    //     </div>
    //   </div>
    //   <div style={{ margin: 'auto' }}>
    //     <Button
    //       borderRadius={40}
    //       buttonHeight='31px'
    //       // buttonWidth='240px'
    //       textColor='#ffffff'
    //       background={'#000000'}
    //       onClick={() =>
    //         (window.location.href = `/collections/${collectionIdentifier}`)
    //       }
    //       text={'Rewards'}
    //     />
    //   </div>
    // </div>
  );
};

export default TypeSection;
