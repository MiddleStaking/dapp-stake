import React, { useEffect, useState } from 'react';
import {
  Address,
  AddressValue,
  ContractFunction,
  ResultsParser,
  TokenPayment
} from '@multiversx/sdk-core/out';
// import { useGetNetworkConfig as multiversxGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import {
  ApiNetworkProvider,
  // ApiNetworkProvider,
  ProxyNetworkProvider
} from '@multiversx/sdk-network-providers/out';
import { minDust, network, contractAddressDelegation } from 'config';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { smartContract } from './smartContract';
import {
  useGetAccountInfo as multiversxGetAccountInfo,
  useGetActiveTransactionsStatus
} from '@multiversx/sdk-dapp/hooks';

import BigNumber from 'bignumber.js';
import { denominated } from './denominate';
import getPercentage from './getPercentage';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { nominateValToHex } from './nominate';
import axios from 'axios';
const resultsParser = new ResultsParser();

const GetTotalActiveStake = () => {
  // const { network } = multiversxGetNetworkConfig();
  const [getTotalActiveStake, setGetTotalActiveStake] =
    React.useState<string>('loading');

  //const proxy = new ProxyNetworkProvider(network.apiAddress);
  const proxy = new ProxyNetworkProvider(
    network.gatewayAddress
    // 'https://devnet-gateway.multiversx.com'
  );
  const getTotalActiveStakeAbi = async () => {
    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('getTotalActiveStake')
      });
      const queryResponse = await proxy.queryContract(query);

      const endpointDefinition = smartContract.getEndpoint(
        'getTotalActiveStake'
      );

      const { firstValue: amount } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );

      // console.log(amount?.valueOf()?.toString(10));

      setGetTotalActiveStake(
        amount?.valueOf()?.toString(10) !== null
          ? amount?.valueOf()?.toString(10)
          : 'loading'
      );
    } catch (err) {
      console.error('Unable to call getTotalActiveStakeAbi', err);
    }
  };

  useEffect(() => {
    getTotalActiveStakeAbi();
  }, []);

  return getTotalActiveStake;
};

const GetTotalUser = () => {
  // const { network } = multiversxGetNetworkConfig();
  const [getTotalUsers, setGetTotalUsers] = useState<string>();

  //const proxy = new ProxyNetworkProvider(network.apiAddress);
  const proxy = new ProxyNetworkProvider(network.gatewayAddress);
  const getTotalUserAbi = async () => {
    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('getNumUsers')
      });
      const queryResponse = await proxy.queryContract(query);

      const endpointDefinition = smartContract.getEndpoint('getNumUsers');

      const { firstValue: amount } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );

      setGetTotalUsers(
        amount !== null ? amount?.valueOf().toString(10) : 'loading'
      );
    } catch (err) {
      console.error('Unable to call GetTotalUser', err);
    }
  };

  useEffect(() => {
    getTotalUserAbi();
  }, []);

  return getTotalUsers;
};

const GetTotalNode = () => {
  // const { network } = multiversxGetNetworkConfig();
  const [getTotalNode, setGetTotalNode] = useState<string>();

  //const proxy = new ProxyNetworkProvider(network.apiAddress);
  const proxy = new ProxyNetworkProvider(network.gatewayAddress);
  const getTotalNodeAbi = async () => {
    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('getNumNodes')
      });
      const queryResponse = await proxy.queryContract(query);

      const endpointDefinition = smartContract.getEndpoint('getNumNodes');

      const { firstValue: amount } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );
      setGetTotalNode(
        amount !== null ? amount?.valueOf().toString(10) : 'loading'
      );
    } catch (err) {
      console.error('Unable to call GetTotalNode', err);
    }
  };

  useEffect(() => {
    getTotalNodeAbi();
  }, []);

  return getTotalNode;
};

const GetTotalNetworkStake = () => {
  // const { network } = multiversxGetNetworkConfig();
  const [getTotalNode, setGetTotalNode] = useState<any>();

  //const proxy = new ProxyNetworkProvider(network.apiAddress);
  // const proxy = new ProxyNetworkProvider(network.gatewayAddress);

  const query = new ApiNetworkProvider(network.apiAddress, {
    timeout: 4000
  });

  // const data = await query.getNetworkStakeStatistics();
  const getNetworkStake = async () => {
    try {
      // console.log(await query.getNetworkStakeStatistics());
      const queryResponse = await query.getNetworkStakeStatistics();
      setGetTotalNode(queryResponse);
      // setGetTotalNode(amount !== null ? amount?.valueOf().toString() : 'loading');
    } catch (err) {
      console.error('Unable to call GetTotalNetworkStake', err);
    }
  };

  useEffect(() => {
    getNetworkStake();
  }, []);

  return getTotalNode !== undefined
    ? getTotalNode.TotalStaked.valueOf().toString(10)
    : '0';
};

