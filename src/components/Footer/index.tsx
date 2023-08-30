import React, { FC, useContext } from 'react';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation, useNavigate } from 'react-router-dom';
import { useWindowDimensions } from 'components/DimensionScreen';
import { defaultToken } from 'config';
import { HeaderMenuContext } from 'context/Header/HeaderMenuContext';
import { routeNames } from 'routes';
import { ReactComponent as GitHub } from '../../assets/img/github.svg';
import { ReactComponent as HeartIcon } from '../../assets/img/heart.svg';
import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';

// interface DropdownMenuProps {}

const FooterDekstop: FC<any> = ({}) => {
  const { headerMenu } = useContext(HeaderMenuContext);
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const isLoggedIn = useGetIsLoggedIn();

  //   background: linear-gradient(90deg, #2266FF 0%, #1F67FF 100%);

  const path = useLocation().pathname;
  const firstSegment = '/' + path.split('/')[1];

  const FooterMobile: React.CSSProperties = {
    zIndex: 1000,
    position: 'fixed',
    bottom: 0,
    left: 0,
    display: headerMenu ? 'flex' : 'none',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 13px',
    height: '79px',
    width: '100%',
    background: '#220C3E',
    border: ' 1px solid #695885',
    borderRadius: '24px 24px 0px 0px',
    borderBottom: 'none'
  };

  const iconStyle: React.CSSProperties = {
    width: '60px',
    height: '57px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: '12px 12px 0px 0px'
  };

  const labelIconStyle: React.CSSProperties = {
    width: '100%',
    height: '11px',
    color: '#FFFFFF',
    fontFamily: '',
    fontSize: ' 10px',
    fontWeight: 400,
    lineHeight: '11px',
    letterSpacing: '0em',
    textAlign: 'center',
    margin: 0,
    marginTop: '10%'
  };

  const backGroundActive: React.CSSProperties = {
    background:
      'linear-gradient(156.86deg, rgba(189, 55, 236, 0.64) 12.97%, rgba(31, 103, 255, 0) 71.91%)'
  };
  const backGround: React.CSSProperties = {
    background: 'transparent'
  };

  // const gradientStyle: React.CSSProperties = {
  //   background: 'linear-gradient(90deg, #2266FF 0%, #1F67FF 100%)',
  //   WebkitBackgroundClip: 'text',
  //   WebkitTextFillColor: 'transparent',
  //   width: '100%',
  //   height: '11px',
  //   fontFamily: '',
  //   fontSize: ' 10px',
  //   fontWeight: 400,
  //   lineHeight: '11px',
  //   letterSpacing: '0em',
  //   textAlign: 'center',
  //   margin: 0,
  //   marginTop: '10%'
  // };
  return width > 450 ? (
    <footer
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50px',
        margin: '0',
        background:
          'linear-gradient(rgba(133, 114, 207, 0.24) 0%, rgba(162, 150, 208, 0) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1))'
      }}
      className='text-center'
    >
      <div style={{ color: 'white', margin: '0' }}>
        <a
          style={{ color: 'white' }}
          {...{
            target: '_blank'
          }}
          className='align-items-center'
          href='https://middlestaking.fr/'
        >
          Made with <HeartIcon className='mx-1' /> by Middle Staking.
        </a>{' '}
        <a
          {...{
            target: '_blank'
          }}
          className='align-items-center'
          href='https://github.com/middlestaking'
          style={{
            color: 'white',
            margin: '0px',
            padding: '0px',
            width: '15px',
            display: 'inline-flex'
          }}
        >
          <GitHub className='navIcon' />
        </a>{' '}
        <a
          {...{
            target: '_blank'
          }}
          className='align-items-center'
          href='https://docs.middlestaking.fr'
          style={{
            color: 'white',
            margin: '0px',
            padding: '0px',
            width: '15px',
            display: 'inline-flex'
          }}
        >
          {' '}
          <FontAwesomeIcon size='lg' icon={faBook} />
        </a>
      </div>
    </footer>
  ) : (
    <div style={FooterMobile}>
      <div
        onClick={() => navigate(routeNames.stake + '/' + defaultToken)}
        style={{
          ...iconStyle,
          ...(firstSegment === routeNames.stake ? backGroundActive : backGround)
        }}
      >
        <StakingSvg select={firstSegment === routeNames.stake} />
        <p
          style={
            // firstSegment === routeNames.stake ? gradientStyle :
            labelIconStyle
          }
        >
          Stake
        </p>
      </div>
      <div
        onClick={() => navigate(routeNames.dashboard)}
        style={{
          ...iconStyle,
          ...(firstSegment === routeNames.dashboard
            ? backGroundActive
            : backGround)
        }}
      >
        <LayoutSvg select={firstSegment === routeNames.dashboard} />
        <p
          style={
            // firstSegment === routeNames.dashboard
            //   ? gradientStyle :
            labelIconStyle
          }
        >
          Dashboard
        </p>
      </div>

      <div
        onClick={() => navigate(routeNames.swap)}
        style={{
          ...iconStyle,
          ...(firstSegment === routeNames.swap ? backGroundActive : backGround)
        }}
      >
        <SwapCircleSvg select={firstSegment === routeNames.swap} />
        <p
          style={
            // firstSegment === routeNames.play ? gradientStyle :
            labelIconStyle
          }
        >
          Swap
        </p>
      </div>

      <div
        onClick={() => navigate(routeNames.account)}
        style={{
          ...iconStyle,
          ...(firstSegment === routeNames.account
            ? backGroundActive
            : backGround)
        }}
      >
        <UserSvg select={firstSegment === routeNames.account} />
        <p
          style={
            // firstSegment === routeNames.design ? gradientStyle :
            labelIconStyle
          }
        >
          {isLoggedIn ? 'Account' : 'Login'}
        </p>
      </div>
    </div>
  );
};

