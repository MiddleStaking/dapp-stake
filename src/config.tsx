// // DEVNET 2:
import { EnvironmentsEnum } from './lib';
export const environment = EnvironmentsEnum.devnet;

export const mid_api_v2 = 'https://api.middlestaking.com';

export const defaultToken = 'MID-00c2c9';
export const sftCollection = 'TOKENTICKE-38b075';
export const vouchersCollection = 'SFT-221ca7';
export const lockedCollection = 'TOKENTICKE-38b075';
export const midGiftToken = 'MIDGIFT-bf25b7';
export const wegld_identifier = 'WEGLD-a28c59';

export const scOwner =
  'erd12stex47hwg0hvx8cfvukj3y3ugs7dm0686k3wasycffexva6ch9s7tvj29';

export const defaultPairs = [{ s: 'MID-00c2c9', r: 'MID-00c2c9' }];
export const contractStake =
  'erd1qqqqqqqqqqqqqpgqnhdcg9ugyall5xyxa8xayz80hp5d3d6gch9s2kragz';
export const contractSwap =
  'erd1qqqqqqqqqqqqqpgq0dr0a8ag4y59q4nd66leux69vaeg6j9nch9swrxd82';
export const contractNftStake =
  'erd1qqqqqqqqqqqqqpgqq9va3mwdgzx5qzc7qnxu8k6ay0twry5jch9sz0ymrt';
export const contractMint =
  'erd1qqqqqqqqqqqqqpgq7zl9anenveu2vfz7z8m3kd4kcjlzq2wpch9sjgjyqh';
export const contractAddressDelegation =
  'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr0llllsj732py';
export const contractPlay =
  'erd1qqqqqqqqqqqqqpgqtqyp5v7nwnrvxhlnxav7z6k27an2m4vkch9sgsmrrt';
export const contractRestake =
  'erd1qqqqqqqqqqqqqpgq3hgxpv4mrxzxs03s6rexh3ngtswxgl2rch9s83xchu';

export const contracts = {
  lockGraou: 'erd1qqqqqqqqqqqqqpgqkhd7lhchw42cz3sahdrc95kme9pxnzguch9srygudw'
};
export const local_network: NetworkType = {
  id: 'devnet',
  chainId: 'D',
  name: 'Devnet',
  egldLabel: 'xEGLD',
  walletAddress: 'https://devnet-wallet.multiversx.com/dapp/init',
  apiAddress: 'https://devnet-api.multiversx.com',
  gatewayAddress: 'https://devnet-gateway.multiversx.com',
  gatewayCached: 'https://devnet-gateway.multiversx.com',
  explorerAddress: 'http://devnet-explorer.multiversx.com',
  delegationContract: contractAddressDelegation
};

export const stakingContract =
  'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqyhllllsv4k7x2';

export const dAppName = 'Middle Staking';
// Generate your own WalletConnect 2 ProjectId here: https://cloud.walletconnect.com/app
// export const walletConnectV2ProjectId = '9b1a9564f91cb659ffe21b73d5c4e2d8';
//export const walletConnectV2ProjectId = '1837c732028bec8c26507a308ae4af5e';
// export const walletConnectV2ProjectId = '1837c732028bec8c26507a308ae4af5e';
export const walletConnectV2ProjectId = '47d072804da2e2809c16ea08eea608b9';

export const apiTimeout = 6000;
export const transactionSize = 15;
export const TOOLS_API_URL = 'https://tools.multiversx.com';

/**
 * Calls to these domains will use `nativeAuth` Baerer token
 */
export const sampleAuthenticatedDomains = [TOOLS_API_URL];

export const minDust = '5000000000000000'; // 0.005 EGLD
export const decimals = 2;
export const denomination = 18;
export const genesisTokenSupply = 20000000;
export const feesInEpoch = 0;
export const stakePerNode = 2500;
export const protocolSustainabilityRewards = 0.1;

export const yearSettings = [
  { year: 1, maximumInflation: 0.1084513 },
  { year: 2, maximumInflation: 0.09703538 },
  { year: 3, maximumInflation: 0.08561945 },
  { year: 4, maximumInflation: 0.07420352 },
  { year: 5, maximumInflation: 0.0627876 },
  { year: 6, maximumInflation: 0.05137167 },
  { year: 7, maximumInflation: 0.03995574 },
  { year: 8, maximumInflation: 0.02853982 },
  { year: 9, maximumInflation: 0.01712389 },
  { year: 10, maximumInflation: 0.00570796 },
  { year: 11, maximumInflation: 0.0 }
];

interface NetworkType {
  id: 'devnet' | 'testnet' | 'mainnet';
  chainId: string;
  name: string;
  egldLabel: string;
  walletAddress: string;
  apiAddress: string;
  gatewayAddress: string;
  gatewayCached: string;
  explorerAddress: string;
  delegationContract: string;
}
export const auctionContract =
  'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqplllst77y4l';

export interface DelegationContractType {
  name: string;
  gasLimit: number;
  data: string;
}

export const delegationContractData: Array<DelegationContractType> = [
  {
    name: 'createNewDelegationContract',
    gasLimit: 6000000,
    data: 'createNewDelegationContract@'
  },
  {
    name: 'setAutomaticActivation',
    gasLimit: 6000000,
    data: 'setAutomaticActivation@'
  },
  {
    name: 'setMetaData',
    gasLimit: 6000000,
    data: 'setMetaData@'
  },
  {
    name: 'setReDelegateCapActivation',
    gasLimit: 6000000,
    data: 'setCheckCapOnReDelegateRewards@'
  },
  {
    name: 'changeServiceFee',
    gasLimit: 6000000,
    data: 'changeServiceFee@'
  },
  {
    name: 'modifyTotalDelegationCap',
    gasLimit: 6000000,
    data: 'modifyTotalDelegationCap@'
  },
  {
    name: 'addNodes',
    gasLimit: 12000000,
    data: 'addNodes'
  },
  {
    name: 'removeNodes',
    gasLimit: 12000000,
    data: 'removeNodes@'
  },
  {
    name: 'stakeNodes',
    gasLimit: 12000000,
    data: 'stakeNodes@'
  },
  {
    name: 'reStakeUnStakedNodes',
    gasLimit: 120000000,
    data: 'reStakeUnStakedNodes@'
  },
  {
    name: 'unStakeNodes',
    gasLimit: 12000000,
    data: 'unStakeNodes@'
  },
  {
    name: 'unBondNodes',
    gasLimit: 12000000,
    data: 'unBondNodes@'
  },
  {
    name: 'unJailNodes',
    gasLimit: 12000000,
    data: 'unJailNodes@'
  },
  {
    name: 'delegate',
    gasLimit: 12000000,
    data: 'delegate'
  },
  {
    name: 'unDelegate',
    gasLimit: 12000000,
    data: 'unDelegate@'
  },
  {
    name: 'withdraw',
    gasLimit: 12000000,
    data: 'withdraw'
  },
  {
    name: 'claimRewards',
    gasLimit: 6000000,
    data: 'claimRewards'
  },
  {
    name: 'reDelegateRewards',
    gasLimit: 12000000,
    data: 'reDelegateRewards'
  }
];
