import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Select from 'react-select';

const SelectInput = (props) => {
  // props
  const {
    title,
    options,
    onChange,
    isMulti,
    value,
    placeholder,
    name,
  } = props;

  const lang = useSelector(store => store.user.language);
  const { t, i18n } = useTranslation('common');
  useEffect(() => { i18n.changeLanguage(lang); }, [lang]);

  // handler
  const handleChange = (value, item) => {
    onChange(item.name, value);
  }

  // render
  return (
    <>
      <p>{t(title)}</p>
      <Select
        name={name}
        options={options}
        onChange={handleChange}
        value={value}
        isMulti={isMulti}
        placeholder={t(placeholder)}
      />
    </>
  );
}

export default SelectInput;