const GetNetworkStatus = () => {
  // const { network } = multiversxGetNetworkConfig();
  const [getTotalNode, setGetTotalNode] = useState<any>();

  //const proxy = new ProxyNetworkProvider(network.apiAddress);
  // const proxy = new ProxyNetworkProvider(network.gatewayAddress);
  const query = new ApiNetworkProvider(network.apiAddress, {
    timeout: 4000
  });
  const getNetworkStatus = async () => {
    try {
      const queryResponse = await query.getNetworkStakeStatistics();

      setGetTotalNode(queryResponse);

      // setGetTotalNode(amount !== null ? amount?.valueOf().toString() : 'loading');
    } catch (err) {
      console.error('Unable to call GetNetworkStatus', err);
    }
  };

  useEffect(() => {
    getNetworkStatus();
  }, []);

  return getTotalNode;
};

const GetContractConfig = () => {
  // const { network } = multiversxGetNetworkConfig();
  const [getContractCongig, setGetContractCongig] = useState({
    owner_address: 'undefined',
    serviceFee: 0,
    MaxDelegationCap: 0,
    InitialOwnerFunds: 0,
    automaticActivation: 'undefined',
    withDelegationCap: 'undefined',
    changeableServiceFee: 'undefined',
    CreatedNonce: 0,
    UnBondPeriod: 0
  });

  //const proxy = new ProxyNetworkProvider(network.apiAddress);
  const proxy = new ProxyNetworkProvider(network.gatewayAddress);
  const ContractConfig = async () => {
    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('getContractConfig')
      });
      const queryResponse = await proxy.queryContract(query);

      const endpointDefinition = smartContract.getEndpoint('getContractConfig');

      const { values: amount } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );

      const tab: any = amount;

      // console.log(tab.valueOf().toFixed());

      setGetContractCongig({
        owner_address: new Address(tab[0].value.valueHex.toString()).bech32(),
        serviceFee: tab[1].toString() / 100,
        MaxDelegationCap: tab[2].valueOf().toFixed(),
        InitialOwnerFunds: tab[3].toString(),
        automaticActivation: tab[4].toString(),
        withDelegationCap: tab[5].toString(),
        changeableServiceFee: tab[6].toString(),
        CreatedNonce: tab[7].toString(),
        UnBondPeriod: tab[8].toString()
      });

      // setGetContractCongig(amount?.valueOf()?.toString(10) !== null ? amount?.valueOf()?.toString(10) : 'loading');
    } catch (err) {
      console.error('Unable to call getContractConfig', err);
    }
  };

  useEffect(() => {
    ContractConfig();
  }, []);

  return getContractCongig;
};

const GetUserActiveStake = () => {
  const { address } = multiversxGetAccountInfo();

  const { success } = useGetActiveTransactionsStatus();
  const { hasPendingTransactions } = useGetPendingTransactions();

  // const { network } = multiversxGetNetworkConfig();
  const [pingAmount, setPingAmount] = useState<string>('x');

  //const proxy = new ProxyNetworkProvider(network.apiAddress);
  const proxy = new ProxyNetworkProvider(network.gatewayAddress);
  const getPingAmount = async () => {
    if (hasPendingTransactions) {
      return;
    }

    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('getUserActiveStake'),
        args: [new AddressValue(new Address(address))]
      });
      const queryResponse = await proxy.queryContract(query);

      const endpointDefinition =
        smartContract.getEndpoint('getUserActiveStake');

      const { firstValue: amount } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );

      if (amount === null) {
        setPingAmount('0');
        return;
      }
      setPingAmount(amount?.valueOf()?.toString(10));
    } catch (err) {
      setPingAmount('null');
      console.error('Unable to call GetUserActiveStake', err);
    }
  };
  useEffect(() => {
    getPingAmount();
  }, [hasPendingTransactions]);

  return pingAmount.toString();
};

