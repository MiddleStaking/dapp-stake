import * as React from 'react';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import axios from 'axios';
import { Col, Form, Row } from 'react-bootstrap';
import { logout } from '@multiversx/sdk-dapp/utils';
import { Button } from 'components/Design/Button';
import { useNavigate } from 'react-router-dom';
import { routeNames } from 'routes';
import { useGetUserESDT } from './../Earn/components/Actions/helpers/useGetUserESDT';

const Account = () => {
  const userEsdtBalance = useGetUserESDT();

  const handleLogout = () => {
    logout(`${window.location.origin}/unlock`);
  };
  const navigate = useNavigate();
  const handleNavigate = (path: any) => {
    navigate(path);
  };
  const accountInfo = useGetAccountInfo();
  const address = accountInfo.address;
  const { network } = useGetNetworkConfig();
  const [faddress, setAddress] = React.useState(
    address === null ? '' : address
  );
  const [amount, setAmount] = React.useState(1);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  React.useEffect(() => {
    setAddress(address === null ? '' : address);
  }, [address]);

  console.log(accountInfo);
  console.log(userEsdtBalance);
  const explorer =
    network.id == 'devnet'
      ? 'https://devnet-explorer.multiversx.com/accounts/'
      : 'https://explorer.multiversx.com/accounts/';
  return (
    <div className='container py-4 text-white'>
      <Button
        buttonWidth='100%'
        buttonHeight='52px'
        fontSize='20px'
        borderWidth='2px'
        borderRadius={40}
        background='black'
        borderColor={['#BD37EC', '#1F67FF']}
        text={address}
        hasBorder={true}
        onClick={() => open(explorer + address)}
      />
      <Button
        buttonHeight='52px'
        fontSize='20px'
        borderWidth='2px'
        borderRadius={40}
        background='black'
        borderColor={['#BD37EC', '#1F67FF']}
        text='Disconnect'
        hasBorder={true}
        onClick={handleLogout}
      />
      {network.id == 'devnet' && (
        <Button
          boxShadow='0px 0px 44px 0px #8E44EB80 inset'
          borderWidth='2px'
          borderRadius={40}
          background='black'
          borderColor={['#BD37EC', '#1F67FF']}
          text={'Faucet'}
          hasBorder={true}
          onClick={() => handleNavigate(routeNames.faucet)}
          fontFamily=''
          buttonHeight='52px'
          fontSize='20px'
        />
      )}
      <Button
        boxShadow='0px 0px 44px 0px #8E44EB80 inset'
        borderWidth='2px'
        borderRadius={40}
        background='black'
        borderColor={['#BD37EC', '#1F67FF']}
        text={'Rewards'}
        hasBorder={true}
        onClick={() => handleNavigate(routeNames.rewards)}
        fontFamily=''
        buttonHeight='52px'
        fontSize='20px'
      />
      <Button
        boxShadow='0px 0px 44px 0px #8E44EB80 inset'
        borderWidth='2px'
        borderRadius={40}
        background='black'
        borderColor={['#BD37EC', '#1F67FF']}
        text={'Tokenomics'}
        hasBorder={true}
        onClick={() => handleNavigate(routeNames.tokenomics)}
        fontFamily=''
        buttonHeight='52px'
        fontSize='20px'
      />
      <Button
        boxShadow='0px 0px 44px 0px #8E44EB80 inset'
        borderWidth='2px'
        borderRadius={40}
        background='black'
        borderColor={['#BD37EC', '#1F67FF']}
        text={'Docs'}
        hasBorder={true}
        onClick={() =>
          open('https://docs.middlestaking.fr/welcome/presentation')
        }
        fontFamily=''
        buttonHeight='52px'
        fontSize='20px'
      />
      {network.id != 'devnet' && (
        <Button
          boxShadow='0px 0px 44px 0px #8E44EB80 inset'
          borderWidth='2px'
          borderRadius={40}
          background='black'
          borderColor={['#BD37EC', '#1F67FF']}
          text={'Devnet'}
          hasBorder={true}
          onClick={() => open('https://devnet-app.middlestaking.fr/')}
          fontFamily=''
          buttonHeight='52px'
          fontSize='20px'
        />
      )}
    </div>
  );
};

export default Account;
