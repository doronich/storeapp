export function getToken() {
    var user = JSON.parse(localStorage.getItem("user"));
    return { headers: { "Authorization": "Bearer " + user.access_token } }
}