const getStakingLimits = () => {
  // console.log(getTotalActiveStake());
  const getTotalActiveStakes = GetTotalActiveStake();
  const test: any = GetContractConfig();
  const { account } = multiversxGetAccountInfo();

  if (
    test.owner_address !== 'undefined' &&
    getTotalActiveStakes !== 'loading'
  ) {
    const balance = new BigNumber(account.balance);
    const gasPrice = new BigNumber('12000000');
    const gasLimit = new BigNumber('12000000');
    const available = balance.minus(gasPrice.times(gasLimit));
    const dustful = available.minus(new BigNumber(minDust)).toFixed();

    if (test.withDelegationCap === 'true') {
      const cap = test.MaxDelegationCap.toString();
      const stake = getTotalActiveStakes;
      const remainder = new BigNumber(cap).minus(new BigNumber(stake));
      const maxed =
        parseInt(getPercentage(denominated(stake), denominated(cap))) === 100;

      if (remainder.isGreaterThan(available)) {
        return {
          balance: available.toFixed(),
          limit: dustful,
          maxed
        };
      } else {
        return {
          balance: available.toFixed(),
          limit: remainder.toFixed(),
          maxed
        };
      }
    } else {
      return {
        balance: available.toFixed(),
        limit: dustful,
        maxed: false
      };
    }
  }
  return {
    balance: '',
    limit: '',
    maxed: true
  };
};

const GetUserClaimsReward = () => {
  const { address, account } = multiversxGetAccountInfo();
  const { hasPendingTransactions } = useGetPendingTransactions();

  // const { network } = multiversxGetNetworkConfig();
  const [rewards, setRewards] = useState<string>('0');

  //const proxy = new ProxyNetworkProvider(network.apiAddress);
  const proxy = new ProxyNetworkProvider(network.gatewayAddress);
  const getRewards = async () => {
    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('getClaimableRewards'),
        args: [new AddressValue(new Address(address))]
      });
      const queryResponse = await proxy.queryContract(query);

      const endpointDefinition = smartContract.getEndpoint(
        'getClaimableRewards'
      );

      const { firstValue: amount } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );

      // console.log(amount);

      if (amount === undefined || amount === null) {
        setRewards('0');
        return;
      }
      setRewards(amount?.valueOf()?.toString(10));
    } catch (err) {
      console.error('Unable to call getRewards', err);
    }
  };

  useEffect(() => {
    getRewards();
  }, [hasPendingTransactions]);

  return rewards;
};

const transactionStake = () => {
  const sendReDelegateRewards = async (): Promise<void> => {
    try {
      const reDelegateRewardsTransaction = {
        value: GetUserClaimsReward(),
        data: 'reDelegateRewards',
        receiver: contractAddressDelegation,
        gasLimit: '60000000'
      };
      await refreshAccount();

      const { sessionId /*, error*/ } = await sendTransactions({
        transactions: reDelegateRewardsTransaction,
        transactionsDisplayInfo: {
          processingMessage: 'Processing reDelegateRewards transaction',
          errorMessage: 'An error has occured during reDelegateRewards',
          successMessage: 'reDelegateRewards transaction successful'
        },
        redirectAfterSign: false
      });
      if (sessionId != null) {
        return;
        // console.log(sessionId);
      } else {
        return console.log('ok');
      }
    } catch (error) {
      return console.log(error);
    }
  };
  return {
    sendReDelegateRewards
    // getStakingLimits
  };
};

const sendReDelegateRewards = async (): Promise<void> => {
  try {
    const reDelegateRewardsTransaction = {
      value: '0',
      data: 'reDelegateRewards',
      receiver: contractAddressDelegation,
      gasLimit: '60000000'
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: reDelegateRewardsTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing reDelegateRewards transaction',
        errorMessage: 'An error has occured during reDelegateRewards',
        successMessage: 'reDelegateRewards transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      return;
      // console.log(sessionId);;
    } else {
      return;
    }
  } catch (error) {
    return console.log(error);
  }
};

const sendClaimRewards = async (): Promise<void> => {
  try {
    const reDelegateRewardsTransaction = {
      value: '0',
      data: 'claimRewards',
      receiver: contractAddressDelegation,
      gasLimit: '60000000'
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: reDelegateRewardsTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing reDelegateRewards transaction',
        errorMessage: 'An error has occured during reDelegateRewards',
        successMessage: 'reDelegateRewards transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      return;
      // console.log(sessionId);;
    } else {
      return;
    }
  } catch (error) {
    return console.log(error);
  }
};

interface DelegationPayloadType {
  amount: string;
}

const onDelegate = async (data: DelegationPayloadType): Promise<void> => {
  try {
    const reDelegateRewardsTransaction = {
      value: TokenPayment.egldFromAmount(data.amount),
      data: 'delegate',
      receiver: contractAddressDelegation,
      gasLimit: '60000000'
    };

    const { sessionId, transactions /*, error*/ } = await sendTransactions({
      transactions: reDelegateRewardsTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing onDelegate transaction',
        errorMessage: 'An error has occured during onDelegate',
        successMessage: 'onDelegate transaction successful'
      },
      redirectAfterSign: false
    });
    await refreshAccount();
    if (sessionId != null) {
      return;
      // console.log(sessionId);;
    } else {
      return;
    }
  } catch (error) {
    console.error(error);
  }
};

