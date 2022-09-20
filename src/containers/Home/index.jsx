import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import ScrollMedia from '$components/media/ScrollMedia';
import TabsMark from '$components/common/TabsMark';

import { getNewReleases, getTopMedias, getRandomMedias, getTrendMedias } from '$redux/features/media';

import styles from './index.module.scss';
import { routePaths } from '../../common/routeConfig';
import { selectConfigurations, selectConfigurationByKey, fetchConfigurations } from '../../redux/features/configuration';
import { CONFIG_KEY_SLIDER_DASHBOARD } from '../Configuration/Sliders';
import { fetchSliders, selectSliderById } from '../../redux/features/slider';
import { Carousel } from '../../components/common/Carousel';
import { getMediaUrl } from '../../common/utils';
import fireIcon from '$assets/images/icons/fire.svg';
import newTag from '$assets/images/icons/new-tag.svg';
import { MusicPlaylistComponent } from '../Media/Music/widgets/playlist';
import { getSeries, setMediaFilters, setMediaFiltersTitle } from '../../redux/features/media';
import { useHistory } from 'react-router-dom';
import ItemCarousel from '../../components/common/ItemCarousel/index';
import SeriesItemComponent from '../Media/Theatre/widgets/series';

const tabs = [
  { name: 'audio', title: 'audios' },
  { name: 'video', title: 'videos' },
  { name: 'movie', title: 'movies' },
  { name: 'series', title: 'series' },
];

