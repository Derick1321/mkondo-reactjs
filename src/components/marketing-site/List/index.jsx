import React from 'react';

import './index.scss';

const List = (props) => {
  // props
  const { num, title, description } = props;
  return (
    <div className="d-flex">
      <div className="list-num-wrapper d-flex justify-content-center align-items-center">
        <span>{num}</span>
      </div>
      <div className="list-content-wrapper">
        <p className="list-header mb-0">{title}</p>
        <p className="list-description">{description}</p>
      </div>
    </div>
  );
}

export default List;
