import { AUTH_PROFILE, AUTH_TOKEN } from '../constants/auth-constant';
import { eraseCookie } from './cookie-services';

export function autoLogout() {
  eraseCookie(AUTH_TOKEN);
  localStorage.removeItem(AUTH_PROFILE);
  window.location.href = '/auth/login';
}
