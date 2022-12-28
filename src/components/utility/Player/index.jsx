import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AudioPlayer from '$common/player';

import { addHistory } from '$redux/features/user';
import {
  preLoadMedia,
  updateLoading,
  pause,
  updateRange,
  updateDuration,
} from '$redux/features/player';
import { play, setCurrentIndex } from '../../../redux/features/player';
import { toggleFooterPlayer } from '$redux/features/nav';

// hook for handing Audio related commands
const Player = () => {
  //store
  const [preLoaded, setPreLoaded] = useState([]);

  // store
  const dispatch = useDispatch();
  const isPlaying = useSelector((store) => store.player.isPlaying);
  const currentPlaylist = useSelector((store) => store.player.currentPlaylist);
  const currentIndex = useSelector((store) => store.player.index);
  const newPosition = useSelector((store) => store.player.newPosition);
  const volume = useSelector((store) => store.player.volume);
  const isLoading = useSelector((store) => store.player.isLoading);
  const next = useSelector((store) => store.player.next);
  const prev = useSelector((store) => store.player.prev);
  const skipTo = useSelector((store) => store.player.skipTo);

  // state
  const [playCounted, setPlayCounted] = useState(false);
  const [currentMediaId, setCurrentMediaId] = useState(null);

  // refs
  const audioRef = useRef(null);
  const timerRef = useRef(null);

  // functions
  const onPlay = (dur) => {
    console.log("player: onplay", dur);
    dispatch(updateDuration(dur));
    dispatch(updateLoading(false));
    loop();
  }

  const onPause = () => {
    // onEnd();
  }

  const onEnd = () => {
    // dispatch(pause());
    console.log("Skipping on end", audioRef.current);
    audioRef.current.skip();
    dispatch(setCurrentIndex(audioRef.current.index));
  }

  const onLoad = (mediaId) => {
    setPlayCounted(false);
    setCurrentMediaId(mediaId);
    // dispatch(addHistory({
    //   media_id: mediaId,
    // }));
  }

  const getSeekPosition = useCallback(() => {
    const obj = audioRef.current;
    const sound = obj.playlist[obj.index].howl;
    if (!sound || isLoading) {
      return;
    }
    // console.log('getSeekPosition ', sound.seek());
    dispatch(updateRange(sound.seek()));
    if (!playCounted && sound.seek() >= 30) {
      // console.debug(audioRef.current.playlist[audioRef.current.index].mediaId);
      setPlayCounted(true);
    }
  }, [isLoading, audioRef.current]);

  const loop = () => {
    getSeekPosition();
    cancelAnimationFrame(timerRef.current);
    timerRef.current = requestAnimationFrame(() => loop());
  }

  // effects
  useEffect(() => {
    // console.log("Player on mount called");
    const callbacks = {
      onPlay,
      onPause,
      onLoad,
      onEnd,
    }

    const newPlaylist = JSON.parse(JSON.stringify(currentPlaylist));
    // console.log(newPlaylist);
    audioRef.current = new AudioPlayer(newPlaylist, callbacks, true);
    return () => {
    }
  }, []);

  useEffect(() => {
    const newPlaylist = JSON.parse(JSON.stringify(currentPlaylist));
    audioRef.current.updatePlaylist(newPlaylist);
    const preloadedmedia = [];
    newPlaylist.forEach((element, i) => {
      if (!element.url && !preLoaded.some(m => m.media_id == element.media_id)) {
        // console.log("Calling Pre Loaded Media after Playlist has Changed", preLoaded);
        const data = {
          index: i,
          payload: element,
        }
        preloadedmedia.push(element);
        dispatch(preLoadMedia(data));
      }
    });
    if (preloadedmedia.length) {
      setPreLoaded(preloadedmedia);
    }

    if (newPlaylist.length < 1) {
      return;
    }

    audioRef.current.play(audioRef.current.index);
    // dispatch(updateLoading(true));
  }, [currentPlaylist]);

  useEffect(() => {
    console.log("index changed: ", currentIndex);
    if (!audioRef.current) return;
    if (currentIndex < 0) return; 
    if (audioRef.current.index != currentIndex) {
      if (isPlaying) {
        audioRef.current.pause();
      }

      audioRef.current.index = currentIndex;
      audioRef.current.play(audioRef.current.index);
    }
  }, [currentIndex])

  useEffect(() => {
    console.log("player: Is playing has changed");
    if (!isPlaying) {
      console.log("player: Pausing");
      audioRef.current.pause();
      cancelAnimationFrame(timerRef.current);
      return;
    }
    dispatch(toggleFooterPlayer(true));
    if (!audioRef.current.canPlay()) {
      // display cannot play message
      console.log("player: Cannot play");
      dispatch(pause());
      return;
    }

    console.log("player: Playing", audioRef.current.index, audioRef.playlist);
    audioRef.current.play(audioRef.current.index);
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

  useEffect(() => {
    // console.log("Player next clicked");
    if (!audioRef.current) return;
    audioRef.current.skip();
    dispatch(setCurrentIndex(audioRef.current.index));
  }, [next]);

  useEffect(() => {
    // console.log("player prev clicked");
    if (!audioRef.current) return;
    audioRef.current.skip("prev");
    dispatch(setCurrentIndex(audioRef.current.index));
  }, [prev]);

  useEffect(() => {
    console.log("skipping to", skipTo);
    // console.log("player skipto clicked");
    if (skipTo == -1) return;
    if (!audioRef.current) return;
    audioRef.current.skipTo(skipTo);
    dispatch(setCurrentIndex(audioRef.current.index));
  }, [skipTo]);

  useEffect(() => {
    if (!playCounted) return;
    console.log("player: play counted");
    dispatch(addHistory({
      media_id: audioRef.current.playlist[audioRef.current.index].mediaId,
    }));
  }, [playCounted])
  // render
  return null;
}

export default Player;