import React from 'react';
import { ReactComponent as HeartIcon } from '../../../assets/img/heart.svg';
import { ReactComponent as GitHub } from '../../../assets/img/github.svg';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Footer = () => {
  return (
    <footer className='text-center footer'>
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
        </a>{' '}
        <a
          {...{
            target: '_blank'
          }}
          className='align-items-center'
          href='https://docs.middlestaking.fr'
          style={{
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
  );
};
