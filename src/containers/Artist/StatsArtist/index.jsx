import React from 'react';
import InsightComponent from '../../Insights/insight';
import ArtistHero from '../ViewArtist/Hero';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getArtistInsights } from '../../../redux/features/artist';
import { kFormatter } from '$common/utils';
import * as styles from './index.module.scss';
import { routePaths } from '../../../common/routeConfig';


const StatsArtist = () => {
  // router
  const { id: artistId } = useParams();

  // router
  const { push } = useHistory();

  // redux
  const dispatch = useDispatch();
  const insights = useSelector(state => state.artist.insights);
  const getArtistInsightsState = useSelector(state => state.artist.getArtistInsights);

  // effects
  useEffect(() => {
    dispatch(getArtistInsights(artistId));
  }, [artistId]);
  
  // render
  if (getArtistInsightsState.loading) return <p className='text-light p-5 '>Loading Insights for the Artist</p>;
  if (Object.keys(insights).length == 0) return <p className='text-light p-5 '>Failed to Fetch Insights for the Artist</p>;

  return (
    <div className="container">
      <ArtistHero artist={insights.user} />

        <div className={styles.withdraw}>
          Earnings: {kFormatter(insights.plays * 0.002)} TZS<br />
          <button className="btn btn-success mt-3" onClick={() => push(routePaths.createWithdrawal)} title='You can withdraw your funds when you have more than 200 Followers, 1000 Plays and more than 100,000 TZS as your wallet balance.'>Withdraw</button>
        </div>
      <div className="row">
        <div className="col">
          {/* <h3 className="text-light">ARTISTS INSIGHTS</h3> */}
          <div className="d-flex">
            <InsightComponent name="Media" value={insights.content} />
            <InsightComponent name="Plays" value={insights.plays} />
            <InsightComponent name="Likes" value={insights.likes} />
            <InsightComponent name="Comments" value={insights.comments} />
            <InsightComponent name="Shares" value={insights.shares} />
            <InsightComponent name="Favourites" value="0" />
            <InsightComponent name="Followers" value={insights.user.followers.length} />
          </div>
        </div>
      </div>


      <div className='mt-5'>
        <h3 className='text-light'>MEDIA LIST</h3>
      </div>

      <table className="table">
        <thead>
          <tr className='text-light'>
            <th>#</th>
            <th>Media Details</th>
            <th>Media Category</th>
            <th>Plays</th>
            <th>Likes</th>
            <th>Comments</th>
            <th>Shares</th>
            <th>Favourites</th>
          </tr>
        </thead>

        <tbody>
          {insights.media.map((media, index) => (
            <tr key={index} className="text-light">
              <td>{index + 1}</td>
              <td>{media.media_id} <br />{media.media_name}</td>
              <td>{media.category}</td>
              <td>{media.plays}</td>
              <td>{media.likes}</td>
              <td>{media.comments}</td>
              <td>{media.shares ?? 0}</td>
              <td>{media.favourites ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StatsArtist;
