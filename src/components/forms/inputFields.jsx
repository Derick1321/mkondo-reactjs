import React from 'react';

const inputField = (props) => {
  // props
  const { type } = props;

  // handlers
  const buildField = () => {
    switch(type) {
      case 'text':
      case 'password':
        return null;
      default:
        break;
    }
  }

  // render
  return (
    <div>
      {buildField()}
    </div>
  );
}