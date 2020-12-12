import { Duration } from 'luxon';

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

export const generatePreview = (file) => {
  return new Promise( (resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.onload = (evt) => {
        resolve(evt.target.result);
      }
      reader.readAsDataURL(file);
    } catch(err) {
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

export const getPermissions = (role, userRole) => {
  if ((role === 'artist' && [userTypes.admin, userTypes.creator, userTypes.superAdmin].includes(userRole)) ||
    (role === 'media' && [userTypes.creator, userTypes.superAdmin].includes(userRole))
  ) {
    return true;
  }
  return false;
}
