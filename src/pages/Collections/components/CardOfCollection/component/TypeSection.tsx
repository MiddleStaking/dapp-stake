// NOTE : MEP de la CARD + récup' données de BDD

import React, {
  CSSProperties,
  FC,
  JSXElementConstructor,
  ReactElement
} from 'react';
import SwowHideDetails from './SwowHideDetails';
// import { IconFacebook } from "module";

import ReactPlayer from 'react-player';
import HexagoneNFT from '../../hexagoneNFT';
import { PoolAddCollection } from '../../Modal/AddCollection/PoolAddCollection';
import HexFormSvgNft from '../../HexFormSvgNft';
import { string } from 'yup';

interface TypeSectionProps {
  height: string;
  width: string;
  background?: string | [string, string];
  gradientDirection?: string;
  borderRadius?: string;
  WindowDimensions: number;
  collectionIdentifier: string;
  collectionInfo: any;
  textColor?: string;
  address: string;
  fontFamily?: string;
  socialNetwork?: [
    {
      icon: ReactElement<any, string | JSXElementConstructor<any>>;
      url: string;
    }
  ];
}

// heightComponentTypeSection
export const TypeSection: FC<TypeSectionProps> = ({
  height,
  width = '100%',
  background = 'linear-gradient(0deg, rgba(99, 74, 203, 0.32), rgba(99, 74, 203, 0.32)),linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%)',
  gradientDirection = 'to right',
  borderRadius = '8px 8px 0px 0px',
  WindowDimensions,
  socialNetwork,
  textColor = '#ffffff',
  fontFamily = 'sans-serif',
  collectionIdentifier,
  collectionInfo,
  address
}) => {
  const isGradient = (
    value: string | [string, string]
  ): value is [string, string] => {
    return Array.isArray(value);
  };
  const [showDetails, setShowDetails] = React.useState(false);
  const handleChange = () => {
    setShowDetails(!showDetails);
  };

  // WindowDimensions > 450 ? dekstop : mobile
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
    gap: WindowDimensions > 450 ? '20px' : '14px',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    flexShrink: 0,
    position: 'relative',
    overflow: 'hidden',
    // marginTop: '15px'
    paddingLeft: '24px',
    paddingRight: '24px'
  };

  const top: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexShrink: 0,
    position: 'relative'
  };

  const left: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    position: 'relative'
  };

  //=> DIV BLOC => TEXT INFO :
  const title: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    position: 'relative',
    width: '140px'
  };

  //=> TITRE NAME :
  const earnMex: CSSProperties = {
    color: textColor,
    textAlign: 'left',
    fontFamily: fontFamily,
    fontWeight: 700,
    fontSize: WindowDimensions > 450 ? '22px' : '14px',
    // position: 'relative',
    // display: 'flex',
    // alignItems: 'center',
    alignItems: 'flex-start'
    // justifyContent: 'flex-start'
  };

  //=> EARN TOCKENS :
  const stakeMex: CSSProperties = {
    color: textColor,
    textAlign: 'left',
    fontFamily: fontFamily,
    fontWeight: 300,
    fontSize: '12px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  };

  //=> NFT + Blés :
  const rate: CSSProperties = {
    background:
      'linear-gradient(-90deg, rgba(92, 76, 241, 1.00) 0%, rgba(150, 64, 203, 1.00) 100%)',
    borderRadius: '30px',
    padding: '4px 8px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    position: 'relative'
  };

  //=> SHOW DETAIL :
  const detailsStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexShrink: 0,
    position: 'relative',
    cursor: 'pointer',
    color: 'white',
    textTransform: 'uppercase',
    marginTop: '15px' // pour laisser de la place si titre sur 2 lignes.
  };

  const NFTInfo: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexShrink: 0,
    position: 'relative',
    // cursor: 'pointer',
    color: 'white',
    gap: '10px',
    marginTop: '10px'
  };

  const textTestColor: CSSProperties = {
    color: 'yellow'
  };

  console.log(collectionInfo[0]);
  // ---------- CARD Données ---------- //
  return (
    <div style={TypeSectionStyle}>
      {/* Bloc de Tête + héxagone */}
      <div style={top}>
        {/* TITRE + Donné info de tête */}
        <div style={left}>
          <div style={title}>
            <div style={earnMex}>{collectionIdentifier.split('-')[0]}</div>

            <div style={stakeMex}>Earn tokens</div>

            {/* ---- NFT + 2 blocs% ---- */}
            <div style={NFTInfo}>
              <div>NFT</div>
              <div style={rate}>10000</div>
              <div style={rate}>10%</div>
            </div>
          </div>
        </div>
        {/* ---- IMAGE CARD : FORME Hexagone ---- */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            width: '5%'
            // backgroundColor: 'yellow'
          }}
        >
          {collectionInfo && (
            <HexFormSvgNft
              widthSvg={108}
              format={collectionInfo[0]?.media[0]?.fileType}
              url={collectionInfo[0]?.media[0]?.url}
            />
          )}
        </div>
      </div>

      {/* ---- Blés ---- */}
      <div
        style={{
          display: 'flex',
          gap: '6px'
        }}
      >
        <img
          style={{ height: '30px', width: '30px' }}
          src='https://raw.githubusercontent.com/ElrondNetwork/assets/master/devnet/tokens/MID-7f1d59/logo.svg'
          alt='image de ble-1'
        />
        <img
          style={{ height: '30px', width: '30px' }}
          src='https://raw.githubusercontent.com/ElrondNetwork/assets/master/devnet/tokens/MEX-dc289c/logo.svg'
          alt='image de ble-2'
        />
        <img
          style={{ height: '30px', width: '30px' }}
          src='http://localhost:3000/static/media/notfoundc.f9c5d18b9c1c271391259cdb05721746.svg'
          alt='image de ble-1'
        />{' '}
        <img
          style={{
            borderRadius: '50%',
            overflow: 'hidden',
            height: '30px',
            width: '30px'
          }}
          src='https://raw.githubusercontent.com/ElrondNetwork/assets/master/devnet/tokens/KTON-c44673/logo.svg'
          alt='image de ble-3'
        />
        <img
          style={{ height: '30px', width: '30px' }}
          src='https://raw.githubusercontent.com/ElrondNetwork/assets/master/devnet/tokens/ASH-4ce444/logo.svg'
          alt='image de ble-3'
        />
        <img
          style={{ height: '30px', width: '30px' }}
          src='https://raw.githubusercontent.com/ElrondNetwork/assets/master/devnet/tokens/ATS-e57f90/logo.svg'
          alt='image de ble-3'
        />
        <img
          style={{
            borderRadius: '50%',
            height: '30px',
            width: '30px',
            backgroundColor: 'white'
          }}
          src='https://raw.githubusercontent.com/ElrondNetwork/assets/master/devnet/tokens/EFOO-8e80a5/logo.svg'
          alt='image de ble-3'
        />
      </div>

      {/* ---- Show Details ---- */}
      <div style={detailsStyle} onClick={handleChange}>
        <div style={{ fontSize: '10px', fontWeight: 'lighter', height: '0px' }}>
          {!showDetails ? 'Show details' : 'Hide details'}
        </div>
        {!showDetails ? (
          <svg
            className='chevron-down3'
            width='24'
            height='24'
            viewBox='0 0 24 10'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M12 15.5002C11.8684 15.5009 11.7379 15.4757 11.6161 15.426C11.4943 15.3762 11.3834 15.3029 11.29 15.2102L7.29 11.2102C7.19676 11.1169 7.1228 11.0063 7.07234 10.8844C7.02188 10.7626 6.99591 10.632 6.99591 10.5002C6.99591 10.3683 7.02188 10.2378 7.07234 10.1159C7.1228 9.99411 7.19676 9.88342 7.29 9.79018C7.38324 9.69695 7.49393 9.62299 7.61575 9.57253C7.73758 9.52206 7.86814 9.49609 8 9.49609C8.13186 9.49609 8.26243 9.52206 8.38425 9.57253C8.50607 9.62299 8.61676 9.69695 8.71 9.79018L12 13.1002L15.3 9.92019C15.392 9.8179 15.5041 9.73569 15.6293 9.6787C15.7545 9.62171 15.8902 9.59118 16.0277 9.589C16.1653 9.58682 16.3018 9.61304 16.4287 9.66603C16.5557 9.71903 16.6703 9.79764 16.7655 9.89697C16.8607 9.99629 16.9344 10.1142 16.9819 10.2433C17.0295 10.3724 17.0499 10.5099 17.0418 10.6472C17.0338 10.7846 16.9975 10.9188 16.9353 11.0414C16.873 11.1641 16.7861 11.2726 16.68 11.3602L12.68 15.2202C12.4971 15.3965 12.254 15.4966 12 15.5002Z'
              fill='white'
            />
          </svg>
        ) : (
          <svg
            className='chevron-up'
            width='24'
            height='24'
            viewBox='0 0 24 10'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M16 14.5C15.8684 14.5008 15.7379 14.4756 15.6161 14.4258C15.4943 14.376 15.3834 14.3027 15.29 14.21L12 10.9L8.7 14.08C8.51264 14.2663 8.25919 14.3708 7.995 14.3708C7.73081 14.3708 7.47736 14.2663 7.29 14.08C7.19627 13.9871 7.12188 13.8765 7.07111 13.7546C7.02034 13.6327 6.9942 13.502 6.9942 13.37C6.9942 13.238 7.02034 13.1073 7.07111 12.9854C7.12188 12.8636 7.19627 12.753 7.29 12.66L11.29 8.80002C11.4769 8.61679 11.7282 8.51416 11.99 8.51416C12.2518 8.51416 12.5031 8.61679 12.69 8.80002L16.69 12.8C16.7837 12.893 16.8581 13.0036 16.9089 13.1254C16.9597 13.2473 16.9858 13.378 16.9858 13.51C16.9858 13.642 16.9597 13.7727 16.9089 13.8946C16.8581 14.0165 16.7837 14.1271 16.69 14.22C16.5046 14.3987 16.2575 14.499 16 14.5V14.5Z'
              fill='white'
            />
          </svg>
        )}
      </div>
      <div style={{ display: !showDetails ? 'none' : 'block', width: '100%' }}>
        <p
          style={{
            // color: '#EEEEEE',
            color: '#dddddd',
            // fontStyle: 'italic',
            // fontWeight: 'lighter',
            // fontFamily: fontFamily,
            fontSize: '11px'
          }}
        >
          Cupcake ipsum dolor sit amet dragée. Lemon drops dragée topping lemon
          drops muffin fruitcake. Cake cake I love oat cake I love I love dragée
          sweet roll carrot cake. Sweet roll lollipop gummies topping I love
          tart ice cream dessert.
        </p>
      </div>
    </div>
  );
};

export default TypeSection;
