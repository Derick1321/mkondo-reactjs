import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Tabs from '$components/common/Tabs';
import LineChart from '$components/common/LineChart';
import Table from '$components/common/Table';

import { kFormatter } from '$common/utils';
import { getSystemInsight, searchUsers } from '$redux/features/user';

import styles from './index.module.scss';
import { COLOR_PRIMARY } from '../../common/constants';
import { COLOR_ACCENT } from '$common/constants';
import { ManageArtistItem } from '../ManagerPanel/artists/item';
import { ArtistListArtistWidget } from '../Artist/List/widgets/artist';
import { getArtistInsights, getArtists } from '../../redux/features/artist';
import user, { getAdminInsights } from '../../redux/features/user';
import ArtistAvatarComponent from '../../components/common/artist/avatar/index';

const options = [
  { name: 'insights', title: 'Insights' },
];

const systemOptions = [
  { name: 'system', title: 'System Insights' },
  { name: 'insights', title: 'Manager Insights' },
];

const getSum = (data) => {
  return data.reduce((acc, curr) => acc + parseInt(curr), 0);
}

const Insights = () => {
  // state
  const [selected, setSelected] = useState('insights');
  const [selectedArtist, setSelectedArtist] = useState(null)

  // store
  const dispatch = useDispatch();
  const followers = useSelector((store) => store.authentication.user.followers);
  const userId = useSelector((store) => store.authentication.user.user_id);
  const userType = useSelector((store) => store.authentication.user.user_type);
  const data = useSelector((store) => store.artist.insights);
  const systemData = useSelector((store) => store.user.insights);
  const users = useSelector((store) => store.user.users.data);
  const artists = useSelector((store) => store.artist.artists);
  const adminInsights = useSelector(state => state.user.adminInsights);

  const isSuperAdmin = userType === 'super admin';
  const isArtist = userType === 'creator'
  const isAdmin = userType === 'admin'

  // effects
  useEffect(() => {
    dispatch(getArtists());
  }, []);

  useEffect(() => {
    if (!userId) return;
    // if (!isArtist) return;

    dispatch(getArtistInsights(userId));
    // dispatch 
  }, [userId, isArtist]);

  useEffect(() => {
    if (!isSuperAdmin) return;
    dispatch(getSystemInsight());
    dispatch(searchUsers());
    setSelected('system');
  }, [isSuperAdmin]);

  useEffect(() => {
    if (!isAdmin) return;
    dispatch(getAdminInsights());
  }, [isAdmin]);
  
  const calculatePlays = () => {
    if (adminInsights.artist_insights) {
      const total_plays = adminInsights.artist_insights.filter(a => selectedArtist ? selectedArtist == a.user.user_id : true).reduce((p, c, i) => p + c.plays, 0);
      return total_plays;
    }
    
    if (data) {
      return data.plays;
    }

  }

  const calculateContent = () => {
    return 18
  }

  const calculateFollowers = () => {
    if (adminInsights.artist_insights) {
      const total = adminInsights.artist_insights.filter(a => selectedArtist ? selectedArtist == a.user.user_id : true).reduce((p, c, i) => p + c.followers, 0);
      return total;
    };
    
  }

  const calculateShares = () => {
    if (adminInsights.artist_insights) {
      const total = adminInsights.artist_insights.filter(a => selectedArtist ? selectedArtist == a.user.user_id : true).reduce((p, c, i) => p + c.shares, 0);
      return total;
    }
    
    if (data) {
      return data.shares;
    }
  }

  const calculateLikes = () => {
    if (adminInsights.artist_insights) {
      const total = adminInsights.artist_insights.filter(a => selectedArtist ? selectedArtist == a.user.user_id : true).reduce((p, c, i) => p + c.likes, 0);
      return total;
    }

    if (data) {
      return data.likes;
    }
    
  }

  const calculateComments = () => {
    if (adminInsights.artist_insights) {
      const total = adminInsights.artist_insights.filter(a => selectedArtist ? selectedArtist == a.user.user_id : true).reduce((p, c, i) => p + c.comments, 0);
      return total;
    }
  }
  // handlers
  const buildPane = (name, value) => (
    <div className={`d-flex flex-column text-center ${styles.bubbleWrapper}`}>
      <p className={styles.bubbleTitle}>{name}</p>
      <div className={`d-flex justify-content-center align-items-center ${styles.bubble}`}>
        <span>{value}</span>
      </div>
    </div>
  );

  const systemPanel = (
    <>
      <div className="d-flex flex-column">
        <span className={styles.title}>
          {kFormatter(getSum([
            systemData.artists,
            systemData.publishers,
            systemData.listeners])) || 0} Users
        </span>
        <div className={styles.titleBorder} />
      </div>
      <div className={`d-flex flex-wrap ${styles.dataWrapper} mb-4`}>
        {buildPane('Artists', kFormatter(systemData.artists || 0))}
        {buildPane('Publishers', kFormatter(systemData.publishers || 0))}
        {buildPane('Listeners', kFormatter(systemData.listeners || 0))}
      </div>
      <Table
        data={users || []}
      />
    </>
  );

  const insightsPanel = (
    <>
      <div className="d-flex flex-column">
        <span className={styles.title}>Insights</span>
        <div className={styles.titleBorder} />
      </div>
      <div className={`my-5 d-flex`}>
        <div className="mr-2" onClick={() => setSelectedArtist(null)}>
          {buildPane('', 'All')}
        </div>
        {artists.filter(artist => isSuperAdmin ? true : (isAdmin ? artist.admin_id === userId : artist.user_id === userId)).map(artist => (
          <div className='mr-2' onClick={() => setSelectedArtist(artist.user_id)} >
            <ArtistAvatarComponent artist={artist} size={150} />
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4">
        <LineChart />
      </div>
      <div className={`d-flex flex-wrap ${styles.dataWrapper}`}>
        {buildPane('Content', kFormatter(calculateContent() || 0))}
        {/* {buildPane('Songs', kFormatter(calculateContent() || 0))}
        {buildPane('Videos', kFormatter(calculateContent() || 0))}
        {buildPane('Movies', kFormatter(calculateContent() || 0))} */}
        {buildPane('Plays', kFormatter(calculatePlays() || 0))}
        {buildPane('Likes', kFormatter(calculateLikes() || 0))}
        {buildPane('Comments', kFormatter(calculateComments() || 0))}
        {buildPane('Shares', kFormatter(calculateShares() || 0))}
        {buildPane('Followers', kFormatter(calculateFollowers() || 0))}
        {/* {buildPane('Shares', kFormatter(calculateShares() || 0))} */}
        
        
      </div>
    </>
  );
    
  // render
  return (
    <div className={styles.container}>
      <div className={styles.tabsWrapper}>
        <Tabs
          onSelect={setSelected}
          selected={selected}
          options={ isSuperAdmin ? systemOptions : options}
          name="insightsTab"
          activeColor={COLOR_ACCENT}
        />
      </div>
      <div className="row">
        <div className="col-12 col-md-10 offset-md-1">
          {
              insightsPanel
          }
        </div>
      </div>
    </div>
  );
}

export default Insights;
