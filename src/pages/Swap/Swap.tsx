import React, { useEffect, useState } from 'react';

import { getTransactions } from '@multiversx/sdk-dapp/apiCalls';

import {
  useGetAccount,
  useGetActiveTransactionsStatus,
  useGetNetworkConfig
} from '@multiversx/sdk-dapp/hooks';

import { ServerTransactionType } from '@multiversx/sdk-dapp/types';
import { TransactionsTable, Loader, PageState } from '@multiversx/sdk-dapp/UI';
import { faBan, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { AxiosError } from 'axios';

import {
  apiTimeout,
  contractSwap,
  defaultToken,
  transactionSize
} from 'config';
import { SwapLayout } from './components';
import { useGetUserESDT } from './components/Actions/helpers/useGetUserESDT';
import { useGetAllLp, useGetSwapedTokens } from './components/Actions/helpers';
import { network } from 'config';

const SwapPage = ({ children }: React.PropsWithChildren) => {
  // const {
  //   network: { apiAddress }
  // } = useGetNetworkConfig();
  const { address } = useGetAccount();
  const { success, fail } = useGetActiveTransactionsStatus();
  const allLp = useGetAllLp();

  const [transactions, setTransactions] = useState<ServerTransactionType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      const { data } = await getTransactions({
        apiAddress: network.apiAddress,
        sender: address,
        receiver: contractSwap,
        condition: 'must',
        transactionSize,
        apiTimeout
      });
      setTransactions(data);
    } catch (err) {
      const { message } = err as AxiosError;
      setError(message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (success || fail) {
      fetchTransactions();
    }
  }, [success, fail]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className='my-5'>
        <PageState
          icon={faBan}
          className='text-muted'
          title='Error fetching transactions.'
        />
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className='my-5'>
        <PageState
          icon={faExchangeAlt}
          className='text-muted'
          title='No Transactions'
        />
      </div>
    );
  }

  return <TransactionsTable transactions={transactions} />;
};

export const Swap = () => {
  const userEsdtBalance = useGetUserESDT();
  const all_lp: any[] = useGetAllLp();
  return (
    <SwapLayout
      userEsdtBalance={userEsdtBalance}
      all_lp={all_lp}
      firstToken={'WEGLD-bd4d79'}
      secondToken={defaultToken}
      defaultToken={defaultToken}
    />
  );
};
