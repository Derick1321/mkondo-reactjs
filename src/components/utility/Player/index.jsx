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
import { setCurrentIndex } from '../../../redux/features/player';

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

  // refs
  const audioRef = useRef(null);
  const timerRef = useRef(null);

  // functions
  const onPlay = (dur) => {
    console.log("player: onplay", dur);
    dispatch(updateDuration(dur));
    dispatch(updateLoading(false));
  }

  const onPause = () => {
    onEnd();
  }

  const onEnd = () => {
    // dispatch(pause());
    console.log("Skipping on end");
    audioRef.current.skip();
    dispatch(setCurrentIndex(audioRef.current.index));
  }

  const onLoad = (mediaId) => {
    dispatch(addHistory({
      media_id: mediaId,
    }));
  }

  const getSeekPosition = useCallback(() => {
    const obj = audioRef.current;
    const sound = obj.playlist[obj.index].howl;
    if (!sound || isLoading) {
      return;
    }
    // console.log('getSeekPosition ', isLoading);
    dispatch(updateRange(sound.seek()));
  }, [isLoading, audioRef.current]);

  const loop = () => {
    getSeekPosition();
    cancelAnimationFrame(timerRef.current);
    timerRef.current = requestAnimationFrame(() => loop());
  }

  // effects
  useEffect(() => {
    console.log("Player on mount called");
    const callbacks = {
      onPlay,
      onPause,
      onLoad,
      onEnd,
    }

    const newPlaylist = JSON.parse(JSON.stringify(currentPlaylist));
    console.log(newPlaylist);
    audioRef.current = new AudioPlayer(newPlaylist, callbacks, true);
    console.log(audioRef.current);
  }, []);

  useEffect(() => {
    const newPlaylist = JSON.parse(JSON.stringify(currentPlaylist));
    audioRef.current.updatePlaylist(newPlaylist);
    const preloadedmedia = [];
    newPlaylist.forEach((element, i) => {
      if (!element.url && !preLoaded.some(m => m.media_id == element.media_id)) {
        console.log("Calling Pre Loaded Media after Playlist has Changed", preLoaded);
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
    dispatch(updateLoading(true));
  }, [currentPlaylist]);

  useEffect(() => {
    console.log("index changed triggered");
    if (!audioRef.current) return;
    if (currentIndex < 0) return; 
    if (audioRef.current.index != currentIndex) {
      if (isPlaying) {
        console.log("it is playing the previous index");
        audioRef.current.pause();
      }
      audioRef.current.index = currentIndex;
    }
  }, [currentIndex])

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

  useEffect(() => {
    console.log("Player next clicked");
    if (!audioRef.current) return;
    audioRef.current.skip();
    dispatch(setCurrentIndex(audioRef.current.index));
  }, [next]);

  useEffect(() => {
    console.log("player prev clicked");
    if (!audioRef.current) return;
    audioRef.current.skip("prev");
    dispatch(setCurrentIndex(audioRef.current.index));
  }, [prev]);

  useEffect(() => {
    console.log("skipping to");
    console.log("player prev clicked");
    
    if (skipTo == -1) return;
    if (!audioRef.current) return;
    audioRef.current.skipTo(skipTo);
    dispatch(setCurrentIndex(audioRef.current.index));
  }, [skipTo]);


  // render
  return null;
}

export default Player;