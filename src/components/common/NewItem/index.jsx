import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Tabs from '$components/common/Tabs';
import InputField from '$components/forms/InputField';

const options = [
  { name: 'basic', title: 'Basic' },
  { name: 'metadata', title: 'Metadata' },
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
  const [selected, setSelected] = useState(options[0].name);

  // handlers
  const handleSelect = (item) => {
    setSelected(item);
  }

  // render
  return (
    <div className="">
      <p>{title}</p>
      <Tabs
        options={options}
        onSelect={handleSelect}
        selected={selected}
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
              <div className="" key={`new-item-menu-${idx}`}>
                <InputField
                  field={menu}
                  onChange={onChange}
                />
              </div>
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
