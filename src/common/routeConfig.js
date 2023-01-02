import Marketing from '$containers/Marketing';
import Home from '$containers/Home';
import Recommendation from '$containers/Recommendation';
import NewRelease from '$containers/NewRelease'
import OnBoarding from '$containers/OnBoarding';
import Main from '$containers/Main';
import Media from '$containers/Media';
import MediaUpload from '$containers/Media/MediaUpload';
import NewMediaCategory from '$containers/Media/NewMediaCategory';
import NewAlbum from '$containers/Media/NewAlbum';
import NewVideo from '$containers/Media/NewVideo';
import Artist from '$containers/Artist';
import ArtistNew from '$containers/Artist/NewArtist';
import ArtistView from '$containers/Artist/ViewArtist';
import ArtistStats from '$containers/Artist/StatsArtist'; // Deprecated
import ResetPassword from '$containers/ResetPassword';
import SuccessPage from '$containers/Success';
import Favorites from '$containers/Favorites';
import History from '$containers/History';
import ViewMedia from '$containers/Media/ViewMedia';
import PlaylistPage from '$containers/Playlist';
import Insights from '$containers/Insights';
import Profile from '$containers/Profile';
import NotFound from '../containers/NotFound';

import { Slider } from '../containers/Slider';
import { AddSliderForm } from '../containers/Slider/AddSliderForm';
import { EditSliderForm } from '../containers/Slider/EditSliderForm';
import { ViewSlider } from '../containers/Slider/ViewSlider';
import { Configuration } from '../containers/Configuration';
import { Sliders } from '../containers/Configuration/Sliders';
import TopMedias from '../containers/TopMedias';
import GuestViewMedia from '$containers/GuestViewMedia';
import { ManagerPanel } from '../containers/ManagerPanel';
import { SocialMediaMain } from '../containers/socialmediaMain';
import { SocialMediaFeed } from '../containers/socialMediaFeed';
import { NewSeries } from '../containers/Media/NewSeries';
import { ManageSeriesProfile } from '../containers/Media/ManageSeriesProfile';
import { PrivacyPolicyPage } from '../containers/LegalPages/privacy';
import LoginPage from '../containers/Login/index';
import RegisterPage from '../containers/Register/index';
import TheatreContainer from '../containers/Media/Theatre/index';
import PaymentContainer from '../containers/Payment';
import { CreatePaymentMethodContainer } from '../containers/Payment/CreatePaymentMethod/index';
import { SubscriptionContainer } from '../containers/Subscription/index';
import SubscriptionShowContainer from '../containers/Subscription/show/index';
import { SubscriptionConfiguration } from '../containers/Configuration/Subscription/index';
import { ManageMedia } from '../containers/ManagerPanel/media';
import { ManageArtists } from '../containers/ManagerPanel/artists/index';
import { ManageAlbum } from '../containers/ManagerPanel/albums';
import { ManageSeries } from '../containers/ManagerPanel/series';
import { MusicContainer } from '../containers/Media/Music/index';
import { VideosContainer } from '../containers/Media/Videos/index';
import { FacebookDataDeletionStatus } from '../containers/LegalPages/FacebookDataDeletionStatus';
import ViewMediaCollection from '../containers/Media/ViewCollection/index';
import ArtistList from '../containers/Artist/List/index';
import { MediaDescriptionPage } from '../containers/Media/Description/index';
import { WatchMovie } from '../containers/Media/Watch';
import { SeriesDescriptionPage } from '../containers/Media/SeriesDescription/index';
import { MediaListPage } from '../containers/Media/MediaList';
import SocialMediaMessagesPage from '../containers/socialmedia/messages';
import { MediaOptimizationLogs } from '../containers/ManagerPanel/logs/logs';
import { AboutPage } from '../containers/About';
import { ContactPage } from '../containers/Contact';
import { DisclaimerPage } from '../containers/Disclaimer';
import { DMCAPage } from '../containers/DMCA';
import { ManageUsers } from '../containers/ManagerPanel/users';

