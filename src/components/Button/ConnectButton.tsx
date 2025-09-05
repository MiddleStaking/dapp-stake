import { RouteNamesEnum } from 'localConstants';
// import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'components/Design/Button';
import { routeNames } from 'routes';
export function ConnectButton() {
  const location = useLocation();
  // const { t } = useTranslation();
  const navigate = useNavigate();

  const fullPath = location.pathname + location.search + location.hash;
  const go = (to: string, withState = true) => {
    if (withState) {
      navigate(to, { state: { background: location, returnTo: fullPath } });
    } else {
      navigate(to); // navigation normale, pas de background
    }
  };
  return (
    <Button
      // boxShadow='0px 0px 44px 0px #8E44EB80 inset'
      borderWidth='2px'
      borderRadius={40}
      background='black'
      // borderColor={['#BD37EC', '#1F67FF']}
      text={'Login'}
      hasBorder={true}
      onClick={() => go(routeNames.unlock, true)}
      fontFamily=''
      buttonHeight='31px'
      buttonWidth='240px'
    />
  );
}

// <Button
//             borderRadius={40}
//             buttonHeight='31px'
//             buttonWidth='240px'
//             textColor='#ffffff'
//             background={'#000000'}
//             onClick={() => navigate(routeNames.unlock)}
//             // onClick={() =>
//             //   navigate(
//             //     routeNames.unlock +
//             //       `/stake/${
//             //         staked_token !== undefined ? staked_token : defaultToken
//             //       }`
//             //   )
//             // }
//             text={'Login'}
//           />
