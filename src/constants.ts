export let SERVERURL: string = "http://localhost:8080"

export let DEFAULT_HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'crossDomain': true,
  'Authorization': 'Bearer ' + getCookie('access_token')
}

export function set_cookie(name:string, value:string) {
  document.cookie = name +'='+ value +'; Path=/;';
}

export function getCookie(name:string) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

export function delete_cookie(name:string) {
  document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}