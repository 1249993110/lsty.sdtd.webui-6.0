import { createStore } from 'vuex';
import moment from 'moment';

export default createStore({
    state: {
        logEntry: {
            logType: 0,
            message: '',
        },
        livePlayers: null,
        chatMessage: {
            chatType: 0,
            senderName: '',
            message: '',
            entityId: 0,
        },
    },
    mutations: {
        setLogEntry(state, message, logType = 3, addDatetime = true) {
            state.logEntry = {
                logType: logType,
                message: addDatetime ? moment().format('YYYY-MM-DDTHH:mm:ss ') + message : message,
            };
            console.log(state.logEntry)
        },
        setLivePlayers(state, livePlayers) {
            state.livePlayers = livePlayers;
            console.log(state.livePlayers)
        },
        setChatMessage(state, chatMessage) {
            chatMessage.message = moment().format('YYYY-MM-DD HH:mm:ss   \'') + chatMessage.senderName + '\': ' + chatMessage.message;
            state.chatMessage = chatMessage;
        },
    },
    actions: {},
    getters: {},
    modules: {},
});
