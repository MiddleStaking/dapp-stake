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
import { PoolAddCollection } from '../../Modal/AddCollection/PoolAddCollection';

interface TypeButtonProps {
  height?: string;
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
  socialNetwork?: [
    {
      icon: ReactElement<any, string | JSXElementConstructor<any>>;
      url: string;
    }
  ];
}

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
  gap: '0px',
  marginTop: '0px'
};

// heightComponentTypeSection
export const ButtonSection: FC<TypeButtonProps> = ({
  height,
  width = '100%',
  background = 'linear-gradient(0deg, rgba(99, 74, 203, 0.32), rgba(99, 74, 203, 0.32)),linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%)',
  gradientDirection = 'to right',
  borderRadius = '0px',
  collectionIdentifier
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
  const ButtonSectionStyle: CSSProperties = {
    width: width,
    padding: '20px',
    background: isGradient(background)
      ? `linear-gradient(${gradientDirection}, ${background[0]}, ${background[1]})`
      : background,
    borderRadius: borderRadius,
    borderWidth: '0px',
    // borderStyle: 'solid',
    borderStyle: '',
    borderImage:
      'linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.00) 100%) 1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
    // marginTop: '15px'
  };

  const showButton: CSSProperties = {
    // fontFamily: 'sans-serif',
    fontWeight: 'lighter',
    color: 'white',
    background: 'black',
    border: '0px',
    borderRadius: '30px',
    padding: '5px 15px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    position: 'relative'
  };

  // ---------- CARD Données ---------- //
  return (
    <div style={ButtonSectionStyle}>
      {/* ---- BOUTONS FOOT CARD => AUTRE COMPOSANT ? ButtonSection ---- */}
      <div
        onClick={() =>
          (window.location.href = `/collections/${collectionIdentifier}`)
        }
        className='butLine bouton-visiter'
        data-testid='loginBtn'
      >
        <button className='showButton' style={showButton}>
          Show Rewards {collectionIdentifier}
        </button>
      </div>
    </div>
  );
};

export default ButtonSection;
