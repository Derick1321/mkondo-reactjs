import Marketing from '$containers/Marketing';
import Home from '$containers/Home';
import OnBoarding from '$containers/OnBoarding';
import Main from '$containers/Main';

export const routePaths = {
  main: '/app',
  marketing: '/',
  onBoarding: '/app/on-boarding',
  home: '/app/home',
  recommendation: '/app/recommendation',
  newRelease: '/app/new-release',
  topChart: '/app/top-chart',
  feeds: '/app/feeds',
};

const redirectFunctions = {
  app: (token, role) => {
    if (!token) {
      return routePaths.marketing;
    }
    return false;
  },
};

const defaultConfig = {
  exact: true,
  redirect: () => false,
  subPaths: null,
}

export const routes = [
  {
    ...defaultConfig,
    path: routePaths.marketing,
    component: Marketing,
  },
  {
    ...defaultConfig,
    path: routePaths.main,
    component: Main,
    exact: false,
    routes: [
      {
        ...defaultConfig,
        path: routePaths.onBoarding,
        component: OnBoarding,
        redirect: redirectFunctions.app
      },
      {
        ...defaultConfig,
        path: routePaths.home,
        component: Home,
        redirect: redirectFunctions.app
      },
      {
        ...defaultConfig,
        path: routePaths.recommendation,
        component: Home,
        redirect: redirectFunctions.app
      },
      {
        ...defaultConfig,
        path: routePaths.newRelease,
        component: Home,
        redirect: redirectFunctions.app
      },
      {
        ...defaultConfig,
        path: routePaths.topChart,
        component: Home,
        redirect: redirectFunctions.app
      },
      {
        ...defaultConfig,
        path: routePaths.feeds,
        component: Home,
        redirect: redirectFunctions.app
      },
    ]
  }
];
