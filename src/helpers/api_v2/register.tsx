import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useGetLoginInfo } from '@multiversx/sdk-dapp/hooks/account/useGetLoginInfo';
import { mid_api_v2 } from 'config';

export const useGetRegister = () => {
  const [isGetRegister, setRegister] = useState<any>(false);
  const { tokenLogin, isLoggedIn } = useGetLoginInfo();
  const [message, setMessage] = useState<any>('');

  const getRegister = async () => {
    if (tokenLogin) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${tokenLogin.nativeAuthToken}`
          }
        };

        const { data } = await axios.get(mid_api_v2 + '/register', config);

        setRegister(data);
        if (data.message) setMessage(data.message);
        console.log('get register : ', data);
      } catch (err) {
        console.error('Unable to call getRegister', err);
      }
    }
  };

  useEffect(() => {
    getRegister();
  }, [isLoggedIn]);

  return { isGetRegister, message };
};

export const usePostRegister = () => {
  const [isRegister, setRegister] = useState<any>(false);
  const { tokenLogin, isLoggedIn } = useGetLoginInfo();

  const postRegister = async () => {
    if (tokenLogin) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${tokenLogin.nativeAuthToken}`
          }
        };
        console.log('conf', config);

        const { data } = await axios.post(mid_api_v2 + '/register', {}, config);
        setRegister(data);
        console.log('post register : ', data);
      } catch (err) {
        console.error('Unable to call postRegister', err);
      }
    }
  };

  return { postRegister, isRegister, isLoggedIn };
};

const RegisterForm = () => {
  const { postRegister, isRegister, isLoggedIn } = usePostRegister();
  const { isGetRegister, message } = useGetRegister();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postRegister();
  };

  return (
    <div
      style={{
        margin: 'auto',
        marginTop: '50px',
        width: '100%',
        background:
          'linear-gradient(0deg, rgba(99, 74, 203, 0.32), rgba(99, 74, 203, 0.32)), linear-gradient(rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%)',
        borderRadius: '8px 8px 0px 0px',
        borderWidth: '1px',
        borderImage:
          'linear-gradient(rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%) 1 / 1 / 0 stretch',
        padding: '24px 24px 12px',
        gap: '18px',
        alignItems: 'center',
        justifyContent: 'flex-start',
        alignSelf: 'stretch',
        flexShrink: '0',
        position: 'relative',
        overflow: 'hidden',
        color: 'white'
      }}
    >
      {!isGetRegister ? (
        <form onSubmit={handleSubmit}>
          {' '}
          <>
            Join our exclusive giveaway! Stake at least 1 EGLD, register, and
            get a chance to win a Dinovox Trias Freemint or one of 10 Whitelist
            spots.
            <a
              target='_BLANK'
              rel='noreferrer'
              href='https://medium.com/dinovox/mint-trias-dinovox-d%C3%A9tails-dates-et-conditions-0453ad86502a'
            >
              <svg
                width='24px'
                height='24px'
                viewBox='0 0 24 24'
                className='cursor:pointer'
              >
                <g
                  stroke-width='2.1'
                  stroke='#666'
                  fill='none'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                >
                  <polyline points='17 13.5 17 19.5 5 19.5 5 7.5 11 7.5'></polyline>
                  <path d='M14,4.5 L20,4.5 L20,10.5 M20,4.5 L11,13.5'></path>
                </g>
              </svg>
            </a>
          </>
          <br />
          <br />
          {!isRegister && isLoggedIn && <button type='submit'>Register</button>}
          {message && <div>{message}</div>}
        </form>
      ) : (
        <>
          You're already registered! Keep your EGLD staked and stay tuned for
          the chance to win a Dinovox Trias Freemint or one of 10 Whitelist
          spots. Winners will be announced on{' '}
          <a
            target='_BLANK'
            rel='noreferrer'
            href='https://x.com/MiddleStaking'
            style={{ color: 'white' }}
          >
            𝕏
          </a>
        </>
      )}
      {isRegister && (
        <p>
          Registration successful! Winners will be announced on{' '}
          <a
            target='_BLANK'
            rel='noreferrer'
            href='https://x.com/MiddleStaking'
            style={{ color: 'white' }}
          >
            𝕏
          </a>
        </p>
      )}
    </div>
  );
};

export default RegisterForm;
