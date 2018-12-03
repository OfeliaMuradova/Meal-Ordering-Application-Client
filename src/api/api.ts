export const apiUrl = "http://localhost:8080/"

export const getHeader = function(){
    const token = JSON.parse(window.localStorage.getItem("access_token"))
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'crossDomain': true,
        'Authorization':'Bearer' + token
    }

    return headers;
}