import React from 'react';
import { ReactComponent as HeartIcon } from '../../../assets/img/heart.svg';
import { ReactComponent as GitHub } from '../../../assets/img/github.svg';

export const Footer = () => {
  return (
    <footer className='text-center mt-2 mb-3'>
      <div>
        <a
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
            margin: '0px',
            padding: '0px',
            width: '15px',
            display: 'inline-flex'
          }}
        >
          <GitHub className='navIcon' />
        </a>
      </div>
    </footer>
  );
};
