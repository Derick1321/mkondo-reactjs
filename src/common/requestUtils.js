const BASE_URL = 'https://jengaserver.herokuapp.com';

// TODO: create a env config  file
export const buildUrl = (url, data, token = '') => {
  const newUrl = `${BASE_URL}/api/v1/${url}`;
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    token,
  };

  return {
    url: newUrl,
    body: JSON.stringify(data),
    headers,
  };
};