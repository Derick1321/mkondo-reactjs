import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = (props) => {
  // props
  const { title } = props;

  // render
  return (
    <div className="form-group">
      <div className="form-check">
        <input className="form-check-input" type="checkbox" id="gridCheck" />
        <label className="form-check-label" for="gridCheck">
          {title}
        </label>
      </div>
    </div>
  )
}

Checkbox.defaultProps = {
  title: '',
}

Checkbox.propTypes = {
  title: PropTypes.string,
}

export default Checkbox;
