import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Preview from '$components/common/Preview';
import { showModal } from '$redux/features/modal';

const TopPreview = (props) => {
  // props
  const {
    values,
    isLoading,
  } = props;

  const lang = useSelector(store => store.user.language);
  const { t, i18n } = useTranslation('common');
  useEffect(() => { i18n.changeLanguage(lang); }, [lang]);

  // store
  const dispatch = useDispatch();

  // handlers
  const handleClick = () => {
    dispatch(showModal('ALERT_MODAL'));
  }

  // render
  return (
    <div>
      {
        isLoading && (
          <p className="text-center">
            {t('loading')}
          </p>
        )
      }
      {
        values.map((item, idx) => (
          <Preview
            key={`${item.media_id}-${idx}`}
            {...item}
            onClick={handleClick}
            source={item.cover_url}
            title={item.title || item.name}
            hideHeader
          />
        ))
      }
    </div>
  );
}

export default TopPreview;
