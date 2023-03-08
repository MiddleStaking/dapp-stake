import { RouteType } from '@multiversx/sdk-dapp/types';
import { dAppName } from 'config';
import Faucet from 'pages/Faucet';
import Rewards from 'pages/Rewards';
import Tokenomics from 'pages/Tokenomics';
import { withPageTitle } from './components/PageTitle';
import { Dashboard, Home, Statistics, Earn, Fund } from './pages';

export const routeNames = {
  home: '/',
  dashboard: '/dashboard',
  statistics: '/statistics',
  unlock: '/unlock',
  earn: '/earn',
  fund: '/fund',
  faucet: '/faucet',
  rewards: '/rewards',
  tokenomics: '/tokenomics'
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
    path: routeNames.earn + '/:param',
    title: 'Earn',
    component: Earn,
    authenticatedRoute: false
  },
  {
    path: routeNames.earn,
    title: 'Earn',
    component: Earn,
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
    path: routeNames.rewards,
    title: 'Rewards',
    component: Rewards,
    authenticatedRoute: true
  },
  {
    path: routeNames.tokenomics,
    title: 'Tokenomics',
    component: Tokenomics,
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
