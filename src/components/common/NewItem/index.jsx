import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Tabs from '$components/common/Tabs';
import TextInput from '$components/common/TextInput';

const options = [
  { name: 'basic', value: 'Basic' },
  { name: 'metadata', value: 'Metadata' },
]

const NewItem = (props) => {
  // props
  const {
    title,
    menus,
    onChange,
    values,
  } = props;

  // state


  // handlers
  const handleSelect = (item) => {
  }

  // render
  return (
    <div className="">
      <p>{title}</p>
      <Tabs
        options={options}
        onSelect={handleSelect}
        name="newItem"
      />
      <div className="row">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="avatar">
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-8">
          {
            menus.map((menu, idx) => (
              <div className="" />
            ))
          }
        </div>
      </div>
    </div>
  );
}

NewItem.defaultProps = {
  title: 'Create Artist',
};

NewItem.propTypes = {
  title: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default NewItem;