export default FooterDekstop;

interface SvgProps {
  widthSvg?: string;
  heightSvg?: string;
  colorSvg?: string;
  select: boolean;
}

const StakingSvg: FC<SvgProps> = () => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <defs>
        <linearGradient id='myGradient' gradientTransform='rotate(90)'>
          <stop offset='0%' stopColor='#2266FF' />
          <stop offset='100%' stopColor='#1F67FF' />
        </linearGradient>
      </defs>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M11.7765 1.55279C11.9173 1.4824 12.083 1.4824 12.2237 1.55279L22.2237 6.55279C22.3931 6.63748 22.5001 6.81061 22.5001 7C22.5001 7.18939 22.3931 7.36252 22.2237 7.44721L12.2237 12.4472C12.083 12.5176 11.9173 12.5176 11.7765 12.4472L1.77652 7.44721C1.60712 7.36252 1.50012 7.18939 1.50012 7C1.50012 6.81061 1.60712 6.63748 1.77652 6.55279L11.7765 1.55279ZM3.11816 7L12.0001 11.441L20.8821 7L12.0001 2.55902L3.11816 7ZM1.5529 16.7764C1.67639 16.5294 1.97673 16.4293 2.22372 16.5528L12.0001 21.441L21.7765 16.5528C22.0235 16.4293 22.3238 16.5294 22.4473 16.7764C22.5708 17.0234 22.4707 17.3237 22.2237 17.4472L12.2237 22.4472C12.083 22.5176 11.9173 22.5176 11.7765 22.4472L1.7765 17.4472C1.52951 17.3237 1.4294 17.0234 1.5529 16.7764ZM2.22372 11.5528C1.97673 11.4293 1.67639 11.5294 1.5529 11.7764C1.4294 12.0234 1.52951 12.3237 1.7765 12.4472L11.7765 17.4472C11.9173 17.5176 12.083 17.5176 12.2237 17.4472L22.2237 12.4472C22.4707 12.3237 22.5708 12.0234 22.4473 11.7764C22.3238 11.5294 22.0235 11.4293 21.7765 11.5528L12.0001 16.441L2.22372 11.5528Z'
        fill={
          // select ? 'url(#myGradient)' :
          '#ffffff'
        }
      />
    </svg>
  );
};

const LayoutSvg: FC<SvgProps> = () => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M5.125 3.5C4.29657 3.5 3.625 4.17157 3.625 5V8.5H9.125H20.625V5C20.625 4.17157 19.9534 3.5 19.125 3.5H5.125ZM8.625 9.5H3.625V19C3.625 19.8284 4.29657 20.5 5.125 20.5H8.625V9.5ZM9.625 20.5V9.5H20.625V19C20.625 19.8284 19.9534 20.5 19.125 20.5H9.625ZM9.125 21.5H5.125C3.74429 21.5 2.625 20.3807 2.625 19V9V5C2.625 3.61929 3.74429 2.5 5.125 2.5H19.125C20.5057 2.5 21.625 3.61929 21.625 5V9V19C21.625 20.3807 20.5057 21.5 19.125 21.5H9.125Z'
        fill={
          // select ? 'url(#myGradient)' :
          '#ffffff'
        }
      />
    </svg>
  );
};

