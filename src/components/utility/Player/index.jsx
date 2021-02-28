import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AudioPlayer from '$common/player';

import { addHistory } from '$redux/features/user';
import {
  updateLoading,
  pause,
  updateRange,
  updateDuration,
} from '$redux/features/player';

// hook for handing Audio related commands
const Player = () => {
  // store
  const dispatch = useDispatch();
  const isPlaying = useSelector((store) => store.player.isPlaying);
  const currentPlaylist = useSelector((store) => store.player.currentPlaylist);
  const newPosition = useSelector((store) => store.player.newPosition);
  const volume = useSelector((store) => store.player.volume);

  // refs
  const audioRef = useRef(null);
  const timerRef = useRef(null);

  // functions
  const onPlay = (dur) => {
    dispatch(updateDuration(dur));
    dispatch(updateLoading(false));
  }

  const onPause = () => {
    onEnd();
  }

  const onEnd = () => {
    dispatch(pause());
  }

  const onLoad = (mediaId) => {
    dispatch(addHistory({
      media_id: mediaId,
    }));
  }

  const getSeekPosition = () => {
    const obj = audioRef.current;
    const sound = obj.playlist[obj.index].howl;
    if (!sound) {
      return;
    }
    console.log('getSeekPosition');
    dispatch(updateRange(sound.seek()));
  }

  const loop = () => {
    getSeekPosition();
    cancelAnimationFrame(timerRef.current);
    timerRef.current = requestAnimationFrame(() => loop());
  }

  // effects
  useEffect(() => {
    const callbacks = {
      onPlay,
      onPause,
      onLoad,
      onEnd,
    }

    const newPlaylist = JSON.parse(JSON.stringify(currentPlaylist))
    audioRef.current = new AudioPlayer(newPlaylist, callbacks);
  }, []);

  useEffect(() => {
    const newPlaylist = JSON.parse(JSON.stringify(currentPlaylist));
    audioRef.current.updatePlaylist(newPlaylist);

    if (newPlaylist.length < 1) {
      return;
    }

    audioRef.current.play(audioRef.current.index);
    dispatch(updateLoading(true));
  }, [currentPlaylist]);

  useEffect(() => {
    if (!isPlaying) {
      audioRef.current.pause();
      cancelAnimationFrame(timerRef.current);
      return;
    }

    if (!audioRef.current.canPlay()) {
      // display cannot play message
      dispatch(pause());
      return;
    }

    audioRef.current.play(audioRef.current.index);
    loop();
    return () => { // Return callback to run on unmount.
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    if (newPosition === -1) {
      return;
    }
    audioRef.current.seek(newPosition);
    // should revert to -1?
  }, [newPosition]);

  useEffect(() => {
    audioRef.current.volume(volume);
  }, [volume]);

  // render
  return null;
}

export default Player;
