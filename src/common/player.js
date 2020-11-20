import {Howl, Howler} from 'howler';
import moment from 'moment';

// https://github.com/goldfire/howler.js/blob/master/examples/player/player.js
// for reference

/**
 * @param {Array} playlist Array of objects with playlist song details ({ title, file, howl }).
 */

class Player {
  constructor(playlist, callbacks, onAutoPlay) {
    this.playlist = playlist || [];
    this.callbacks = callbacks || {};
    this.onAutoPlay = onAutoPlay || true;
    this.isPlaying = false;
    this.index = 0;
  }

  formatTime(seconds) {
    const duration = moment.duration(Math.round(seconds), 'seconds');
    return duration.format("hh:mm:ss");
  }

  play(idx) {
    let sound;
    let index = typeof idx === 'number' ? idx : this.index;
    const data = this.playlist[index];
    const self = this;

    if (data.howl) {
      sound = data.howl;
    } else {
      sound = data.howl = new Howl({
        src: [`./audio/${data.file}.webm`, `./audio/${data.file}.mp3`],
        html5: true, // Force to HTML5 so that the audio can stream in (best for large files).
        onplay: () => {
          if (this.callbacks.onPlay) {
            this.callbacks.onPlay(this.formatTime(sound.duration()));
          }
          this.isPlaying = false;
        },
        onload: () => {
          if (this.callbacks.onLoad) {
            this.callbacks.onLoad();
          }
        },
        onend: () => {
          if (this.callbacks.onEnd) {
            this.callbacks.onEnd();
          }
          if (this.onAutoPlay) {
            this.skip('next');
            return;
          }
          this.isPlaying = false;
        },
        onpause: () => {
          if (this.callbacks.onPause) {
            this.callbacks.onPause();
          }
          this.isPlaying = false;
        },
        onstop: () => {
          if (this.callbacks.onStop) {
            this.callbacks.onStop();
          }
          this.isPlaying = false;
        },
        onseek: (value) => {
          console.log('seek ', value);
          if (this.callbacks.onSeek) {
            this.callbacks.onSeek();
          }
        }
      });
    }

    // Begin playing the sound.
    sound.play();

    // Keep track of the index we are currently playing.
    this.index = index;
  }

  /**
   * Pause the currently playing track.
   */
  pause() {
    const sound = this.playlist[this.index].howl;
    sound.pause();
    this.isPaused = true;
  }

  skip(direction) {
    if (direction === 'prev') {
      const index = this.index === 0 ? this.playlist.length - 1 : index - 1;
      this.skipTo(index);
      return;
    }

    const index = (index >= this.playlist.length -1) ? 0 : this.index + 1;
    this.skipTo(index);
  }

  skipTo(index) {
    // Stop the current track.
    if (this.playlist[this.index].howl) {
      this.playlist[this.index].howl.stop();
    }

    // Play the new track.
    this.play(index);
  }

  /**
   * Set the volume and update the volume slider display.
   * @param  {Number} val Volume between 0 and 1.
   */
  volume(value) {
    // Update the global volume (affecting all Howls).
    Howler.volume(value);
  }

  /**
   * Seek to a new position in the currently playing track.
   * @param {Number} per Percentage through the song to skip.
   */
  seek(pos) {
    // Get the Howl we want to manipulate.
    var sound = this.playlist[this.index].howl;

    // Convert the percent into a seek position.
    if (sound.playing()) {
      sound.seek(sound.duration() * pos);
    }
  }
} 

export default Player;
