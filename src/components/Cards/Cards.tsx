import React, { useCallback, useEffect, ReactNode } from 'react';
import {
  faUsers,
  faServer,
  faLeaf,
  faReceipt,
  faArrowUp,
  faCog
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  decodeUnsignedNumber,
  ContractFunction,
  Address,
  Query,
  decodeString,
  DevnetEntrypoint,
  Abi
} from '@multiversx/sdk-core';
import {
  useGetAccount,
  useGetNetworkConfig,
  useGetPendingTransactions,
  useGetSuccessfulTransactions
} from 'lib';
import {
  ApiNetworkProvider,
  ProxyNetworkProvider
} from '@multiversx/sdk-network-providers';
import axios from 'axios';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';

import { MultiversX } from 'assets/MultiversX';
import { Action } from 'components/Action';
import { local_network, auctionContract } from 'config';
import { useGlobalContext, useDispatch } from 'context';
import { denominated } from 'helpers/denominate';
import getPercentage from 'helpers/getPercentage';

import { ChangeDelegationCap } from './components/ChangeDelegationCap';
import { ChangeServiceFee } from './components/ChangeServiceFee';

import calculateAnnualPercentage from './helpers/calculateAnnualPercentage';

import styles from './styles.module.scss';

interface CardType {
  label: string;
  colors: string[];
  data: {
    value?: string | null;
    percentage?: string | undefined;
  };
  title?: string;
  description?: string;
  modal?: ReactNode;
  icon: ReactNode;
}

