import axios from 'axios';
import { autoLogout } from './LogoutService';
import { AUTH_TOKEN } from '../constants/auth-constant';
import { getCookie } from './cookie-services';

// const history = useHistory();

export function handleAxiosError(url, error) {
  if (error.code === 'ECONNABORTED') {
    console.error(`Request to ${url} timed out`);
    return { status: 408, statusText: 'Request Timeout' }; // Custom response for timeout
  } else if (error.message === 'Network Error') {
    console.error(`Network error while connecting to ${url}`);
    return { status: 503, statusText: 'Service Unavailable' }; // Custom response for network error
  } else if (error?.response?.status !== 401) {
    discordWebhook(url + ' ' + error?.response);
  }
  return error?.response;
}

export async function getPaginate(
  url,
  page = 1,
  limit = 10,
  params = ''
) {
  const offset = (page - 1) * limit;
  const res = axios
    .get(url + '?offset=' + offset + '&limit=' + limit + params, {
      headers: {
        Authorization: `Bearer ${getCookie(AUTH_TOKEN)}`,
        Accept: 'application/json',
        'Content-Type': 'application/json;',
      },
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      if (error?.response?.status === 401) {
        autoLogout();
      } else {
        discordWebhook(url + ' ' + error?.response);
        return error?.response;
      }
    });

  return res;
}

export async function get(url, params = '') {
  const res = axios
    .get(url + params, {
      headers: {
        Authorization: `Bearer ${getCookie(AUTH_TOKEN)}`,
        Accept: 'application/json',
        'Content-Type': 'application/json;',
      },
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      if (error?.response?.status === 401) {
        autoLogout();
      } else {
        discordWebhook(url + ' ' + error.response);
        handleAxiosError(url, error);
        return error.response;
      }
    });

  return res;
}

export async function post(url, value) {
  const res = await axios
    .post(url, value, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;',
        Authorization: `Bearer ${getCookie(AUTH_TOKEN)}`,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      if (error?.response?.status === 401) {
        autoLogout();
      } else {
        discordWebhook(url + ' ' + error.response);
        handleAxiosError(url, error);
        return error?.response;
      }
    });

  return res;
}

export async function put(url, value) {
  const res = axios
    .put(url, value, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;',
        Authorization: `Bearer ${getCookie(AUTH_TOKEN)}`,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      if (error?.response?.status === 401) {
        autoLogout();
      } else {
        discordWebhook(url + ' ' + error.response);

        return error.response;
      }
    });

  return res;
}

export async function patch(url, value) {
  const res = axios
    .patch(url, value, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;',
        Authorization: `Bearer ${getCookie(AUTH_TOKEN)}`,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      if (error?.response?.status === 401) {
        autoLogout();
      } else {
        discordWebhook(url + ' ' + error.response);

        return error.response;
      }
    });

  return res;
}

export async function del(url, value = {}) {
  const res = axios
    .delete(url, {
      headers: {
        Authorization: `Bearer ${getCookie(AUTH_TOKEN)}`,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      if (error?.response?.status === 401) {
        // autoLogout();
      } else {
        discordWebhook(url + ' ' + error.response);

        return error.response;
      }
    });

  return res;
}
