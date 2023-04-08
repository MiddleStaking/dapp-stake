import * as React from 'react';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import { contractPlay } from 'config';

export const TopInfo = () => {
  const { network } = useGetNetworkConfig();

  return (
    <div className='text-white' data-testid='topInfo'>
      <div className='mb-4'>
        <span className='opacity-6 mr-1'>Contract address:</span>
        <span data-testid='contractAddress'>
          <a
            className='text-white'
            href={network.explorerAddress + '/accounts/' + contractPlay}
            target='_blank'
            rel='noreferrer'
          >
            {contractPlay}
          </a>
        </span>
      </div>
    </div>
  );
};