export const Cards = () => {
  const {
    totalActiveStake,
    totalNetworkStake,
    usersNumber,
    nodesNumber,
    networkStatus,
    contractDetails,
    networkConfig
  } = useGlobalContext();
  const pending = useGetPendingTransactions();
  const hasPendingTransactions = pending.length > 0;
  const dispatch = useDispatch();
  const location = useLocation();
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccount();
  const entrypoint = new DevnetEntrypoint({
    url: local_network.gatewayCached
  });
  const contractAddress = Address.newFromBech32(
    local_network.delegationContract
  );
  const abi = Abi.create({
    endpoints: [
      {
        name: 'getNumUsers',
        inputs: [],
        outputs: [{ name: 'usersNumber', type: 'BigUint' }]
      }
    ]
  });
  const controller = entrypoint.createSmartContractController(abi);

  const getNetworkStatus = async (): Promise<void> => {
    dispatch({
      type: 'getNetworkStatus',
      networkStatus: {
        status: 'loading',
        data: null,
        error: null
      }
    });

    try {
      const [status, balance] = await Promise.all([
        new ProxyNetworkProvider(
          local_network.gatewayAddress
        ).getNetworkStatus(),
        axios.get(`${local_network.apiAddress}/accounts/${auctionContract}`)
      ]);

      dispatch({
        type: 'getNetworkStatus',
        networkStatus: {
          status: 'loaded',
          error: null,
          data: {
            ...status,
            Balance: balance.data.balance
          }
        }
      });
    } catch (error) {
      dispatch({
        type: 'getNetworkStatus',
        networkStatus: {
          status: 'error',
          data: null,
          error
        }
      });
    }
  };

  const getUsersNumber = async (): Promise<void> => {
    dispatch({
      type: 'getUsersNumber',
      usersNumber: {
        status: 'loading',
        data: null,
        error: null
      }
    });

    try {
      const response = await controller.query({
        contract: contractAddress,
        function: 'getNumUsers',
        arguments: []
      });

      // const provider = new ProxyNetworkProvider(local_network.gatewayAddress);
      // const query = new Query({
      //   address: new Address(local_network.delegationContract),
      //   func: new ContractFunction('getNumUsers')
      // });

      // const data = await provider.queryContract(query);
      // const [userNumber] = data.getReturnDataParts();

      dispatch({
        type: 'getUsersNumber',
        usersNumber: {
          status: 'loaded',
          data: response[0].toFixed(),
          error: null
        }
      });
    } catch (error) {
      console.error('getUsersNumber error', error);
      dispatch({
        type: 'getUsersNumber',
        usersNumber: {
          status: 'error',
          data: null,
          error
        }
      });
    }
  };

  const getTotalNetworkStake = async (): Promise<void> => {
    dispatch({
      type: 'getTotalNetworkStake',
      totalNetworkStake: {
        data: null,
        error: null,
        status: 'loading'
      }
    });

    try {
      const query = new ApiNetworkProvider(local_network.apiAddress, {
        timeout: 4000
      });

      const data = await query.getNetworkStakeStatistics();

      // Fallback/Patch for QueueSize issues
      if (!data.QueueSize || Number(data.QueueSize) === 0) {
        try {
          // Directly fetch from API to get waitingValidators
          const explicitStats = await axios.get(
            `${local_network.apiAddress}/stake`
          );
          if (explicitStats.data && explicitStats.data.waitingValidators) {
            // Patch the data object - handle potential type constraints or simply assign
            // @ts-ignore
            data.QueueSize = explicitStats.data.waitingValidators;
          }
        } catch (e) {
          console.error('Failed to patch QueueSize', e);
        }
      }

      dispatch({
        type: 'getTotalNetworkStake',
        totalNetworkStake: {
          status: 'loaded',
          error: null,
          data
        }
      });
    } catch (error) {
      dispatch({
        type: 'getTotalNetworkStake',
        totalNetworkStake: {
          status: 'error',
          data: null,
          error
        }
      });
    }
  };

  const getContractStakeData = useCallback(() => {
    if (!totalNetworkStake.data || !totalActiveStake.data) {
      const loading =
        totalNetworkStake.status === 'loading' ||
        totalActiveStake.status === 'loading';

      return {
        value: loading ? `... ${local_network.egldLabel}` : 'Stake Unknown',
        percentage: loading ? '...%' : 'Data Unavailable'
      };
    }

    const formatted = {
      stake: denominated(totalNetworkStake.data.TotalStaked.toFixed()),
      nodes: denominated(totalActiveStake.data)
    };

    return {
      value: `${formatted.nodes} ${local_network.egldLabel}`,
      percentage: `${getPercentage(
        formatted.nodes,
        formatted.stake
      )}% of total stake`
    };
  }, [totalNetworkStake, totalActiveStake.data]);

  const getNodesNumber = useCallback(() => {
    const total = Number(totalNetworkStake?.data?.TotalValidators ?? 0);
    const nodesData = nodesNumber?.data;

    if (!total || !nodesData) {
      const loading =
        totalNetworkStake?.status === 'loading' ||
        nodesNumber?.status === 'loading';

      return {
        value: loading ? '...' : 'Nodes Unknown',
        percentage: loading ? '...% of total nodes' : 'Data Unavailable'
      };
    }

    // Compte les noeuds stakés quelque soit la forme reçue
    const countStaked = (() => {
      // Cas 1: données déjà normalisées: [{ isStaked }, ...] ou [{ status: 'staked' }, ...]
      // if (
      //   Array.isArray(nodesData) &&
      //   nodesData.length &&
      //   typeof nodesData[0] === 'object' &&
      //   nodesData[0] !== null
      // ) {
      //   return nodesData.reduce((acc: number, item: any) => {
      //     if (typeof item.isStaked === 'boolean')
      //       return acc + (item.isStaked ? 1 : 0);
      //     if (typeof item.status === 'string')
      //       return acc + (item.status === 'staked' ? 1 : 0);
      //     return acc;
      //   }, 0);
      // }

      // Cas 2: flux brut Buffer[]: [bls, status, bls, status, ...]
      if (Array.isArray(nodesData)) {
        let cnt = 0;
        for (let i = 0; i + 1 < nodesData.length; i += 2) {
          const statusBuf = nodesData[i + 1];
          const status = decodeString(Buffer.from(statusBuf));
          if (status === 'staked') cnt++;
        }
        return cnt;
      }

      return 0;
    })();

    const value = String(countStaked);
    const percentageNum = total > 0 ? (countStaked / total) * 100 : 0;
    const percentage = `${percentageNum.toFixed(1)}% of total nodes`;

    return { value, percentage };
  }, [totalNetworkStake, nodesNumber]);

  const getDelegationCap = useCallback(() => {
    if (!contractDetails.data || !totalActiveStake.data) {
      const loading =
        totalActiveStake.status === 'loading' ||
        contractDetails.status === 'loading';

      return {
        value: loading ? `... ${local_network.egldLabel}` : 'Cap Unknown',
        percentage: loading ? '...%' : 'Data Unavailable'
      };
    }

    const formatted = {
      stake: denominated(totalActiveStake.data),
      value: denominated(contractDetails.data.delegationCap)
    };

    return {
      value: `${formatted.value} ${local_network.egldLabel}`,
      percentage: `${getPercentage(formatted.stake, formatted.value)}% filled`
    };
  }, [totalActiveStake.data, contractDetails.data]);

  const getAnnualPercentage = () => {
    const dependencies = [
      totalActiveStake,
      nodesNumber,
      networkStatus,
      totalNetworkStake,
      networkConfig,
      contractDetails
    ];

    if (dependencies.some((dependency) => dependency.status === 'loading')) {
      return '...%';
    }

    if (dependencies.every((dependency) => dependency.data)) {
      const percentage = calculateAnnualPercentage({
        activeStake: totalActiveStake.data,
        blsKeys: nodesNumber.data,
        networkStatus: networkStatus.data,
        networkStake: totalNetworkStake.data,
        networkConfig: networkConfig.data,
        serviceFee: parseFloat(
          contractDetails.data
            ? contractDetails.data.serviceFee.replace('%', '')
            : '0'
        )
      });

      return `${percentage}%`;
    }

    return 'Unknown APR';
  };

  const cards: CardType[] = [
    {
      label: 'Contract Stake',
      data: getContractStakeData(),
      colors: ['#2044F5', '#1B37C0'],
      icon: <MultiversX />
    },
    {
      label: 'Number of Users',
      colors: ['#6CADEF', '#5B96D2'],
      icon: <FontAwesomeIcon icon={faUsers} />,
      data: {
        value:
          usersNumber.status !== 'loaded'
            ? usersNumber.error
              ? 'Data Unavailable'
              : '...'
            : usersNumber.data
      }
    },
    {
      label: 'Number of Nodes',
      icon: <FontAwesomeIcon icon={faServer} />,
      colors: ['#36CA8C', '#2BA572'],
      data: getNodesNumber()
    },
    {
      label: 'Computed APR',
      colors: ['#FBC34C', '#D49712'],
      icon: <FontAwesomeIcon icon={faLeaf} />,
      data: {
        value: getAnnualPercentage(),
        percentage: 'Including Service Fee'
      }
    },
    {
      label: 'Service Fee',
      modal: <ChangeServiceFee />,
      icon: <FontAwesomeIcon icon={faReceipt} />,
      title: 'Change service fee',
      colors: ['#F3BF89', '#B68350'],
      data: {
        value: contractDetails.data
          ? contractDetails.data.serviceFee
          : contractDetails.error
          ? 'Service Fee Unknown'
          : '...%'
      }
    },
    {
      label: 'Delegation Cap',
      modal: <ChangeDelegationCap />,
      description: `The delegation cap is the maximum amount of ${local_network.egldLabel} your agency can stake from delegators.`,
      title: 'Delegation Cap',
      icon: <FontAwesomeIcon icon={faArrowUp} />,
      colors: ['#E48570', '#C25C45'],
      data: getDelegationCap()
    }
  ];

  const fetchNetworkStatus = () => {
    if (!networkStatus.data) {
      getNetworkStatus();
    }
  };

  const fetchUsersNumber = () => {
    if (!usersNumber.data) {
      getUsersNumber();
    }
  };

  const fetchTotalNetworkStake = () => {
    if (!totalNetworkStake.data) {
      getTotalNetworkStake();
    }
  };

  useEffect(fetchUsersNumber, [usersNumber.data]);
  useEffect(fetchNetworkStatus, [networkStatus.data]);
  useEffect(fetchTotalNetworkStake, [totalNetworkStake.data]);

  return (
    <div className={`${styles.cards} cards`}>
      {cards.map((card) => {
        const [alpha, beta] = card.colors;
        const background = `linear-gradient(180deg, ${alpha} 0%, ${beta} 100%)`;
        const interactive = card.modal && location.pathname === '/admin';

        return (
          <div key={card.label} className={styles.card} style={{ background }}>
            <div className={styles.heading}>
              <span>{card.label}</span>
              <div
                style={{
                  fill: interactive && !hasPendingTransactions ? beta : 'white'
                }}
                className={classNames(styles.icon, {
                  [styles.fill]: interactive && !hasPendingTransactions
                })}
              >
                {interactive && !hasPendingTransactions ? (
                  <Action
                    render={() => card.modal}
                    title={card.title}
                    description={card.description}
                    trigger={
                      <span
                        className={classNames(styles.trigger, {
                          [styles.disabled]: true
                        })}
                      >
                        <FontAwesomeIcon icon={faCog} size='lg' />
                      </span>
                    }
                  />
                ) : (
                  card.icon
                )}
              </div>
            </div>

            <div className={styles.value}>{card.data.value}</div>

            {card.data.percentage && <span>{card.data.percentage}</span>}
          </div>
        );
      })}
    </div>
  );
};
