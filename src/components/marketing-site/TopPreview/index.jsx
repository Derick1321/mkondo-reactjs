import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import FeatureMark from '$components/common/FeatureMark';
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
    <div className="row">
      {
        isLoading && (
          <p className="text-center">
            {t('loading')}
          </p>
        )
      }
      {
        values.map((item, idx) => (
          <div className="col-lg-4 col-md-6 col-sm-6 mb-3" key={`${item.media_id}-${idx}`}>
          <FeatureMark
            {...item}
            onClick={handleClick}
            avatar={item.cover_url}
            source={item.owner_avatar_url}
            title={item.title || item.name}
            subtitle={item.description}
            hideHeader
          />
          </div>
        ))
      }
    </div>
  );
}

export default TopPreview;
