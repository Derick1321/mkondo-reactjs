import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { showModal, hideModal } from '$redux/features/modal';

const Monitor = () => {
  // store
  const dispatch = useDispatch();
  const getArtistPending = useSelector((store) => store.artist.getArtistPending);
  const addArtistPending = useSelector((store) => store.artist.addArtistPending);
  const saveMediaPending = useSelector((store) => store.media.saveMediaPending);

  // effects
  useEffect(() => {
    if (getArtistPending || addArtistPending || saveMediaPending) {
      dispatch(showModal('LOADER_MODAL'));
      return;
    }
    
    dispatch(hideModal());
  }, [getArtistPending, addArtistPending, saveMediaPending]);

  // render
  return (
    <div>
      
    </div>
  );
}

export default Monitor;
