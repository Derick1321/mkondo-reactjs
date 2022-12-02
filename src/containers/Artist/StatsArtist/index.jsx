import React from 'react';
import InsightComponent from '../../Insights/insight';
import ArtistHero from '../ViewArtist/Hero';
import { useSelector } from 'react-redux';

const StatsArtist = () => {
  // router

  // redux
  const user = useSelector(state => state.authentication.user);

  return (
    <div className="container">
      <ArtistHero artist={user} />
      <div className="row">
        <div className="col">
          {/* <h3 className="text-light">ARTISTS INSIGHTS</h3> */}
          <div className="d-flex">
            <InsightComponent name="Media" />
            <InsightComponent name="Plays" />
            <InsightComponent name="Likes" />
            <InsightComponent name="Comments" />
            <InsightComponent name="Shares" />
            <InsightComponent name="Favourites" />
            <InsightComponent name="Followers" />
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
            <th>Plays</th>
            <th>Likes</th>
            <th>Comments</th>
            <th>Shares</th>
            <th>Favourites</th>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default StatsArtist;
