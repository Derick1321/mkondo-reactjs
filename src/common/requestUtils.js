const BASE_URL = 'http://localhost:5000';

// Ensure you are running a local instance
const URL = BASE_URL; // process.env.ENV === 'development' ? 'http://localhost:5000' : BASE_URL;

export const buildUrl = (url, data, token = '') => {
  const newUrl = `${URL}/${url}`;
  const headers = {
    'Access-Control-Allow-Origin': '*',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const props = {
    url: newUrl,
    headers,
  };

  if (data) {
    props.body = JSON.stringify(data);
    headers['Content-Type'] = 'application/json';
  }

  return props;
};

export const buildFormData = (url, data = {}) => {
  const newUrl = `${BASE_URL}${url}`;

  const headers = {
    'Accept': '*/*',
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
    headers,
    method,
  };

  if (body) {
    props.body = body;
  }

  const response = await fetch(url, props);
  const status = response.status;
  const result = await response.text();

  if (![200, 201].includes(status)) {
    throw result;
  }

  return JSON.parse(result);
}