export const routePaths = {
  main: '/app',
  
  marketing: '/',

  guest: '/guest',
  guestMedia: 'guest/media',
  guestViewMedia: '/guest/media/:id',
  guestViewMediaCollection: '/guest/media/collection/:id',

  login: "/login",
  register: "/register",
  onBoarding: '/on-boarding',
  notFound: '/not-found',
  resetPassword: '/reset-password',
  home: '/app/home',
  recommendation: '/app/recommendation',
  newRelease: '/app/new-release',
  topChart: '/app/top-chart',
  feeds: '/app/feeds',
  media: '/app/media',
  theatre: '/app/media/theatre',
  music: '/app/media/music',
  videos: '/app/media/videos',
  newAlbum: '/app/media/new-album',
  newSeries: "/app/media/new-series",
  mySeries: '/app/media/series',
  manageSeries: '/app/media/series/:series_id?',
  newVideo: '/app/media/new-video',
  newMediaCategory: '/app/media/select-category',
  mediaUpload: '/app/media/upload',
  describeMedia: '/app/media/:id/describe',
  describeSeries: '/app/media/series/:series_id/describe',
  watchMovie: '/app/media/:id/watch',
  mediaList: '/app/media/list',
  viewMedia: '/app/media/:id',
  viewCollection: '/app/media/collection',
  artist: '/app/artist',
  artistList: '/app/artist/list',
  newArtist: '/app/artist/new',
  statsArtist: '/app/artist/:id/stats',
  viewArtist: '/app/artist/:id',
  success: '/app/success',
  history: '/app/history',
  favorites: '/app/favorites',
  playlist: '/app/playlist/:id',
  insights: '/app/insights',
  profile: '/app/profile',
  payments: '/app/payments',
  paymentsCreate: '/app/payments/create',
  subscriptions: '/app/subscriptions',
  subscriptionShow: '/app/subscriptions/:id',
  slider: '/app/slider',
  sliderCreate: '/app/slider/create',
  sliderEdit: '/app/slider/:slider_id/edit',
  sliderShow: '/app/slider/:slider_id',
  sliderPictureCreate: 'app/slider/:slider_id/create-picture',
  sliderPictureEdit: 'app/slider/:slider_id/edit-picture/:pictureid',

  managerPanel: '/app/manager-panel',
  manageMedia: '/app/manager-panel/media/:category',
  manageArtist: '/app/manager-panel/artists',
  manageAlbums: '/app/manager-panel/albums',
  manageAlbumSongs: '/app/manager-panel/albums/:id',
  managerPanelManageSeries: '/app/manager-panel/series',
  managerPanelManageSeriesEpisods: '/app/manager-panel/series/:id',
  managerPanelMediaOptimizationLogs: '/app/manager-panel/media/optimization/:media_id/logs',
  managerUsers: '/app/manager-panel/users',

  //configuration/settings
  configurations: '/app/settings',
  configSliders: '/app/settings/sliders',
  configSubscriptions: '/app/settings/subscriptions',

  socialmedia: '/social',
  feed: '/social/feed',
  socialMessages: '/social/messages',
  timeline: '/social/timeline',
  page: '/social/page',
  chat: '/social/chat',
  socialprofile: '/social/profile',

  privacy: '/privacy',
  tos: '/TOS',
  facebook_data_deletion_status: '/facebook-data-deletion-status/:confirmation_code?',

  about: '/about',
  contact: '/contact',
  disclaimer: '/disclaimer',
  cookies: '/cookies',
  dmca: '/dmca',
  refund: '/refund',
};

