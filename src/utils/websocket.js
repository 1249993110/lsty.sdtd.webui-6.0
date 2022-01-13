import { storekey } from '../utils/request';
import store from '../store';

let accesstoken = localStorage.getItem(storekey);

let webSocketPath = process.env.NODE_ENV === 'development' ? 'ws://localhost:8089/ws' : 'ws://' + window.location.host + '/ws';
if (!!accesstoken) {
    webSocketPath += '?access-token=' + accesstoken;
}

let connection;

let timer;
function startTimer() {
    if (timer) {
        clearTimeout(timer);
    }
    timer = setTimeout(initWebsocket, 5000);
}

function initWebsocket() {
    store.commit('setLogEntry', 'Connecting webSocket server...');

    connection = new WebSocket(webSocketPath);
    connection.onopen = () => {
        store.commit('setLogEntry', 'WebSocket connection started');
    };
    connection.onmessage = (e) => {
        const message = JSON.parse(e.data);
        console.log(message);
        switch (message.messageType) {
            // ConsoleLog
            case 0:
                const logEntry = message.messageEntity;
                store.commit('setLogEntry', logEntry.message, logEntry.logType, false);
                break;
            // PlayerUpdate
            case 1:
                store.commit('setLivePlayers', message.messageEntity);
                break;
            // ChatMessage
            case 2:
                store.commit('setChatMessage', message.messageEntity);
                break;
        }
    };
    connection.onclose = (e) => {
        store.commit('setLogEntry', 'WebSocket connection closed, prepare to try reconnect');
        startTimer();
    };
    connection.onerror = (e) => {
        store.commit('setLogEntry', 'Error in webSocket connection');
    };
}

initWebsocket();