const PlayCircleSvg: FC<SvgProps> = () => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M2.625 12C2.625 6.75329 6.87829 2.5 12.125 2.5C17.3717 2.5 21.625 6.75329 21.625 12C21.625 17.2467 17.3717 21.5 12.125 21.5C6.87829 21.5 2.625 17.2467 2.625 12ZM12.125 1.5C6.32601 1.5 1.625 6.20101 1.625 12C1.625 17.799 6.32601 22.5 12.125 22.5C17.924 22.5 22.625 17.799 22.625 12C22.625 6.20101 17.924 1.5 12.125 1.5ZM10.4024 7.58398C10.2489 7.48169 10.0517 7.47215 9.88907 7.55916C9.72649 7.64617 9.625 7.8156 9.625 8V16C9.625 16.1844 9.72649 16.3538 9.88907 16.4408C10.0517 16.5278 10.2489 16.5183 10.4024 16.416L16.4023 12.416C16.5414 12.3233 16.625 12.1672 16.625 12C16.625 11.8328 16.5414 11.6767 16.4023 11.584L10.4024 7.58398ZM15.2236 12L10.625 15.0657V8.93426L15.2236 12Z'
        fill={
          // select ? 'url(#myGradient)' :
          '#ffffff'
        }
      />
    </svg>
  );
};

const SwapCircleSvg: FC<SvgProps> = () => {
  return (
    <svg
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      width='24px'
      height='24px'
      viewBox='0,0,256,256'
    >
      <g fill='#ffffff' fillRule='nonzero'>
        <g transform='scale(10.66667,10.66667)'>
          <path d='M12,2c-2.75258,0 -5.2556,1.12332 -7.06641,2.93359l-1.93359,-1.93359v5h5l-1.6543,-1.6543c1.44833,-1.44973 3.44456,-2.3457 5.6543,-2.3457c4.41948,0 8,3.58052 8,8h2c0,-5.50452 -4.49548,-10 -10,-10zM11.71289,5.59961v1.42773c-0.339,0.043 -2.23633,0.40141 -2.23633,2.69141c0,3.341 3.45898,2.35108 3.45898,4.58008c0,1.116 -0.72214,1.14258 -0.86914,1.14258c-0.134,0 -1.01367,0.07128 -1.01367,-1.63672h-1.89062c0,2.892 2.09816,3.12302 2.41016,3.16602v1.33008h1.00195v-1.33008c0.338,-0.042 2.25,-0.35755 2.25,-2.68555c0,-3.205 -3.45798,-2.59159 -3.45898,-4.55859c0,-1.127 0.61991,-1.16211 0.75391,-1.16211c0.245,0 0.82813,0.21684 0.82813,1.58984h1.89063c0,-2.627 -1.79619,-3.03666 -2.11719,-3.09766v-1.45703zM2,12c0,5.50452 4.49548,10 10,10c2.75258,0 5.2556,-1.12332 7.06641,-2.93359l1.93359,1.93359v-5h-5l1.6543,1.6543c-1.44833,1.44973 -3.44456,2.3457 -5.6543,2.3457c-4.41948,0 -8,-3.58052 -8,-8z'></path>
        </g>
      </g>
    </svg>
  );
};

const UserSvg: FC<SvgProps> = () => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8.625 7C8.625 5.067 10.192 3.5 12.125 3.5C14.058 3.5 15.625 5.067 15.625 7C15.625 8.933 14.058 10.5 12.125 10.5C10.192 10.5 8.625 8.933 8.625 7ZM12.125 2.5C9.63972 2.5 7.625 4.51472 7.625 7C7.625 9.48528 9.63972 11.5 12.125 11.5C14.6103 11.5 16.625 9.48528 16.625 7C16.625 4.51472 14.6103 2.5 12.125 2.5ZM8.125 14.5C6.93153 14.5 5.78693 14.9741 4.94302 15.818C4.09911 16.6619 3.625 17.8065 3.625 19V21C3.625 21.2761 3.84886 21.5 4.125 21.5C4.40114 21.5 4.625 21.2761 4.625 21V19C4.625 18.0717 4.99375 17.1815 5.65013 16.5251C6.3065 15.8687 7.19674 15.5 8.125 15.5H16.125C17.0533 15.5 17.9435 15.8687 18.5999 16.5251C19.2563 17.1815 19.625 18.0717 19.625 19V21C19.625 21.2761 19.8489 21.5 20.125 21.5C20.4011 21.5 20.625 21.2761 20.625 21V19C20.625 17.8065 20.1509 16.6619 19.307 15.818C18.4631 14.9741 17.3185 14.5 16.125 14.5H8.125Z'
        fill={
          // select ? 'url(#myGradient)' :
          '#ffffff'
        }
      />
    </svg>
  );
};
