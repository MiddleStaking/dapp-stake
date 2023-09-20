import React, { CSSProperties, FC } from 'react';
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
  withBorder?: boolean;
  withShadow?: boolean;
  ShadowDimeantion?: string;
  shadowColor?: string;
}

// heightComponentTypeSection
const hexagoneNFT: FC<TypeSectionProps> = ({
  format,
  url,
  width,
  withBorder = false,
  borderWidth = 0,
  borderColor = 'black',
  withShadow = false,
  ShadowDimeantion = '7px 0px 4px',
  shadowColor = 'rgba(0, 0, 0, 1)'
}) => {
  const hex: CSSProperties = {
    display: 'block',
    margin: '0 auto',
    position: 'relative',
    padding: withBorder ? borderWidth : '0px',
    width: width + 'px',
    height: width * 0.866 + 'px' /* width * 0.866 */,
    background: withBorder ? borderColor : 'transparent',
    boxSizing: 'border-box',
    borderRadius: '0px' // NOTE: border radius
  };

  const hexbackgroundBorder: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'inherit'
  };
  const hexbackground: CSSProperties = {
    width: '100%',
    height: '100%',
    borderRadius: 'inherit'
  };
  const hexImage: CSSProperties = {
    borderRadius: 'inherit'
  };

  if (!url) {
    return (
      <div
        style={{
          filter: withShadow
            ? `drop-shadow(${shadowColor} ${ShadowDimeantion})`
            : 'none'
        }}
      >
        <div className={styles.hex} style={hex}>
          <div
            className={styles.hexbackgroundBorder}
            style={hexbackgroundBorder}
          >
            <div style={hexbackground} className={styles.hexbackground}>
              <img style={hexImage} src={notfoundNft} alt='Not Found' />
            </div>
          </div>
        </div>
      </div>
    );
  }

  switch (format) {
    case 'video/mp4':
      return (
        <div
          style={{
            filter: withShadow
              ? `drop-shadow(${shadowColor} ${ShadowDimeantion})`
              : 'none'
          }}
        >
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
                  playsInline={false}
                />
              </div>
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div
          style={{
            filter: withShadow
              ? `drop-shadow(${shadowColor} ${ShadowDimeantion})`
              : 'none'
          }}
        >
          <div className={styles.hex} style={hex}>
            <div
              className={styles.hexbackgroundBorder}
              style={hexbackgroundBorder}
            >
              <div style={hexbackground} className={styles.hexbackground}>
                <img style={hexImage} src={url} />
              </div>
            </div>
          </div>
        </div>
      );
  }
};

export default hexagoneNFT;
