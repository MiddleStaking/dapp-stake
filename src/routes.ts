import { RouteType } from '@multiversx/sdk-dapp/types';
import { dAppName } from 'config';
import Account from 'pages/Account';
import { Admin } from 'pages/Admin';
import Faucet from 'pages/Faucet';
import Rewards from 'pages/Rewards';
import Rewards2 from 'pages/RewardsV2';
import Tokenomics from 'pages/Tokenomics';
import TokenomicsV2 from 'pages/TokenomicstentativeV2';
import { withPageTitle } from './components/PageTitle';
import {
  Dashboard,
  Home,
  Statistics,
  Earn,
  Fund,
  Play,
  Swap,
  Liquidity,
  Collections,
  CollectionDetail
} from './pages';

export const routeNames = {
  home: '/',
  dashboard: '/dashboard',
  statistics: '/statistics',
  unlock: '/unlock',
  stake: '/stake',
  swap: '/swap',
  fund: '/fund',
  faucet: '/faucet',
  account: '/account',
  rewards: '/rewards',
  tokenomics: '/tokenomics',
  tokenomics2: '/tokenomics2',
  rewards2: '/rewards2',
  play: '/play',
  liquidity: '/liquidity',
  collections: '/collections',
  admin: '/admin'
};

interface RouteWithTitleType extends RouteType {
  title: string;
}

export const routes: RouteWithTitleType[] = [
  {
    path: routeNames.home,
    title: 'Home',
    component: Home
  },
  {
    path: routeNames.admin,
    title: 'Admin',
    component: Admin
  },
  {
    path: routeNames.statistics,
    title: 'Statistics',
    component: Statistics,
    authenticatedRoute: true
  },
  {
    path: routeNames.dashboard,
    title: 'Dashboard',
    component: Dashboard,
    authenticatedRoute: true
  },
  {
    path: routeNames.stake + '/:param',
    title: 'Stake',
    component: Earn,
    authenticatedRoute: false
  },
  {
    path: routeNames.stake,
    title: 'Stake',
    component: Earn,
    authenticatedRoute: false
  },
  {
    path: routeNames.collections + '/:param',
    title: 'Collections',
    component: CollectionDetail,
    authenticatedRoute: false
  },
  {
    path: routeNames.collections,
    title: 'Collections',
    component: Collections,
    authenticatedRoute: false
  },
  {
    path: routeNames.liquidity,
    title: 'Liquidity',
    component: Liquidity,
    authenticatedRoute: false
  },
  {
    path: routeNames.swap,
    title: 'Swap',
    component: Swap,
    authenticatedRoute: false
  },
  {
    path: routeNames.fund,
    title: 'Fund',
    component: Fund,
    authenticatedRoute: true
  },
  {
    path: routeNames.faucet,
    title: 'Faucet',
    component: Faucet,
    authenticatedRoute: true
  },
  {
    path: routeNames.account,
    title: 'Account',
    component: Account,
    authenticatedRoute: true
  },
  {
    path: routeNames.rewards,
    title: 'Rewards',
    component: Rewards,
    authenticatedRoute: true
  },
  {
    path: routeNames.rewards2,
    title: 'Rewards2',
    component: Rewards2,
    authenticatedRoute: true
  },
  {
    path: routeNames.tokenomics,
    title: 'Tokenomics',
    component: Tokenomics,
    authenticatedRoute: false
  },
  {
    path: routeNames.tokenomics2,
    title: 'TokenomicsV2',
    component: TokenomicsV2,
    authenticatedRoute: false
  },
  {
    path: routeNames.play,
    title: 'Play',
    component: Play,
    authenticatedRoute: false
  }
];

export const mappedRoutes = routes.map((route) => {
  const title = route.title
    ? `${route.title} • MultiversX ${dAppName}`
    : `MultiversX ${dAppName}`;

  const requiresAuth = Boolean(route.authenticatedRoute);
  const wrappedComponent = withPageTitle(title, route.component);

  return {
    path: route.path,
    component: wrappedComponent,
    authenticatedRoute: requiresAuth
  };
});
