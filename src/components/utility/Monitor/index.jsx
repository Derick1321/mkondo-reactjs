import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { showModal, hideModal } from '$redux/features/modal';
import { reloadUser } from '$redux/features/authentication';

const Monitor = () => {
  // store
  const dispatch = useDispatch();
  const getArtistPending = useSelector((store) => store.artist.getArtistPending);
  const addArtistPending = useSelector((store) => store.artist.addArtistPending);
  const saveMediaPending = useSelector((store) => store.media.saveMediaPending);
  const removeFavoritePending = useSelector((store) => store.user.removeFavoritePending);
  const addFavoritePending = useSelector((store) => store.user.addFavoritePending);
  const addAlbumPending = useSelector((store) => store.media.addAlbumPending);
  const userId = useSelector((store) => store.authentication.user.user_id);

  // effects
  useEffect(() => {
    if (getArtistPending
      || addArtistPending
      || saveMediaPending
      || addAlbumPending
    ) {
      dispatch(showModal('LOADER_MODAL', {
        preventOutsideClick: true,
      }));
      return;
    }

    dispatch(hideModal());
  }, [
    getArtistPending,
    addArtistPending,
    saveMediaPending,
    addAlbumPending,
  ]);

  useEffect(() => {
    if (addFavoritePending || removeFavoritePending) {
      return;
    }

    dispatch(reloadUser(userId));
  }, [addFavoritePending, removeFavoritePending]);

  // render
  return (
    <div>

    </div>
  );
}

export default Monitor;