const onUnDelegate = async (data: DelegationPayloadType): Promise<void> => {
  try {
    const test = TokenPayment.egldFromAmount(data.amount);
    const test2 = nominateValToHex(data.amount.toString());

    const reDelegateRewardsTransaction = {
      value: '0',
      data: 'unDelegate@' + test2,
      receiver: contractAddressDelegation,
      gasLimit: '60000000'
    };

    const { sessionId, transactions /*, error*/ } = await sendTransactions({
      transactions: reDelegateRewardsTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing onUnDelegate transaction',
        errorMessage: 'An error has occured during onUnDelegate',
        successMessage: 'onUnDelegate transaction successful'
      },
      redirectAfterSign: false
    });
    await refreshAccount();
    if (sessionId != null) {
      return;
      // console.log(sessionId);;
    } else {
      return;
    }
  } catch (error) {
    console.error(error);
  }
};

// const Test = async () => {
//   try {
//     const networkProvider = new ProxyNetworkProvider(
//       'https://devnet-gateway.multiversx.com'
//     );
//     const networkConfig = await networkProvider.getNetworkConfig();

//     return networkConfig;
//   } catch (error) {
//     console.error(error);
//   }
// };

// const Test = () => {
//   const [config, setConfig] = React.useState<any>({});

//   const networkProvider = new ProxyNetworkProvider(
//     'https://devnet-gateway.multiversx.com'
//   );

//   const getTotalActiveStakeAbi = async () => {
//     try {
//       const networkConfig = await networkProvider.getNetworkConfig();

//       // console.log(amount?.valueOf()?.toString(10

//       console.log(networkConfig);
//     } catch (err) {
//       console.error('Unable to call getPingAmount', err);
//     }
//   };

//   useEffect(() => {
//     getTotalActiveStakeAbi();
//   }, []);

//   return config;
// };

const ConfigNetwork = () => {
  const [getTotalNode, setGetTotalNode] = useState<any>({
    ChainID: '',
    GasPerDataByte: 0,
    GasPriceModifier: 0,
    MinGasLimit: 0,
    MinGasPrice: 0,
    MinTransactionVersion: 0,
    RoundDuration: 0,
    RoundsPerEpoch: 0,
    TopUpFactor: 0,
    TopUpRewardsGradientPoint: 0
  });

  const proxy = new ProxyNetworkProvider(network.gatewayAddress);

  const getNetworkStatus = async () => {
    try {
      const queryResponse = await proxy.getNetworkConfig();

      setGetTotalNode(queryResponse);

      // setGetTotalNode(amount !== null ? amount?.valueOf().toString() : 'loading');
    } catch (err) {
      console.error('Unable to call ConfigNetwork', err);
    }
  };

  useEffect(() => {
    getNetworkStatus();
  }, []);

  return getTotalNode;
};

const GetEpochNumber = () => {
  const [EpochNumber, setEpochNumber] = useState({
    accounts: 0,
    blocks: 0,
    epoch: 0,
    refreshRate: 0,
    roundsPassed: 0,
    roundsPerEpoch: 0,
    scResults: 0,
    shards: 0,
    transactions: 0
  });

  const getNetworkStatus = async () => {
    try {
      axios.get(`${network.apiAddress}/stats`).then((data) => {
        setEpochNumber(data?.data);
      });

      // setGetTotalNode(amount !== null ? amount?.valueOf().toString() : 'loading');
    } catch (err) {
      console.error('Unable to call GetEpochNumber', err);
    }
  };

  useEffect(() => {
    getNetworkStatus();
  }, []);

  return EpochNumber;
};

const NetworkEconomics = () => {
  const [economics, setEconomics] = useState<any>();

  const getNetworkeconomics = async () => {
    try {
      axios.get(`${network.apiAddress}/economics`).then((data) => {
        setEconomics(data?.data);
      });

      // setGetTotalNode(amount !== null ? amount?.valueOf().toString() : 'loading');
    } catch (err) {
      console.error('Unable to call NetworkEconomics', err);
    }
  };

  useEffect(() => {
    getNetworkeconomics();
  }, []);

  return economics;
};

export {
  sendReDelegateRewards,
  transactionStake,
  GetUserClaimsReward,
  GetTotalUser,
  GetTotalActiveStake,
  GetTotalNode,
  GetNetworkStatus,
  GetTotalNetworkStake,
  GetContractConfig,
  GetUserActiveStake,
  getStakingLimits,
  sendClaimRewards,
  onUnDelegate,
  onDelegate,
  ConfigNetwork,
  GetEpochNumber,
  NetworkEconomics
};
