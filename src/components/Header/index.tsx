import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { defaultToken } from 'config';
import { routeNames } from 'routes';
import { useWindowDimensions } from 'components/DimensionScreen';
import { Button } from 'components/Design/Button';
import Logo from 'assets/Logo';
// import { ReactComponent as MiddleLogo } from '../../../assets/img/ms.svg';
import { ReactComponent as MiddleLogo } from '../../assets/img/ms.svg';
import LogoText from 'assets/LogoMiddleS';
import LogoTextMobile from 'assets/LogoMiddleSMobile';

// interface DropdownMenuProps {}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '111px',
    background: 'transparent',
    width: '100%'
  },
  headerMobile: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '64px',
    width: '100%',
    background:
      'linear-gradient(180deg, rgba(133, 114, 207, 0.24) 0%, rgba(162, 150, 208, 0) 100%),linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1))',
    border: ' 1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '0px 0px 16px 16px'
  },
  headerLogo: {
    height: '100%',
    width: '20%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
  },
  headerMenu: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '75%',
    overflow: 'hidden',
    borderRadius: '0px 0px 10px 10px',
    borderTop: '1px solid #FFFFFF1A',
    borderRight: '1px solid rgb(73 68 89)'
  },
  styleGauche: {
    background:
      'linear-gradient(180deg, rgba(133, 114, 207, 0.24) 0%, rgba(162, 150, 208, 0) 100%),linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1))',

    // background:
    //   'linear-gradient(180deg, rgba(133, 114, 207, 0.24) 0%, rgba(162, 150, 208, 0) 100%),linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1))',
    transform: 'skew(30deg)',
    transformOrigin: 'top left',
    height: '100%',
    width: '100%',
    borderRadius: '0px 0px 10px 10px',
    borderLeft: '1px solid #FFFFFF1A',
    borderBottom: '1px solid #FFFFFF1A'
  },
  styleDroit: {
    height: '100%',
    paddingRight: '2%',
    paddingLeft: '10%',
    transform: 'skew(-30deg)',
    transformOrigin: 'top left',
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'end'
  }
};

const defaultButtonProps = {
  background: 'transparent',
  fontFamily: '',
  buttonHeight: '52px',
  fontSize: '16px'
};
const HeaderDesktop = () => {
  const { width } = useWindowDimensions();
  const navigate = useNavigate();

  const handleNavigate = (path: any) => {
    navigate(path);
  };

  return width > 450 ? (
    <div style={styles.header}>
      <div
        onClick={() => handleNavigate(routeNames.stake + '/' + defaultToken)}
        style={styles.headerLogo}
      >
        <LogoText />
      </div>
      <div style={styles.headerMenu}>
        <div style={styles.styleGauche}>
          <div style={styles.styleDroit}>
            <Button
              {...defaultButtonProps}
              text='Staking'
              onClick={() =>
                handleNavigate(routeNames.stake + '/' + defaultToken)
              }
            />
            <Button
              {...defaultButtonProps}
              text='Dashboard'
              onClick={() => handleNavigate(routeNames.dashboard)}
            />
            <Button
              {...defaultButtonProps}
              text='Play'
              onClick={() => handleNavigate(routeNames.play)}
            />
            <Button
              boxShadow='0px 0px 44px 0px #8E44EB80 inset'
              borderWidth='2px'
              borderRadius={40}
              background='black'
              borderColor={['#BD37EC', '#1F67FF']}
              text='Account'
              hasBorder={true}
              onClick={() => handleNavigate(routeNames.home)}
              fontFamily=''
              buttonHeight='52px'
              fontSize='20px'
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div style={styles.headerMobile}>
      <LogoTextMobile />
    </div>
  );
};

export default HeaderDesktop;

interface DLogSvgProps {
  widthSvg?: string;
  heightSvg?: string;
  colorSvg?: string;
}

