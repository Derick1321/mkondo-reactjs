const BASE_URL = 'https://api.mkondo.co';

// Ensure you are running a local instance
const URL = process.env.ENV === 'development' ?
  'http://localhost:5000' : BASE_URL;

export const buildUrl = (url, data, token = '') => {
  const newUrl = `${URL}/api/${url}`;
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
    headers.token = token;
  }

  return {
    url: newUrl,
    body: JSON.stringify(data),
    headers,
  };
};

export const buildFormData = (url, data = {}) => {
  const newUrl = `${BASE_URL}${url}`;

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
  };

  const formData = new FormData();

  for (const key in data) {
    formData.append(key, data[key]);
  }

  return {
    body: formData,
    url: newUrl,
    headers,
  };
};


export const handleFetch = async (method, path, data, token='') => {
  const { url, body, headers } = buildUrl(path, data, token);
  const props = {
    method,
    headers,
  };

  if (body) {
    props.body = body;
  }

  const response = await fetch(url, props);
  const result = await response.text();
  if (response.status !== 200) {
    throw result;
  }

  return JSON.parse(result);
}
