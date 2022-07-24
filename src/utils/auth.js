import Cookies from 'js-cookie'

const TokenKey = 'HRSAAS_TOKEN'
const TimeKey = 'HRSAAS_LOAD_TIME'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export const setTimeKey = () => {
  Cookies.set(TimeKey, Date.now())
}
export const getTimeKey = () => Cookies.get(TimeKey)


