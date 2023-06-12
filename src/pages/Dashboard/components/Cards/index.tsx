import React, { FC, useCallback, ReactNode } from 'react';
import {
  faUsers,
  faServer,
  faLeaf,
  faReceipt,
  faArrowUp,
  faCog
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks';
import { FormatAmount } from '@multiversx/sdk-dapp/UI/FormatAmount';
import { formatAmount } from '@multiversx/sdk-dapp/utils';
import { useLocation } from 'react-router-dom';
import Logo from 'assets/Logo';
import Action from 'components/Action';
// import { useGlobalContext, useDispatch } from 'context';
// import {
//   ApiNetworkProvider,
//   NetworkStake,
//   NetworkStatus
// } from '@multiversx/sdk-network-providers/out';
import { denominated } from 'pages/Dashboard/helper/denominate';
import getPercentage from 'pages/Dashboard/helper/getPercentage';
import modifiable from 'pages/Dashboard/helper/modifiable';
import {
  GetContractConfig,
  GetNetworkStatus,
  GetTotalActiveStake,
  GetTotalNetworkStake,
  GetTotalUser,
  ConfigNetwork,
  GetEpochNumber,
  NetworkEconomics
} from '../../helper/requestAbi';
import { ChangeDelegationCap } from './components/ChangeDelegationCap';
import { ChangeServiceFee } from './components/ChangeServiceFee';
import calculateAnnualPercentage from './helpers/calculateAnnualPercentage';
import styles from './styles.module.scss';

interface CardType {
  label: string;
  colors: Array<string>;
  data:
    | {
        value?: string | null;
        percentage?: string | undefined;
      }
    | string;
  title?: string;
  description?: string;
  modal?: ReactNode;
  icon: ReactNode;
}

const Cards: FC = () => {
  // const {
  //   totalActiveStake,
  //   totalNetworkStake,
  //   usersNumber,
  //   nodesNumber,
  //   networkStatus,
  //   contractDetails,
  //   networkConfig
  // } = useGlobalContext();
  // const dispatch = useDispatch();
  const location = useLocation();
  const { network } = useGetNetworkConfig();

  // const getNetworkStatus = async (): Promise<void> => {
  //   dispatch({
  //     type: 'getNetworkStatus',
  //     networkStatus: {
  //       status: 'loading',
  //       data: null,
  //       error: null
  //     }
  //   });

  //   try {
  //     const [status, balance] = await Promise.all([
  //       new ApiNetworkProvider(network.gatewayAddress).getNetworkStatus(),
  //       axios.get(`${network.apiAddress}/accounts/${auctionContract}`)
  //     ]);

  //     dispatch({
  //       type: 'getNetworkStatus',
  //       networkStatus: {
  //         status: 'loaded',
  //         error: null,
  //         data: {
  //           ...status,
  //           Balance: balance.data.balance
  //         }
  //       }
  //     });
  //   } catch (error) {
  //     dispatch({
  //       type: 'getNetworkStatus',
  //       networkStatus: {
  //         status: 'error',
  //         data: null,
  //         error
  //       }
  //     });
  //   }
  // };

  // const getUsersNumber = useCallback(
  //   () => {
  //   const users: string =
  //     getTotalUser() !== undefined ? getTotalUser() : 'loading';

  //   // return 'users';
  //   return users;
  // });

  const getUsersNumber = useCallback(() => {
    const TotalUserOnContract = GetTotalUser();
    return {
      value: TotalUserOnContract
    };
  }, []);
  const getNodesNumber = useCallback(() => {
    //const TotalNodesNumber = GetTotalNode();
    return {
      // value: TotalNodesNumber,
      value: '31'
    };
  }, []);
  // const getTotalNetworkStake = async (): Promise<void> => {
  //   dispatch({
  //     type: 'getTotalNetworkStake',
  //     totalNetworkStake: {
  //       data: null,
  //       error: null,
  //       status: 'loading'
  //     }
  //   });

  //   try {
  //     const query = new ApiNetworkProvider(network.apiAddress, {
  //       timeout: 10000
  //     });

  //     const data = await query.getNetworkStakeStatistics();

  //     dispatch({
  //       type: 'getTotalNetworkStake',
  //       totalNetworkStake: {
  //         status: 'loaded',
  //         error: null,
  //         data
  //       }
  //     });
  //   } catch (error) {
  //     dispatch({
  //       type: 'getTotalNetworkStake',
  //       totalNetworkStake: {
  //         status: 'error',
  //         data: null,
  //         error
  //       }
  //     });
  //   }
  // };
  const getContractStakeData = useCallback(
    () => {
      // let networkProvider = new ApiNetworkProvider("https://mainet-api.multiversx.com");
      // networkStake.TotalStaked;

      const TotalStakeOnContract = GetTotalActiveStake();

      const TotalStake = GetTotalNetworkStake();

      // if (!totalNetworkStake.data || !totalActiveStake.data) {
      //   const loading =
      //     totalNetworkStake.status === 'loading' ||
      //     totalActiveStake.status === 'loading';
      //   return {
      //     value: loading ? `... ${network.egldLabel}` : 'Stake Unknown',
      //     percentage: loading ? '...%' : 'Data Unavailable'
      //   };
      // }

      formatAmount;

      const formatted = {
        stake: denominated(TotalStake !== undefined ? TotalStake : '0'),
        nodes: denominated(
          TotalStakeOnContract !== undefined ? TotalStakeOnContract : '0'
        )
      };

      return {
        value: `${formatted.nodes} ${network.egldLabel}`,
        percentage: `${getPercentage(
          formatted.nodes,
          '16000000000000000000000000'
        )}% of total stake`
      };
    },
    [
      // totalNetworkStake, totalActiveStake.data
    ]
  );

  // const getNodesNumber = useCallback(() => {
  //   if (!totalNetworkStake.data || !nodesNumber.data) {
  //     const loading =
  //       totalNetworkStake.status === 'loading' ||
  //       nodesNumber.status === 'loading';

  //     return {
  //       value: loading ? '...' : 'Nodes Unknown',
  //       percentage: loading ? '...% of total nodes' : 'Data Unavailable'
  //     };
  //   }

  //   const formatted = {
  //     stake: totalNetworkStake.data.TotalValidators.toString(),
  //     nodes: nodesNumber.data.values
  //       .filter((key: any) => decodeString(key) === 'staked')
  //       .length.toString()
  //   };

  //   return {
  //     value: formatted.nodes,
  //     percentage: `${getPercentage(
  //       formatted.nodes,
  //       formatted.stake
  //     )}% of total nodes`
  //   };
  // }, [totalNetworkStake, nodesNumber]);

  const getDelegationCap = useCallback(() => {
    const TotalgetDelegationCapr: any = GetContractConfig();

    return TotalgetDelegationCapr.MaxDelegationCap;
  }, []);

  const getServiceFee = useCallback(() => {
    const TotalgetDelegationCapr: any = GetContractConfig();

    return TotalgetDelegationCapr.serviceFee;
  }, []);

  const getAnnualPercentage = () => {
    const NetworkStatus = GetNetworkStatus();
    const TotalActiveStake = GetTotalActiveStake();
    const TotalNetworkStake = GetTotalNetworkStake();
    const ServiceFee = getServiceFee();
    const configNetwork = ConfigNetwork();
    const epochNumber = GetEpochNumber();
    const networkEconomics = NetworkEconomics();
    // const dependencies = [
    //   getTotalActiveStake(),
    //   getNodesNumber(),
    //   getNetworkStatus(),
    //   getTotalNetworkStake(),
    //   network,
    //   getContractConfig()
    // ];
    // if (dependencies.some((dependency) => dependency.status === 'loading')) {
    //   return '...%';
    // }
    if (
      TotalActiveStake !== undefined &&
      NetworkStatus !== undefined &&
      TotalNetworkStake !== undefined &&
      ServiceFee !== undefined &&
      configNetwork !== undefined &&
      epochNumber !== undefined &&
      networkEconomics !== undefined
    ) {
      const percentage = calculateAnnualPercentage({
        activeStake: TotalActiveStake,
        // blsKeys: 31,
        networkStatus: NetworkStatus,
        serviceFee: ServiceFee,
        configNetwork: configNetwork,
        epochNumber: epochNumber,
        networkEconomics: networkEconomics
      });
      return `${percentage}%`;
    }
    return 'Unknown APR';
  };

  getContractStakeData();
  const cards: Array<CardType> = [
    {
      label: 'Contract Stake',
      data: getContractStakeData(),
      colors: ['#2044F5', '#1B37C0'],
      icon: <Logo />
    },
    {
      label: 'Number of Users',
      colors: ['#6CADEF', '#5B96D2'],
      icon: <FontAwesomeIcon icon={faUsers} />,
      data: getUsersNumber()
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
        value: getServiceFee() + ' %'
      }
    },
    {
      label: 'Delegation Cap',
      modal: <ChangeDelegationCap />,
      description: `The delegation cap is the maximum amount of ${network.egldLabel} your agency can stake from delegators.`,
      title: 'Delegation Cap',
      icon: <FontAwesomeIcon icon={faArrowUp} />,
      colors: ['#E48570', '#C25C45'],
      data: getDelegationCap()
    }
  ];

  // const fetchNetworkStatus = () => {
  //   if (!networkStatus.data) {
  //     getNetworkStatus();
  //   }
  // };

  // const fetchUsersNumber = () => {
  //   if (!usersNumber.data) {
  //     getUsersNumber();
  //   }
  // };

  // const fetchTotalNetworkStake = () => {
  //   if (!totalNetworkStake.data) {
  //     getTotalNetworkStake();
  //   }
  // };

  // useEffect(fetchUsersNumber, [usersNumber.data]);
  // useEffect(fetchNetworkStatus, [networkStatus.data]);
  // useEffect(fetchTotalNetworkStake, [totalNetworkStake.data]);

  return (
    <div className={`${styles.cards} cards`}>
      {cards.map((card: any) => {
        const [alpha, beta] = card.colors;
        const background = `linear-gradient(180deg, ${alpha} 0%, ${beta} 100%)`;
        const interactive = card.modal && location.pathname === '/admin';

        return (
          <div key={card.label} className={styles.card} style={{ background }}>
            <div className={styles.heading}>
              <span>{card.label}</span>
              <div
                style={{ fill: interactive ? beta : 'white' }}
                className={modifiable('icon', [interactive && 'fill'], styles)}
              >
                {interactive ? (
                  <Action
                    render={card.modal}
                    title={card.title}
                    description={card.description}
                    trigger={
                      <span className={styles.trigger}>
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

            {card.data.value === undefined ? (
              <FormatAmount
                value={card.data}
                data-testid='balance'
                digits={2}
              />
            ) : (
              ''
            )}
            {card.data.percentage && <span>{card.data.percentage}</span>}
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
