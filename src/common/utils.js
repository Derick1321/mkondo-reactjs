// import allCountries from 'country-region-data';
import { DateTime, Duration } from 'luxon';
import { handleFetch } from './requestUtils';


// import uuidv4
export const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// -> Fisher–Yates shuffle algorithm
export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const formatTime = (seconds) => {
  return Duration.fromObject({ seconds }).toFormat('mm:ss');
}

export const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const getFileURL = (file) => {
  return URL.createObjectURL(file);
}

export const getDuration = (file, type, callback) => {
  var video = document.createElement(type);
  video.preload = 'metadata';

  video.onloadedmetadata = () => {
    window.URL.revokeObjectURL(video.src);
    callback(parseInt(video.duration));
  }

  video.src = URL.createObjectURL(file);
}

export const formatDate = (value) => {
  if (!value) return;
  
  const units = [
    'year',
    'month',
    'week',
    'day',
    'hour',
    'minute',
    'second',
  ];

  const dateTime = DateTime.fromISO(value, { zone: "utc" }).toLocal();
  const diff = dateTime.diffNow().shiftTo(...units);
  const unit = units.find((unit) => diff.get(unit) !== 0) || 'second';

  const relativeFormatter = new Intl.RelativeTimeFormat('en', {
    numeric: 'auto',
  });

  return relativeFormatter.format(Math.trunc(diff.as(unit)), unit);
}

export const getFormattedDateTime = (value) => {
  if (!value) return;

  const dateTime = DateTime.fromISO(value, { zone: "utc" }).toLocal();
  return `${leadingZeros(dateTime.day, 2)}-${leadingZeros(dateTime.month, 2)}-${dateTime.year} ${leadingZeros(dateTime.hour, 2)}:${leadingZeros(dateTime.minute, 2)}`;
}

export const getFormattedDateTimeWithRelativity = (value) => {
  return `${getFormattedDateTime(value)} (${formatDate(value)})`;
}

export const leadingZeros = (value, length) => {
  return value.toString().padStart(length, '0');
}

export const getCurrentYear = () => {
  const d = new Date();
  return d.getFullYear();
}

export const generatePreview = (file) => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.onload = (evt) => {
        resolve(evt.target.result);
      }
      reader.readAsDataURL(file);
    } catch (err) {
      reject(err);
    }
  });
}

const userTypes = {
  admin: 'admin',
  superAdmin: 'super admin',
  creator: 'creator',
  user: 'user',
}

export const getPermissions = (role, userRole, params = {}) => {
  if ((role === 'artist'
    // && params.isPublished
    && [userTypes.admin, userTypes.creator, userTypes.superAdmin].includes(userRole)
  ) ||
    (role === 'media' && [userTypes.creator, userTypes.superAdmin].includes(userRole)) ||
    (role === 'admin' && [userTypes.admin, userTypes.superAdmin].includes(userRole)) ||
    (role === 'super admin' && [userTypes.superAdmin].includes(userRole))
  ) {
    return true;
  }
  return false;
}

// https://gist.github.com/lanqy/5193417
// https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
export const bytesToSize = (bytes, decimals=2) => {
  if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}



export function kFormatter(num) {
  return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num);
}

export const mediaSorter = (values = []) => {
  // console.debug('utils', values);
  const items = {
    audio: [],
    video: [],
    movie: [],
    episode: [],
  };

  if (!values) return items;

  values.forEach((value) => {
    // console.debug('utils: value ', value);
    items[value.category].push(value);
  });
  return items;
}

export const genres = [
  { value: 'afro', label: 'Afro' },
  { value: 'hiphop', label: 'Hip Hop' },
  { value: 'rnb', label: 'R&B' },
  { value: 'reggae', label: 'Reggae' },
  { value: 'dance', label: 'Dance' },
  { value: 'country', label: 'Country' },
  { value: 'rock', label: 'Rock' },
  { value: 'jazz', label: 'Jazz' },
  { value: 'gospel', label: 'Gospel' },
  { value: 'pop', label: 'Pop' },
];

export const videoGenres = [
  { value: 'animation', label: 'Animation' },
  { value: 'educational', label: 'Educational' },
  { value: 'music', label: 'Music' },
  { value: 'documentary', label: 'Documentary' },
  { value: 'sports', label: 'Sports' },
  { value: 'comedy', label: 'Comedy' },
];

export const movieGenres = [
  { value: 'action', label: 'Action' },
  { value: 'comedy', label: 'Comedy' },
  { value: 'drama', label: 'Drama' },
  { value: 'fantasy', label: 'Fantasy' },
  { value: 'horror', label: 'Horror' },
  { value: 'mystery', label: 'Mystery' },
  { value: 'romance', label: 'Romance' },
  { value: 'thriller', label: 'Thriller' },
  { value: 'animation', label: 'Animation'},
];

export const getMediaUrl = async (filename, token) => {
  if (!filename) return null;
  // console.log("Getting media Url: ", filename);
  const { response } = await handleFetch('GET', `media/presigned-get-url?file_name=${filename}`, null, token);
  return response;
}

// export const getCountriesOptions = () => {
//   console.log("Get Countries Options Triggered");
//   console.debug(allCountries);
//   return [];
// }

// generate file name
export const generateFileName = (file) => {
  const extension = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${extension}`;
  return fileName;
}