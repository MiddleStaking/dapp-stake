import React, {
  CSSProperties,
  FC,
  JSXElementConstructor,
  ReactElement
} from 'react';
import styles from './styles.module.scss';
import ReactPlayer from 'react-player';
// import { IconFacebook } from "module";
import notfoundNft from '../../../../assets/img/notfoundnft.png';

interface TypeSectionProps {
  format: 'video/mp4' | 'image';
  url: string;
  width: number;
  borderColor?: string;
  borderWidth?: number;
  border?: boolean;
}

// heightComponentTypeSection
const hexagoneNFT: FC<TypeSectionProps> = ({
  format,
  url,
  width,
  border = false,
  borderWidth = 0,
  borderColor = 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)'
}) => {
  const hex: CSSProperties = {
    display: 'block',
    margin: '0 auto',
    position: 'relative',
    padding: border ? borderWidth : '0px',
    width: width + 'px',
    height: width * 0.866 + 'px' /* width * 0.866 */,
    background: border ? borderColor : 'transparent',
    boxSizing: 'border-box'
    // border: `5px solid ${borderColor}`
  };

  const hexbackgroundBorder: CSSProperties = {
    backgroundColor: borderColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };
  const hexbackground: CSSProperties = {
    position: 'absolute',
    backgroundColor: 'transparent' /*color of the main-background*/,
    width: '100%',
    height: '100%' /* width * 0.866 */
  };

  if (!url) {
    return (
      <div className={styles.hex} style={hex}>
        <div className={styles.hexbackgroundBorder} style={hexbackgroundBorder}>
          <div style={hexbackground} className={styles.hexbackground}>
            <img src={notfoundNft} alt='Not Found' />
          </div>
        </div>
      </div>
    );
  }

  switch (format) {
    case 'video/mp4':
      return (
        <div className={styles.hex} style={hex}>
          <div
            className={styles.hexbackgroundBorder}
            style={hexbackgroundBorder}
          >
            <div style={hexbackground} className={styles.hexbackground}>
              <ReactPlayer
                width={'100%'}
                height={'100%'}
                playing={true}
                loop={true}
                volume={0}
                muted={true}
                url={url}
              />
            </div>
          </div>
        </div>
      );
    case 'image':
      return (
        <div className={styles.hex} style={hex}>
          <div
            className={styles.hexbackgroundBorder}
            style={hexbackgroundBorder}
          >
            <div style={hexbackground} className={styles.hexbackground}>
              <img src={url} />
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default hexagoneNFT;
