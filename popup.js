const userId = 123456789;
const clientId = 'clientId';
const token = 'tokenId';

const url = `https://api.twitch.tv/helix/streams?user_id=${userId}`;
const headers = {
    'Authorization': `Bearer ${token}`,
    'Client-ID': clientId
}

const info = document.getElementById('info');

const cb = function (json) {
    info.innerHTML = json.data.length ? "Pentiminax est en live !" : "Pentiminax n' est pas en live actuellement !";
}

function fetchTwitchAPI(url, headers, cb) {
    fetch(url, {
        headers: headers
    }).then((response) => {
        return response.json();
    }).then((json) => cb(json));
}

fetchTwitchAPI(url, headers, cb);