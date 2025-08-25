// MAINNET:

export const mid_api_v2 = 'https://api.middlestaking.com';

export const defaultToken = 'MID-ecb7bf';
export const sftCollection = 'MIDSTERS-a7c790';
export const lockedCollection = 'DINOGAZ-c723ac';
export const vouchersCollection = 'VOUCHERS-e6045e';
export const dinoblock = 'DINOBLOCK-652073';
export const dinobadge = 'DINOBLOCK-652073';
export const wegld_identifier = 'WEGLD-bd4d79';

export const midGiftToken = 'MIDGIFT-bf25b7';
export const scOwner =
  'erd175f5khy03nuctjfxre29kza4je8e48xsfu56fzwgmwqtty33txfqse8h4k';

export const contractStake =
  'erd1qqqqqqqqqqqqqpgqgdf6vk43c2jxk4a6nw2adv8vmnpqagegtxfqmf8et2';
export const contractSwap =
  'erd1qqqqqqqqqqqqqpgqw0tp0z2evzvdgmreavvszfwkncnxnsejtxfql7w9tu';
export const contractNftStake =
  'erd1qqqqqqqqqqqqqpgq5re66vt0dlee8v83dtyh6k54qqpjs3ketxfq9tcd29';
export const contractMint =
  'erd1qqqqqqqqqqqqqpgqmcf5lv9kxjl8jkp9qrme74y2ft3kwzultxfq03fghn';
export const contractAddressDelegation =
  'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqyhllllsv4k7x2';
export const contractPlay =
  'erd1qqqqqqqqqqqqqpgq5swddcg7k5umyj9y3c66a8xrjj2ftfx4txfqgxgj0w';
export const contractRestake =
  'erd1qqqqqqqqqqqqqpgq4mudu4n6kqqa6agtek3s2jmr7j5tqjwctxfqphra6x';

export const contracts = {
  lockGraou: 'erd1qqqqqqqqqqqqqpgqsgvnfzwwdmjpf55hvp66eeq3xu5pd40k5gcsm5vzlw'
};
export const local_network: NetworkType = {
  id: 'mainnet',
  chainId: '1',
  name: 'Mainnet',
  egldLabel: 'EGLD',
  walletAddress: 'https://wallet.multiversx.com/dapp/init',
  //  walletAddress: 'https://xalias.com',
  apiAddress: 'https://api.multiversx.com',
  gatewayAddress: 'https://gateway.multiversx.com',
  gatewayCached: 'https://api.middlestaking.fr/mainnet/data',
  explorerAddress: 'http://explorer.multiversx.com',
  delegationContract: contractAddressDelegation
};
export const defaultPairs = [
  { s: 'MID-ecb7bf', r: 'MID-ecb7bf' },
  { s: 'MID-ecb7bf', r: 'MEX-455c57' },
  { s: 'MID-ecb7bf', r: 'VITAL-ab7917' },
  { s: 'MID-ecb7bf', r: 'XTW-78700a' },
  { s: 'MIDUSDC-3d93f4', r: 'MID-ecb7bf' },
  { s: 'MEX-455c57', r: 'MID-ecb7bf' },
  { s: 'VITAL-ab7917', r: 'MID-ecb7bf' }
];

//GLOBAL :
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
