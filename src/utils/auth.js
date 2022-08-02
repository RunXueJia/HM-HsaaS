import Cookies from 'js-cookie'

const TokenKey = 'HRSAAS-TOKEN'
const loadTimeKey = 'HRSAAS-LOAD-TIME'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setTimeToken() {
  Cookies.set(loadTimeKey, Date.now())
}
export function getTimeToken() {
  return Cookies.get(loadTimeKey)
}
