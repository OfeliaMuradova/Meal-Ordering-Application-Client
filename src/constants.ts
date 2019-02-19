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

export function getObjectCookie(name: string){
  let result = document.cookie.match(new RegExp(name + '=([^;]+)'));
  return JSON.parse(result[1]);
}

export function delete_cookie(name:string) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";';
}

export function validatorEmpty(element: Element, label?: any){
  if((<HTMLInputElement>element).value.trim()== ""){
    if(label != null)
      label.style.display = 'block';
    (<HTMLInputElement>element).focus();
    return false;
  }	
  if(label != null)
    label.style.display = 'none';
  return true;
}

export function validatorURL(element: Element, label: any){
  let URLregex = new RegExp('^(ftp|http|https):\/\/[^ "]+$');
  if( !URLregex.test((<HTMLInputElement>element).value) ){
    label.style.display = 'block';
    (<HTMLInputElement>element).focus();
    return false;
  }	
  label.style.display = 'none';
  return true;
}

export function validatorNumber(element: Element, label: any){
  let URLregex = new RegExp('^(5[0-3]|[1-4][0-9]|[1-9])$');
  if( !URLregex.test((<HTMLInputElement>element).value) ){
    label.style.display = 'block';
    (<HTMLInputElement>element).focus();
    return false;
  }	
  label.style.display = 'none';
  return true;
}

export function reload(){
  window.location.reload();
}

export function getWeekNumber(from: any) {
  if(from){
    let [year, month, day] = from.split("-");
    let fromDate = <any>new Date(year, month - 1, day);

    let firstDayOfYear = <any>new Date(year, 0, 1);
    let pastDaysOfYear = (fromDate - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }
}

export function getDateOfWeek(weekChosen: string) {
  let w, y: number;
  y = +weekChosen.substring(0, 4);
  w = +weekChosen.slice(-2);
  var simple = new Date(y, 0, 1 + (w - 1) * 7);
  var dow = simple.getDay();
  var ISOweekStart = simple;
  if (dow <= 4)
      ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
  else
      ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
  return ISOweekStart;
}

export function formatDate(date: Date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

export function getFriday(date: Date) {
  date.setDate(date.getDate() + 6);
  return date;
}
