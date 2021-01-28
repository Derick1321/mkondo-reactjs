import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AudioPlayer from '$common/player';

import { addHistory } from '$redux/features/user';
import { setCurrentMediaId } from '$redux/features/player';

// hook for handing Audio related commands
const Player = () => {
  // store
  const dispatch = useDispatch();
  const isPlaying = useSelector((store) => store.player.isPlaying);
  const currentPlaylist = useSelector((store) => store.playlist.currentPlaylist);

  // refs
  const audioRef = useRef(null);
  const timerRef = useRef(null);

  // functions
  const onPlay = (dur, mediaId) => {
    // setIsPlaying(true);
    // setDuration(dur);
    // setIsLoading(false);
    dispatch(setCurrentMediaId(mediaId));
  }

  const onPause = (dur) => {
    // TODO: fix pause
    onEnd();
  }

  const onEnd = () => {
    setIsPlaying(false);
    dispatch(setCurrentMediaId(null));
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
    // UPDATE POSITION
    sound.seek();
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
    if (!isPlaying) {
      audioRef.current.pause();
      cancelAnimationFrame(timerRef.current);
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

  // render
  return null;
}

export default Player;
