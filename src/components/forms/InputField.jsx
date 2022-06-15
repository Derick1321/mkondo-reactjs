import React from 'react';

import TextArea from '$components/common/TextArea';
import TextInput from '$components/common/TextInput';
import Checkbox from '$components/forms/Checkbox';
import InputDate from '$components/forms/Date';
import SelectInput from '$components/forms/Select';
import SocialInput from '$components/forms/SocialInput';
import { CountryDropdown, CountryRegionData } from 'react-country-region-selector';

const InputField = (props) => {
  // props
  const { field, error, onChange, isGrey } = props;

  // handlers
  const buildField = (field) => {
    switch(field.type) {
      case 'text':
      case 'password':
      case 'number':
        return (
          <TextInput
            {...field}
            isGrey={isGrey ?? true}
            error={error}
            onChange={onChange}
          />
        );
      case 'area':
        return (
          <TextArea
            {...field}
            isGrey
            error={error}
            onChange={onChange}
          />
        );
      case 'select':
        return (
          <div>
            <SelectInput
              {...field}
              isGrey
              error={error}
              onChange={onChange}
            />
          </div>
        );
      case 'checkbox':
        return (
          <Checkbox
            {...field}
            onChange={onChange}
          />
        )
      case 'date':
        return (
          <InputDate
            {...field}
            isGrey
            error={error}
            onChange={onChange}
          />
        )
      case 'social':
        return (
          <SocialInput
            {...field}
            onChange={onChange}
            isGrey
          />
        )
      case 'country':
        return (
          <div style={{ width: 100 }}>
            <SelectInput
              {...field}
              options={CountryRegionData.map(data => {
                return {label: data[0], value: data[1]};
              })}
              isGrey
              error={error}
              onChange={onChange}
            />
          </div>
        );
      default:
        return null; 
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