const Home = () => {
  // react router
  const history = useHistory();

  // state
  const [selected, setSelected] = useState('audio');
  const [sliderItems, setSliderItems] = useState([]);

  // store
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.authentication);
  const newReleases = useSelector((store) => store.media.newReleases);
  const getNewReleasesPending = useSelector((store) => store.media.getNewReleasesPending);
  const addLikesPending = useSelector((store) => store.user.addLikesPending);
  const removeLikesPending = useSelector((store) => store.user.removeLikesPending);
  const topMedias = useSelector((store) => store.media.topMedias);
  const getTopMediasPending = useSelector((store) => store.media.getTopMediasPending);
  const randomMedias = useSelector((store) => store.media.randomMedias);
  const getRandomMediasPending = useSelector((store) => store.media.getRandomMediasPending);
  const trendMedias = useSelector((store) => store.media.trendMedias);
  const getTrendMediasPending = useSelector((store) => store.media.getTrendMediasPending);
  const favorites = useSelector((store) => store.authentication.user.favourites);
  const series = useSelector((state) => state.media.mySeries);

  const configurations = useSelector((state) => selectConfigurations(state));
  const slider_configuration = useSelector((state) => selectConfigurationByKey(state, CONFIG_KEY_SLIDER_DASHBOARD));
  const slider = useSelector((state) => slider_configuration ? selectSliderById(state, slider_configuration.value) : null);
  // const user_id = useSelector((store) => store.authentication.user_id);

  const lang = useSelector(store => store.user.language);
  const { t, i18n } = useTranslation('common');
  useEffect(() => { i18n.changeLanguage(lang); }, [lang]);

  // effects
  useEffect(() => {
    // add monitor?
    dispatch(getNewReleases({ category: 'audio' }));
    dispatch(getTopMedias({ category: 'audio' }));
    dispatch(getRandomMedias({ category: 'audio' }));
    dispatch(getTrendMedias({ category: 'audio' }));
    dispatch(getSeries());
    dispatch(fetchConfigurations());
    dispatch(fetchSliders());
  }, []);

  useEffect(() => {
    if (addLikesPending || removeLikesPending) {
      return;
    }
    dispatch(getNewReleases({ category: selected }));
    dispatch(getTopMedias({ category: selected }));
    dispatch(getRandomMedias({ category: selected }));
    dispatch(getTrendMedias({ category: selected }));
  }, [addLikesPending, removeLikesPending]);

  useEffect(() => {
    if (!slider || !slider.items) return;
    let _items = [];
    console.log(slider);
    slider.items.map((item, i) => {
      getMediaUrl(item.image_url, token).then(res => {
        _items.push(res);
        setSliderItems(_items);
        console.log(sliderItems, _items);
      })
    });
  }, [slider])

  // handlers
  const handleSelect = (name) => {
    setSelected(name);
    if (newReleases[name].length < 1) {
      dispatch(getNewReleases({ category: name }));
    }
    if (topMedias[name].length < 1) {
      dispatch(getTopMedias({ category: name }));
    }
    if (randomMedias[name].length < 1) {
      dispatch(getRandomMedias({ category: name }));
    }
    if (trendMedias[name].length < 1) {
      dispatch(getTrendMedias({ category: name }));
    }
  }

  const handleViewMore = (title, category, filters) => {
    dispatch(setMediaFiltersTitle(title));
    dispatch(setMediaFilters({
      category: category,
      ...filters,
    }))
    history.push(routePaths.mediaList);
  }

  // render
  return (
    <>
      <Carousel items={sliderItems} aspect_ratio_x={slider ? slider.aspect_ratio_x : 6} aspect_ratio_y={slider ? slider.aspect_ratio_y : 2} />
      <div className={`container`}>
        <div className={styles.homeTabsWrapper}>
          <TabsMark
            options={tabs}
            onSelect={handleSelect}
            selected={selected}
            activeColor="white"
          />
        </div>
        <div style={{clear: 'both'}}></div>
        <div className={selected !== 'audio' ? 'd-none' : ''}>
          {newReleases.audio.length ? <MusicPlaylistComponent title="New Songs" icon={newTag} media={newReleases.audio} more={`${routePaths.newRelease}`} onMoreClicked={() => handleViewMore("New Songs", "audio")} /> : null}
          {topMedias.audio.length ? <MusicPlaylistComponent title="Top Chart" icon={fireIcon} media={topMedias.audio} more={routePaths.topChart} onMoreClicked={() => handleViewMore("Top Chart", "audiote")} /> : null}
          {randomMedias.audio.length ? <MusicPlaylistComponent title="Random Media" media={randomMedias.audio} /> : null}
          {trendMedias.audio.length ? <MusicPlaylistComponent title="Trending Media" media={trendMedias.audio} /> : null}
          {favorites.filter((item) => item.category === 'audio').length ? <MusicPlaylistComponent title="Favorites" media={favorites.filter((item) => item.category === 'audio')} /> : null}
          {/* <ScrollMedia
            title={t('new_release')}
            values={newReleases.audio}
            isLoading={getNewReleasesPending && newReleases.audio.length < 1}
            name="audio-new-release"
            viewMore={`${routePaths.newRelease}`}
            showHeader
          /> */}
          {/* <ScrollMedia
            title={t('top_chart')}
            values={topMedias.audio}
            isLoading={getTopMediasPending && topMedias.audio.length < 1}
            name="audio-top-medias"
            viewMore={routePaths.topChart}
            showHeader
          />
          <ScrollMedia
            title={t('random_medias')}
            values={randomMedias.audio}
            isLoading={getRandomMediasPending && randomMedias.audio.length < 1}
            name="audio-random-medias"
            showHeader
          /> */}
          {/* <ScrollMedia
            title={t('trend_medias')}
            values={trendMedias.audio}
            isLoading={getTrendMediasPending && trendMedias.audio.length < 1}
            name="audio-trend-medias"
            showHeader
          /> */}
          {/* <ScrollMedia
            title={t('favorites')}
            name="audio-favorite"
            values={favorites.filter((item) => item.category === 'audio')}
          /> */}
        </div>
        <div className={selected !== 'video' ? 'd-none' : ''}>
          {newReleases.video.lenght ? <MusicPlaylistComponent title="New Videos" icon={newTag} media={newReleases.video} more={routePaths.newRelease}  onMoreClicked={() => handleViewMore("New Videos", "video")}  /> : null}
          {topMedias.video.length ? <MusicPlaylistComponent title="Top Chart" icon={fireIcon} media={topMedias.video} more={routePaths.topChart} onMoreClicked={() => handleViewMore("Top Charts", "video")} /> : null}
          {randomMedias.video.length ? <MusicPlaylistComponent title="Random Media" media={randomMedias.video} /> : null}
          {trendMedias.video.length ? <MusicPlaylistComponent title="Trending Media" media={trendMedias.video} /> : null}
          {favorites.filter((item) => item.category === 'video').length ? <MusicPlaylistComponent title="Favorites" media={favorites.filter((item) => item.category === 'video')} /> : null}
          {/* <ScrollMedia
            title={t('new_release')}
            name="video-new-release"
            values={newReleases.video}
            isLoading={getNewReleasesPending && newReleases.video.length < 1}
            viewMore={routePaths.newRelease}
            type="video"
          />
          <ScrollMedia
            title={t('top_chart')}
            name="video-top-medias"
            values={topMedias.video}
            isLoading={getTopMediasPending && topMedias.video.length < 1}
            viewMore={routePaths.topChart}
            type="video"
          />
          <ScrollMedia
            title={t('random_medias')}
            name="video-random-medias"
            values={randomMedias.video}
            isLoading={getRandomMediasPending && randomMedias.video.length < 1}
            type="video"
          />
          <ScrollMedia
            title={t('trend_medias')}
            name="video-trend-medias"
            values={trendMedias.video}
            isLoading={getTrendMediasPending && trendMedias.video.length < 1}
            type="video"
          />
          <ScrollMedia
            title={t('favorites')}
            name="video-favorite"
            values={favorites.filter((item) => item.category === 'video')}
            type="video"
          /> */}
        </div>
        <div className={selected !== 'movie' ? 'd-none' : ''}>
          {newReleases.movie.lenght ? <MusicPlaylistComponent title="New Movies" icon={newTag} media={newReleases.movie} more={routePaths.newRelease} onMoreClicked={() => handleViewMore("New Movies", "movie")} /> : null}
          {topMedias.movie.length ? <MusicPlaylistComponent title="Top Chart" icon={fireIcon} media={topMedias.movie} more={routePaths.topChart} onMoreClicked={() => handleViewMore("Top Chart", "movie")} /> : null}
          {randomMedias.movie.length ? <MusicPlaylistComponent title="Random Media" media={randomMedias.movie} /> : null}
          {trendMedias.movie.length ? <MusicPlaylistComponent title="Trending Media" media={trendMedias.movie} /> : null}
          {favorites.filter((item) => item.category === 'movie').length ? <MusicPlaylistComponent title="Favorites" media={favorites.filter((item) => item.category === 'movie')} /> : null}
          {/* <ScrollMedia
            title={t('new_release')}
            name="theatre-new-release"
            values={newReleases.movie}
            isLoading={getNewReleasesPending && newReleases.movie.length < 1}
            viewMore={routePaths.newRelease}
            type="video"
          />
          <ScrollMedia
            title={t('top_chart')}
            name="theatre-top-medias"
            values={topMedias.movie}
            isLoading={getTopMediasPending && topMedias.movie.length < 1}
            viewMore={routePaths.topChart}
            type="video"
          />
          <ScrollMedia
            title={t('random_medias')}
            name="theatre-random-medias"
            values={randomMedias.movie}
            isLoading={getRandomMediasPending && randomMedias.movie.length < 1}
            type="video"
          />
          <ScrollMedia
            title={t('trend_medias')}
            name="theatre-trend-medias"
            values={trendMedias.movie}
            isLoading={getTrendMediasPending && trendMedias.movie.length < 1}
            type="video"
          />
          <ScrollMedia
            title={t('favorites')}
            name="movie-favorite"
            values={favorites.filter((item) => item.category === 'movie')}
            type="video"
          /> */}
        </div>
        <div className={selected !== 'series' ? 'd-none' : ''}>
          {series.length ? <ItemCarousel title="New Series" icon={newTag} items={series.map(s => { return {series: s} })} component={SeriesItemComponent} /> : null}
        </div>
      </div>
    </>
  );
};

export default Home;
