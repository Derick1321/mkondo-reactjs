import React from 'react';

import Feature from '$components/common/Feature';

import './index.scss';

const TopSongs = () => {
  // render
  return (
    <div className="container">
      <div className="d-flex flex-column">
        <div className="d-flex flex-wrap">
          {
            Array.apply(null, { length: 3 }).map((value, index) => (
              <Feature
                key={`featture-how-it-works-${index}`}
                avatar="https://i.ibb.co/8b89DpX/image-8-1.png"
                source="https://i.ibb.co/0G3Mbwp/image-2.png"
                subtitle="Latest Release"
                title="Starboy by the Weekend"
                numOfSongs=""
                duration=""
              />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default TopSongs;
