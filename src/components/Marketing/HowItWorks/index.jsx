import React from 'react';

import Feature from '$components/common/Feature';
import List from '$components/marketing/List';

import model from './model';

import './index.scss';

const HowItWorks = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-6">
          <p className="panel-header">How It Works</p>
          <p>consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>
          {
            model.map((datum, idx) => (
              <List
                key={`how-it-works-list-${idx}`}
                num={idx + 1}
                title={datum.title}
                description={datum.description}
              />
            ))
          }
        </div>
        <div className="col-12 col-md-6 how-it-works-feature">
          <Feature
              avatar="https://i.ibb.co/8b89DpX/image-8-1.png"
              source="https://i.ibb.co/0G3Mbwp/image-2.png"
              subtitle="Latest Release"
              title="Starboy by the Weekend"
              numOfSongs="14"
              duration="1hr 24min"
            />
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
