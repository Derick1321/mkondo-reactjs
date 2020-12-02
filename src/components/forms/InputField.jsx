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
            isMulti={field.multi}
            onChange={onChange}
          />
        );
      case 'checkbox':
        return (
          <Checkbox
            name={field.name}
            title={field.title}
            onChange={onChange}
          />
        )
      default:
        break;
    }
  }

  // render
  return (
    <div className="mr-2 mb-2">
      {buildField(field)}
    </div>
  );
}

export default InputField;
