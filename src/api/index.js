import request from '../utils/request';

export function login() {
    return request.post('/Login/Check');
}

export function sendConsoleCommand(command, inMainThread = false) {
    return request.get('/ServerManage/ExecuteConsoleCommand', {
        params: {
            command: command,
            inMainThread: inMainThread,
        },
    });
}

export function sendGlobalMessage(message, senderName = 'Server') {
    return sendConsoleCommand(`ty-say \"${message}\" ${senderName}`);
}

export function sendMessageToPlayer(playerIdOrName, message, senderName = 'Server') {
    return sendConsoleCommand(`ty-pm ${playerIdOrName} \"${message}\" ${senderName}`);
}

export function telePlayer(playerIdOrName, target) {
    return sendConsoleCommand(`tele ${playerIdOrName} ${target}`);
}

export function giveItem(playerIdOrName, itemName, count, quality = 0, durability = 0) {
    return sendConsoleCommand(`ty-gi ${playerIdOrName} ${itemName} ${count} ${quality} ${durability}`);
}

export function spawnEntity(playerNameOrEntityId, spawnEntityIdOrName) {
    return sendConsoleCommand(`se ${playerNameOrEntityId} ${spawnEntityIdOrName}`);
}

export function kickPlayer(playerIdOrName) {
    return sendConsoleCommand(`kick ${playerIdOrName}`);
}

export function banPlayer(playerIdOrName, duration, durationUnit, reason, displayName) {
    return sendConsoleCommand(`ban add ${playerIdOrName} ${duration} ${durationUnit} ${reason} ${displayName}`);
}

export function addAdmin(playerIdOrName, level, displayName) {
    return sendConsoleCommand(`admin add ${playerIdOrName} ${level} ${displayName}`);
}

export function getLivePlayers(realTime = false) {
    return request.get('/LivePlayers' + (realTime ? '?realTime=true' : ''));
}

export function getLivePlayer(playerEntityId, realTime = false) {
    return request.get('/LivePlayers/' + playerEntityId + (realTime ? '?realTime=true' : ''));
}

export function getPlayerInventory(playerEntityId) {
    return request.get('/PlayerInventory/' + playerEntityId);
}

export function getHistoryPlayers(params) {
    return request.get('/HistoryPlayers', {
        params: params,
    });
}

export function getChatRecord(params) {
    return request.get('/ChatRecord', {
        params: params,
    });
}
