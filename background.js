const userId = 123456789;
const clientId = 'clientId';
const token = 'tokenId';

const url = `https://api.twitch.tv/helix/streams?user_id=${userId}`;
const twitchUrl = "https://www.twitch.tv/pentiminaxdev";
const headers = {
    'Authorization': `Bearer ${token}`,
    'Client-ID': clientId
}

let isLiveOn = false;

const cb = function (json) {
    if (json.data.length && !isLiveOn) {
        setIcon('images/live_on.png');
        chrome.notifications.create('LiveOn', {
            title: 'Pentiminax est en live !',
            iconUrl: 'images/live_on.png',
            message: 'Rejoins le live dès maintenant !',
            type: 'basic'
        });
        isLiveOn = true;
    } else {
        setIcon('images/live_off.png');
        isLiveOn = false;
    }
}

function fetchTwitchAPI(url, headers, cb) {
    fetch(url, {
        headers: headers
    }).then((response) => {
        return response.json();
    }).then((json) => cb(json));
}

function setIcon(path) {
    chrome.action.setIcon({ path: path });
}

fetchTwitchAPI(url, headers, cb);

chrome.notifications.onClicked.addListener(() => {
    chrome.tabs.create({
        url: twitchUrl
    })
});

chrome.alarms.create({ periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener(() => {
    fetchTwitchAPI(url, headers, cb);
});