import * as Cookies from 'js-cookie'

function getRootDomain () {
  let domain = document.domain
  const domainArr = domain.split('.')
  const arrLen = domainArr.length
  if (arrLen > 2) {
    domain = domainArr[arrLen - 2] + '.' + domainArr[arrLen - 1]
  }
  return domain
}

export function getCookie (key = 'token') {
  return Cookies.get(key, {domain: getRootDomain()})
}

export function clearCookies () {
  Cookies.remove('token', {domain: getRootDomain()})
}

// 批量设置
export function setCookies (data) {
  Cookies.set('token', data.token, {domain: getRootDomain()})
}
