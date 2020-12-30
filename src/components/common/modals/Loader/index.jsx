import React from 'react';

import './index.scss';

const Loader = () => {
  // render
  return (
    <>
      <div className="d-flex align-items-center justify-content-center spinner-border-wrapper">
        <div className="spinner-border" role="status" />
        <p className="spinner-wrapper-text">Please wait...</p>
      </div>
    </>
  );
}

export default Loader;
