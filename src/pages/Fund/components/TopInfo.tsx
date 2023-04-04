import * as React from 'react';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { contractAddress } from 'config';
export const TopInfo = () => {
  return (
    <div className='text-white' data-testid='topInfo'>
      <div className='mb-4'>
        <span className='opacity-6 mr-1'>Contract address:</span>
        <span data-testid='contractAddress'> {contractAddress}</span>
      </div>

      <div className='alert alert-danger'>
        {' '}
        <FontAwesomeIcon icon={faTriangleExclamation} size='2x' /> <br />
        This interface allow the deposit of tokens into a staking pool that will
        be distributed as rewards.
        <br /> Once deposited, the tokens{' '}
        <u>
          <b>cannot be withdrawn</b>
        </u>
        .
        <br /> Users will be then able to stake the <u>Staked token</u> and gain
        the <u>Rewarded token</u> over time.
      </div>
    </div>
  );
};
