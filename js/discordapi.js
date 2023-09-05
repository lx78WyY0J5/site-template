//source : https://github.com/rigwild/discord-self-bot-console/blob/main/index.js

var authHeaderToken = ''

var apiCall = (apiPath, body, method = 'GET', options = {}) => {
    const fetchOptions = {
        body: body ? body : undefined,
        method,
        headers: {
            Accept: '*/*',
            'Accept-Language': 'en-US',
            Authorization: authHeaderToken,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/1.0.9015 Chrome/108.0.5359.215 Electron/22.3.12 Safari/537.36',
            'X-Super-Properties': btoa(
                JSON.stringify({
                    os: 'Windows',
                    browser: 'Discord Client',
                    release_channel: 'stable',
                    client_version: '1.0.9015',
                    os_version: '10.0.22621',
                    os_arch: 'x64',
                    system_locale: 'en-US',
                    browser_user_agent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/1.0.9015 Chrome/108.0.5359.215 Electron/22.3.12 Safari/537.36',
                    browser_version: '22.3.12',
                    client_build_number: 216385,
                    native_build_number: 34898,
                    client_event_source: null,
                }),
            ),
        },
        ...options,
    }
    const isFormData = body?.constructor?.name === 'FormData'
    if (!isFormData) {
        fetchOptions.headers['Content-Type'] = 'application/json'
        fetchOptions.body = JSON.stringify(body)
    }
    return fetch(`https://discord.com/api/v9${apiPath}`, fetchOptions)
        .then(res => res.json().catch(() => { }))
        .catch(console.error)
}

var api = {
    sendMessage: (channelOrThreadId, message, tts, body = {}) => apiCall(`/channels/${channelOrThreadId}/messages`, { content: message, tts: !!tts, ...body }, 'POST'),
}

async function send() {
    authHeaderToken = document.getElementById("token").value;
    var message = document.getElementById("message").value;
    var channelID = document.getElementById("channeild").value;

    if (!authHeaderToken) {
        error("token")
        throw new Error("Discord token is missing")
    }
    if (!message) {
        error("message")
        throw new Error("Message is missing")
    }

    if (!channelID) {
        error("channeild")
        throw new Error("ChannelID token is missing")
    }

    api.sendMessage(channelID, message, false);
}

function error(id) {
    const animation = [
        { transform: "rotate(0) scale(1)" },
        { transform: "rotate(360deg) scale(1.5)" },
    ];

    const property = {
        duration: 250,
        iterations: 2,
    };

    const newspaper = document.getElementById(id);

    newspaper.animate(animation, property);
}