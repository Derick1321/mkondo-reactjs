import React from 'react';
import Select from 'react-select';

import TextArea from '$components/common/TextArea';
import TextInput from '$components/common/TextInput';
import Checkbox from '$components/forms/Checkbox';

const InputField = (props) => {
  // props
  const { field, onChange } = props;

  // handlers
  const buildField = (field) => {
    switch(field.type) {
      case 'text':
      case 'password':
        return (
          <TextInput
            name={field.name}
            placeholder={field.placeholder}
            value={field.value}
            onChange={onChange}
          />
        );
      case 'area':
        return (
          <TextArea
            name={field.name}
            placeholder={field.placeholder}
            value={field.value}
            onChange={onChange}
          />
        );
      case 'select':
        return (
          <Select
            options={field.options}
            isMulti={field.isMulti}
            onChange={onChange}
          />
        );
      case 'checkbox':
        return (
          <Checkbox />
        )
      default:
        break;
    }
  }

  // render
  return (
    <div>
      {buildField(field)}
    </div>
  );
}

export default InputField;
