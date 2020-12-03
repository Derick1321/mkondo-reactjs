import Marketing from '$containers/Marketing';
import Home from '$containers/Home';
import OnBoarding from '$containers/OnBoarding';
import Main from '$containers/Main';
import Media from '$containers/Media';
import MediaNew from '$containers/Media/NewMedia';
import Artist from '$containers/Artist';
import ArtistNew from '$containers/Artist/NewArtist';
import ArtistView from '$containers/Artist/ViewArtist';
import ArtistStats from '$containers/Artist/StatsArtist';

export const routePaths = {
  main: '/app',
  marketing: '/',
  onBoarding: '/on-boarding',
  home: '/app/home',
  recommendation: '/app/recommendation',
  newRelease: '/app/new-release',
  topChart: '/app/top-chart',
  feeds: '/app/feeds',
  media: '/app/media',
  newMedia: '/app/media/new',
  artist: '/app/artist',
  newArtist: '/app/artist/new',
  viewArtist: '/app/artist/view',
  statsArtist: '/app/artist/stats',
};

const roles = {
  'artist': ['Artist', 'Super Admin', 'Admin'],
  'admin': ['Admin', 'Super Admin'],
}

const redirectFunctions = {
  app: (token, role) => {
    if (!token) {
      return routePaths.marketing;
    }
    return false;
  },
  admin: (token, role) => {
    if (!token) {
      return routePaths.marketing;
    }

    console.log('TF!');
    if (!roles.admin.includes(role)) {
      return routePaths.home;
    }

    return false;
  }
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
    path: routePaths.onBoarding,
    component: OnBoarding,
    redirect: redirectFunctions.app
  },
  {
    ...defaultConfig,
    path: routePaths.main,
    component: Main,
    exact: false,
    routes: [
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
      {
        ...defaultConfig,
        path: routePaths.feeds,
        component: Home,
        redirect: redirectFunctions.app
      },
      {
        ...defaultConfig,
        path: routePaths.artist,
        component: Artist,
        exact: false,
        routes: [
          {
            ...defaultConfig,
            path: routePaths.newArtist,
            component: ArtistNew,
            redirect: redirectFunctions.app,
          },
          {
            ...defaultConfig,
            path: routePaths.viewArtist,
            component: ArtistView,
            redirect: redirectFunctions.app,
          },
          {
            ...defaultConfig,
            path: routePaths.statsArtist,
            component: ArtistStats,
            redirect: redirectFunctions.app,
          },
        ]
      },
      {
        ...defaultConfig,
        path: routePaths.media,
        component: Media,
        exact: false,
        routes: [
          {
            ...defaultConfig,
            path: routePaths.newMedia,
            component: MediaNew,
            redirect: redirectFunctions.app,
          },
        ]
      }
    ]
  }
];
