import React, { useEffect } from 'react';

import AudioPlayer from '$common/player';

const PlayerUtil = () => {
  // refs
  const audioRef = useRef(null);
  const seekPosRef = useRef(0);
  const timerRef = useRef(null);

  // store
  const pauseForced = useSelector((store) => store.player.pauseForced);
  const currentMediaId = useSelector((store) => store.player.currentMediaId);
  const dispatch = useDispatch();

  // state
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [seekPos, setSeekPos] = useState(0);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(100);

  // functions
  const onPlay = (dur, mediaId) => {
    setIsPlaying(true);
    setDuration(dur);
    setIsLoading(false);
    // dispatch(setCurrentMediaId(mediaId));
  }

  const onPause = (dur) => {
    // TODO: fix pause
    onEnd();
  }

  const onEnd = () => {
    setIsPlaying(false);
    // dispatch(setCurrentMediaId(null));
  }

  const onLoad = (mediaId) => {
    dispatch(addHistory({
      media_id: mediaId,
    }));
  }

  // effects
  useEffect(() => {
    if (pauseForced && currentMediaId) {
      // pause
      audioRef.current.pause();
      return;
    }

    if (!pauseForced && currentMediaId) {
      // play
      audioRef.current.play(audioRef.current.index);
    }
  }, [pauseForced]);

  return <div />;
}

export default PlayerUtil;
