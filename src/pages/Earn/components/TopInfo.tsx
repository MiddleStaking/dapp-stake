import * as React from 'react';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { FormatAmount } from '@multiversx/sdk-dapp/UI/FormatAmount';
import { contractAddress } from 'config';
import { useGetStakedTokens } from './Actions/helpers';

export const TopInfo = () => {
  const stakedTokens = useGetStakedTokens();

  return (
    <div className='text-white' data-testid='topInfo'>
      <div className='mb-4'>
        <span className='opacity-6 mr-1'>Contract address:</span>
        <span data-testid='contractAddress'> {contractAddress}</span>
      </div>

      {stakedTokens.map((stoken) => (
        <ul key={stoken}>{stoken} </ul>
      ))}
    </div>
  );
};