const LogoSvg: FC<DLogSvgProps> = ({ widthSvg = '16px' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={widthSvg}
      height={42}
      fill='none'
    >
      <mask
        id='a'
        width={22}
        height={16}
        x={0}
        y={14}
        maskUnits='userSpaceOnUse'
        style={{
          maskType: 'luminance'
        }}
      >
        <path
          fill='#fff'
          d='M9.799 14.877s-3.973-.891-5.858-.155C1.35 15.734.562 18.602 0 20c.471 1.216 2.47 2.335 4.06 2.919l17.108 6.262.094-9.406L9.8 14.877Z'
        />
      </mask>
      <g mask='url(#a)'>
        <path fill='url(#b)' d='M21.262 13.986H0V29.18h21.262V13.986Z' />
      </g>
      <mask
        id='c'
        width={22}
        height={20}
        x={0}
        y={0}
        maskUnits='userSpaceOnUse'
        style={{
          maskType: 'luminance'
        }}
      >
        <path
          fill='#fff'
          d='M6.077 6.335C2.867 7.585 0 8.763 0 11.355V20c.97-2.415 9.799-5.123 9.799-5.123l11.305-4.063L21.17.5 6.077 6.335Z'
        />
      </mask>
      <g mask='url(#c)'>
        <path fill='url(#d)' d='M21.17.5H0V20h21.17V.5Z' />
      </g>
      <mask
        id='e'
        width={22}
        height={20}
        x={0}
        y={20}
        maskUnits='userSpaceOnUse'
        style={{
          maskType: 'luminance'
        }}
      >
        <path
          fill='#fff'
          d='M15.185 33.665c3.21-1.25 6.077-2.428 6.077-5.02V20c-.97 2.415-9.798 5.123-9.798 5.123L.159 29.186.092 39.5l15.093-5.835Z'
        />
      </mask>
      <g mask='url(#e)'>
        <path fill='url(#f)' d='M21.262 20H.092v19.5h21.17V20Z' />
      </g>
      <path
        fill='#fff'
        d='M37.63 18V3.845h2.47l5.301 7.201h-1.178l5.187-7.201h2.47V18h-2.603V6.79l1.007.247-5.377 7.163h-.304L39.36 7.037l.855-.247V18H37.63Zm16.75 0V7.664h2.49V18h-2.49Zm0-11.495v-2.66h2.49v2.66h-2.49Zm9.594 11.723c-1 0-1.893-.234-2.679-.703a5.217 5.217 0 0 1-1.862-1.957c-.456-.823-.684-1.735-.684-2.736 0-1.013.228-1.925.684-2.736a5.258 5.258 0 0 1 1.862-1.938 5.051 5.051 0 0 1 2.66-.722c.786 0 1.482.158 2.09.475.621.304 1.109.735 1.463 1.292l-.38.513V3.617h2.49V18H67.26v-1.995l.266.494a3.514 3.514 0 0 1-1.482 1.292 4.896 4.896 0 0 1-2.07.437Zm.266-2.28c.57 0 1.07-.133 1.501-.399.431-.266.767-.633 1.007-1.102.254-.469.38-1.007.38-1.615 0-.595-.126-1.127-.38-1.596a2.706 2.706 0 0 0-1.007-1.121c-.43-.266-.93-.399-1.5-.399-.558 0-1.058.14-1.502.418a2.824 2.824 0 0 0-1.045 1.102c-.24.456-.36.988-.36 1.596 0 .608.12 1.146.36 1.615.254.469.602.836 1.045 1.102a2.86 2.86 0 0 0 1.501.399Zm12.5 2.28c-1 0-1.894-.234-2.68-.703a5.217 5.217 0 0 1-1.861-1.957c-.456-.823-.684-1.735-.684-2.736 0-1.013.228-1.925.684-2.736a5.258 5.258 0 0 1 1.862-1.938 5.051 5.051 0 0 1 2.66-.722c.785 0 1.482.158 2.09.475.62.304 1.108.735 1.463 1.292l-.38.513V3.617h2.489V18h-2.356v-1.995l.266.494a3.513 3.513 0 0 1-1.482 1.292 4.896 4.896 0 0 1-2.071.437Zm.266-2.28c.57 0 1.07-.133 1.5-.399.432-.266.767-.633 1.008-1.102.253-.469.38-1.007.38-1.615 0-.595-.127-1.127-.38-1.596a2.706 2.706 0 0 0-1.007-1.121c-.43-.266-.931-.399-1.501-.399-.557 0-1.058.14-1.501.418a2.825 2.825 0 0 0-1.045 1.102c-.24.456-.361.988-.361 1.596 0 .608.12 1.146.36 1.615.254.469.603.836 1.046 1.102a2.86 2.86 0 0 0 1.5.399ZM84.699 18V3.617h2.489V18h-2.49Zm9.689.228c-1.064 0-1.995-.24-2.793-.722a5.029 5.029 0 0 1-1.862-1.957c-.444-.823-.665-1.735-.665-2.736 0-1.039.221-1.957.665-2.755a5.158 5.158 0 0 1 1.843-1.919c.785-.469 1.659-.703 2.622-.703.81 0 1.52.133 2.128.399.62.266 1.146.633 1.577 1.102.43.469.76 1.007.988 1.615.228.595.342 1.241.342 1.938 0 .177-.013.361-.038.551-.013.19-.045.355-.095.494h-7.98v-1.9h6.574l-1.178.893c.114-.583.082-1.102-.095-1.558a2.16 2.16 0 0 0-.836-1.083c-.38-.266-.843-.399-1.387-.399-.52 0-.982.133-1.387.399-.406.253-.716.633-.931 1.14-.203.494-.279 1.096-.228 1.805-.051.633.031 1.197.247 1.691.228.481.557.855.988 1.121.443.266.95.399 1.52.399.57 0 1.051-.12 1.444-.361.405-.24.722-.564.95-.969l2.014.988a3.52 3.52 0 0 1-.95 1.311c-.431.38-.944.678-1.54.893a5.555 5.555 0 0 1-1.937.323Zm-51.704 19a6.33 6.33 0 0 1-2.508-.494 6.008 6.008 0 0 1-1.976-1.368 5.556 5.556 0 0 1-1.197-2.071l2.147-.931c.342.81.836 1.45 1.482 1.919a3.698 3.698 0 0 0 2.185.684c.456 0 .849-.07 1.178-.209.342-.152.602-.355.78-.608.19-.253.284-.557.284-.912 0-.418-.127-.76-.38-1.026-.24-.279-.608-.494-1.102-.646l-2.717-.874c-1.102-.342-1.931-.855-2.489-1.539-.557-.684-.836-1.488-.836-2.413 0-.81.197-1.526.59-2.147a4.047 4.047 0 0 1 1.671-1.444c.722-.355 1.546-.532 2.47-.532.849 0 1.628.152 2.337.456.71.291 1.317.703 1.824 1.235.52.52.906 1.134 1.16 1.843l-2.129.95c-.279-.71-.697-1.254-1.254-1.634-.557-.393-1.203-.589-1.938-.589-.43 0-.81.076-1.14.228-.33.14-.589.342-.779.608a1.55 1.55 0 0 0-.266.912c0 .393.127.741.38 1.045.254.291.64.52 1.16.684l2.602.817c1.127.367 1.97.874 2.527 1.52.57.646.855 1.444.855 2.394 0 .81-.209 1.526-.627 2.147-.418.62-.994 1.108-1.729 1.463-.735.355-1.59.532-2.565.532Zm11.751-.114c-1.165 0-2.071-.317-2.717-.95-.633-.646-.95-1.552-.95-2.717v-4.56h-1.786v-2.223h.19c.507 0 .9-.133 1.178-.399.279-.266.418-.652.418-1.159v-.798h2.489v2.356h2.375v2.223h-2.375v4.427c0 .342.057.633.171.874.127.24.317.424.57.551.266.127.602.19 1.007.19.089 0 .19-.006.304-.019l.361-.038V37c-.177.025-.38.05-.608.076a5.721 5.721 0 0 1-.627.038Zm6.234.114c-.721 0-1.348-.12-1.88-.361-.532-.24-.944-.583-1.236-1.026-.29-.456-.436-.982-.436-1.577 0-.57.126-1.077.38-1.52.253-.456.645-.836 1.178-1.14.532-.304 1.203-.52 2.014-.646l3.381-.551v1.9l-2.906.494c-.495.089-.862.247-1.102.475-.241.228-.361.526-.361.893 0 .355.133.64.398.855.28.203.621.304 1.027.304.519 0 .975-.108 1.367-.323a2.35 2.35 0 0 0 .931-.931c.229-.393.343-.823.343-1.292v-2.66c0-.443-.178-.81-.533-1.102-.342-.304-.797-.456-1.367-.456-.532 0-1.008.146-1.425.437a2.441 2.441 0 0 0-.894 1.121l-2.032-.988c.202-.545.519-1.013.95-1.406a4.857 4.857 0 0 1 1.557-.95 5.374 5.374 0 0 1 1.938-.342c.85 0 1.596.158 2.243.475.646.304 1.146.735 1.5 1.292.368.545.552 1.184.552 1.919V37H63.9v-1.767l.532-.038a4.33 4.33 0 0 1-.95 1.121c-.368.291-.786.52-1.255.684a5.03 5.03 0 0 1-1.557.228ZM68.556 37V22.617h2.489v9.424l-.95-.285 4.864-5.092h3.097l-3.819 4.161L78.132 37h-2.85L71.9 31.642l1.482-.304-3.116 3.344.779-1.52V37h-2.489Zm10.966 0V26.664h2.489V37h-2.49Zm0-11.495v-2.66h2.489v2.66h-2.49ZM84.309 37V26.664h2.337v2.033l-.19-.361c.24-.62.633-1.09 1.178-1.406.557-.33 1.203-.494 1.938-.494.76 0 1.431.165 2.014.494a3.48 3.48 0 0 1 1.387 1.387c.33.583.494 1.26.494 2.033V37h-2.49v-6.061c0-.456-.088-.849-.265-1.178a1.862 1.862 0 0 0-.741-.76c-.304-.19-.665-.285-1.083-.285-.405 0-.766.095-1.083.285-.317.177-.564.43-.741.76-.177.33-.266.722-.266 1.178V37h-2.49Zm16.279 4.18a5.933 5.933 0 0 1-2.147-.38 5.135 5.135 0 0 1-1.71-1.064 3.96 3.96 0 0 1-1.026-1.577l2.318-.874c.152.481.45.868.893 1.159.456.304 1.013.456 1.672.456.506 0 .95-.095 1.33-.285a2.09 2.09 0 0 0 .912-.836c.215-.355.323-.785.323-1.292v-2.356l.475.57c-.355.62-.83 1.09-1.425 1.406-.596.317-1.273.475-2.033.475-.963 0-1.824-.222-2.584-.665a4.751 4.751 0 0 1-1.786-1.824c-.431-.773-.646-1.64-.646-2.603 0-.975.215-1.843.646-2.603a4.693 4.693 0 0 1 1.767-1.786c.747-.443 1.596-.665 2.546-.665.772 0 1.45.165 2.033.494a3.98 3.98 0 0 1 1.482 1.387l-.342.627v-2.28h2.356v9.823c0 .9-.222 1.704-.665 2.413a4.549 4.549 0 0 1-1.786 1.672c-.748.405-1.615.608-2.603.608Zm-.114-6.897c.532 0 .994-.114 1.387-.342.405-.24.722-.57.95-.988.228-.418.342-.9.342-1.444a2.81 2.81 0 0 0-.361-1.425 2.514 2.514 0 0 0-.95-1.007c-.393-.24-.849-.361-1.368-.361-.52 0-.988.12-1.406.361-.418.24-.748.576-.988 1.007a2.927 2.927 0 0 0-.342 1.425c0 .532.114 1.007.342 1.425.24.418.563.747.969.988.418.24.893.361 1.425.361Z'
      />
      <defs>
        <linearGradient
          id='b'
          x1={8.162}
          x2={21.45}
          y1={23.893}
          y2={14.15}
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#818492' />
          <stop offset={0} stopColor='#818492' />
          <stop offset={1} stopColor='#E0E5F2' />
        </linearGradient>
        <linearGradient
          id='d'
          x1={-0.679}
          x2={24.064}
          y1={16.625}
          y2={2.621}
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#AAB1C5' />
          <stop offset={1} stopColor='#fff' />
        </linearGradient>
        <linearGradient
          id='f'
          x1={21.941}
          x2={-2.801}
          y1={23.375}
          y2={37.379}
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#AEC1D6' />
          <stop offset={1} stopColor='#fff' />
        </linearGradient>
      </defs>
    </svg>
  );
};

// background: linear-gradient(0deg, #000000, #000000),
// linear-gradient(90deg, #BD37EC 0%, #1F67FF 100%);