const roles = {
  'visitor': ['Visitor', 'User', 'Artist', 'Admin', 'Super Admin'],
  'user': ['User', 'Artist', 'Admin', 'Super Admin'],
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
  guest: (token, role) => {
    if (token) {
      return routePaths.home;
    }
    return false;
  },
  admin: (token, role) => {
    if (!token) {
      return routePaths.marketing;
    }

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
    path: routePaths.about,
    component: AboutPage,
  },
  {
    ...defaultConfig,
    path: routePaths.contact,
    component: ContactPage,
  },
  {
    ...defaultConfig,
    path: routePaths.disclaimer,
    component: DisclaimerPage,
  },
  {
    ...defaultConfig,
    path: routePaths.dmca,
    component: DMCAPage,
  },
  {
    ...defaultConfig,
    path: routePaths.login,
    component: LoginPage,
  },
  {
    ...defaultConfig,
    path: routePaths.register,
    component: RegisterPage,
  },
  // {
  //   ...defaultConfig,
  //   path: routePaths.guestViewMedia,
  //   component: GuestViewMedia,
  // },
  {
    ...defaultConfig,
    path: routePaths.onBoarding,
    component: OnBoarding,
    redirect: redirectFunctions.app
  },
  {
    ...defaultConfig,
    path: routePaths.resetPassword,
    component: ResetPassword,
  },
  {
    ...defaultConfig,
    path: routePaths.privacy,
    component: PrivacyPolicyPage,
  },
  {
    ...defaultConfig,
    path: routePaths.tos,
    component: PrivacyPolicyPage,
  },
  {
    ...defaultConfig,
    path: routePaths.facebook_data_deletion_status,
    component: FacebookDataDeletionStatus,
  },
  {
    ...defaultConfig,
    path: routePaths.notFound,
    component: NotFound,
  },
  {
    ...defaultConfig,
    path: routePaths.watchMovie,
    component: WatchMovie,
    redirect: redirectFunctions.app,
  },
  {
    ...defaultConfig,
    path: routePaths.guest,
    component: Main,
    exact: false,
    // redirect: redirectFunctions.guest,
    routes: [
      {
        ...defaultConfig,
        path: routePaths.guestMedia,
        component: Media,
        exact: false,
        routes: [
          {
            ...defaultConfig,
            path: routePaths.guestViewMedia,
            component: ViewMedia,
            redirect: redirectFunctions.guest,
          },
        ],
      },
    ],
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
        component: Recommendation,
        redirect: redirectFunctions.app
      },
      {
        ...defaultConfig,
        path: routePaths.newRelease,
        component: NewRelease,
        redirect: redirectFunctions.app
      },
      {
        ...defaultConfig,
        path: routePaths.topChart,
        component: TopMedias,
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
        path: routePaths.history,
        component: History,
        redirect: redirectFunctions.app
      },
      {
        ...defaultConfig,
        path: routePaths.favorites,
        component: Favorites,
        redirect: redirectFunctions.app
      },
      {
        ...defaultConfig,
        path: routePaths.success,
        component: SuccessPage,
        redirect: redirectFunctions.app
      },
      {
        ...defaultConfig,
        path: routePaths.playlist,
        component: PlaylistPage,
        redirect: redirectFunctions.app
      },
      {
        ...defaultConfig,
        path: routePaths.insights,
        component: Insights,
        redirect: redirectFunctions.app
      },
      {
        ...defaultConfig,
        path: routePaths.profile,
        component: Profile,
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
            path: routePaths.artistList,
            component: ArtistList,
            redirect: redirectFunctions.app,
          },
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
            path: routePaths.mediaList,
            component: MediaListPage,
            redirect: redirectFunctions.app,
          },
          {
            ...defaultConfig,
            path: routePaths.viewCollection,
            component: ViewMediaCollection,
            redirect: redirectFunctions.app,
          },
          {
            ...defaultConfig,
            path: routePaths.theatre,
            component: TheatreContainer,
            redirect: redirectFunctions.app,
          },
          {
            ...defaultConfig,
            path: routePaths.music,
            component: MusicContainer,
            redirect: redirectFunctions.app,
          },
          {
            ...defaultConfig,
            path: routePaths.videos,
            component: VideosContainer,
            redirect: redirectFunctions.app,
          },
          {
            ...defaultConfig,
            path: routePaths.newMediaCategory,
            component: NewMediaCategory,
            redirect: redirectFunctions.app,
          },
          {
            ...defaultConfig,
            path: routePaths.newAlbum,
            component: NewAlbum,
            redirect: redirectFunctions.app,
          },
          {
            ...defaultConfig,
            path: routePaths.newSeries,
            component: NewSeries,
            redirect: redirectFunctions.app,
          },
          {
            ...defaultConfig,
            path: routePaths.describeSeries,
            component: SeriesDescriptionPage,
            redirect: redirectFunctions.app,
          },
          {
            ...defaultConfig,
            path: routePaths.manageSeries,
            component: ManageSeriesProfile,
            redirect: redirectFunctions.app,
          },
          {
            ...defaultConfig,
            path: routePaths.mySeries,
            component: ManageSeriesProfile,
            redirect: redirectFunctions.app,
          },
          {
            ...defaultConfig,
            path: routePaths.newVideo,
            component: NewVideo,
            redirect: redirectFunctions.app,
          },
          {
            ...defaultConfig,
            path: routePaths.mediaUpload,
            component: MediaUpload,
            redirect: redirectFunctions.app,
          },
          {
            ...defaultConfig,
            path: routePaths.describeMedia,
            component: MediaDescriptionPage,
            redirect: redirectFunctions.app,
          },
          {
            ...defaultConfig,
            path: routePaths.viewMedia,
            component: ViewMedia,
            redirect: redirectFunctions.app,
          },
        ],
      },
      {
        ...defaultConfig,
        path: routePaths.payments,
        component: PaymentContainer,
        exact: false,
        routes: [
          {
            ...defaultConfig,
            path: routePaths.paymentsCreate,
            component: CreatePaymentMethodContainer,
            redirect: redirectFunctions.app,
          },
        ],
      },
      {
        ...defaultConfig,
        path: routePaths.subscriptions,
        component: SubscriptionContainer,
        exact: false,
        routes: [
          {
            ...defaultConfig,
            path: routePaths.subscriptionShow,
            component: SubscriptionShowContainer,
            redirect: redirectFunctions.app,
          },
        ],
      },
      {
        ...defaultConfig,
        path: routePaths.slider,
        component: Slider,
        exact: false,
        routes: [
          {
            ...defaultConfig,
            path: routePaths.sliderCreate,
            component: AddSliderForm,
            redirect: redirectFunctions.app,
          },
          {
            ...defaultConfig,
            path: routePaths.sliderEdit,
            component: EditSliderForm,
            redirect: redirectFunctions.app,
          },
          {
            ...defaultConfig,
            path: routePaths.sliderShow,
            component: ViewSlider,
            redirect: redirectFunctions.app,
          },
        ]
      },
      {
        ...defaultConfig,
        path: routePaths.configurations,
        component: Configuration,
        exact: false,
        routes: [
          {
            ...defaultConfig,
            path: routePaths.configSliders,
            component: Sliders,
            redirect: redirectFunctions.app,
          },
          {
            ...defaultConfig,
            path: routePaths.configSubscriptions,
            component: SubscriptionConfiguration,
            redirect: redirectFunctions.app,
          }
        ]
      },
      {
        ...defaultConfig,
        path: routePaths.managerPanel,
        component: ManagerPanel,
        exact: false,
        routes: [
          {
            ...defaultConfig,
            path: routePaths.manageMedia,
            component: ManageMedia,
            redirect: redirectFunctions.app
          },
          {
            ...defaultConfig,
            path: routePaths.manageArtist,
            component: ManageArtists,
            redirect: redirectFunctions.app
          },

          {
            ...defaultConfig,
            path: routePaths.manageAlbums,
            component: ManageAlbum,
            redirect: redirectFunctions.app,
          },
          {
            ...defaultConfig,
            path: routePaths.manageAlbumSongs,
            component: ManageMedia,
            redirect: redirectFunctions.app
          },
          {
            ...defaultConfig,
            path: routePaths.managerUsers,
            component: ManageUsers,
            redirect: redirectFunctions.app
          },
          {
            ...defaultConfig,
            path: routePaths.managerPanelManageSeries,
            component: ManageSeries,
            redirect: redirectFunctions.app
          },
          {
            ...defaultConfig,
            path: routePaths.managerPanelManageSeriesEpisods,
            component: ManageMedia,
            redirect: redirectFunctions.app
          },
          {
            ...defaultConfig,
            path: routePaths.managerPanelMediaOptimizationLogs,
            component: MediaOptimizationLogs,
            redirect: redirectFunctions.app
          }
        ],
      },
    ],
  },
  {
    ...defaultConfig,
    path: routePaths.socialmedia,
    component: SocialMediaMain,
    exact: false,
    routes: [
      {
        ...defaultConfig,
        path: routePaths.feed,
        component: SocialMediaFeed,
        redirect: redirectFunctions.app
      },
      {
        ...defaultConfig,
        path: routePaths.socialMessages,
        component: SocialMediaMessagesPage,
        redirect: redirectFunctions.app
      },
    ],
  }
];
