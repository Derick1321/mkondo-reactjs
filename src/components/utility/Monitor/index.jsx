import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { showModal, hideModal } from '$redux/features/modal';
import { reloadUser } from '$redux/features/authentication';
import { listPlaylist } from '$redux/features/playlist';

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
  const updatePlaylistComplete = useSelector((store) => store.playlist.updatePlaylistComplete);
  const createPlaylistComplete = useSelector((store) => store.playlist.createPlaylistComplete);
  const updateUserPending = useSelector((store) => store.user.updateUserPending);
  const updateUserComplete = useSelector((store) => store.user.updateUserComplete);

  // effects
  useEffect(() => {
    if (getArtistPending
      || addArtistPending
      || saveMediaPending
      || addAlbumPending
      || updateUserPending
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
    updateUserPending,
  ]);

  useEffect(() => {
    if (addFavoritePending || removeFavoritePending || !userId) {
      return;
    }

    dispatch(reloadUser(userId));
  }, [addFavoritePending, removeFavoritePending, updateUserComplete]);

  useEffect(() => {
    if (!userId) {
      return userId;
    }
    dispatch(listPlaylist(userId));
  }, [createPlaylistComplete, updatePlaylistComplete]);

  // render
  return (
    <div />
  );
}

export default Monitor;
