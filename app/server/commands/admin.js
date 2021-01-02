var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
try {
    var adminCommands_1 = require('./data/adminCommands');
    var _a = require('./data/geolocation/geoMethods'), checkGeoLocation_1 = _a.checkGeoLocation, getGeoLocationCityFromData_1 = _a.getGeoLocationCityFromData, getGeoLocationCountryFromData_1 = _a.getGeoLocationCountryFromData;
    function checkCommandAcces(player, commandName) {
        try {
            var idx = adminCommands_1.findIndex(function (c) { return c.name === commandName; });
            if (idx !== -1) {
                return player.data.admin.level >= adminCommands_1[idx].accessLevel;
            }
            return false;
        }
        catch (e) {
            console.error("<Error in commands/admin.ts> " + e);
        }
    }
    function addAdminCommand(commandName, callback) {
        try {
            mp.events.addCommand(commandName, function (player, _) {
                var args = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    args[_i - 2] = arguments[_i];
                }
                var isCommandInAdminCommands = adminCommands_1.findIndex(function (c) { return c.name === commandName; });
                if (isCommandInAdminCommands !== -1) {
                    if (commandName !== 'alog') {
                        if (!player.data.admin.isAuthenticated)
                            return player.outputChatBox("<b>Error:</b> \u0412\u044B \u043D\u0435 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u043D\u044B, \u0434\u043E\u0441\u0442\u0443\u043F \u043A \u0430\u0434\u043C\u0438\u043D \u043A\u043E\u043C\u0430\u043D\u0434\u0430\u043C \u0437\u0430\u043A\u0440\u044B\u0442 (/alog)!");
                        if (!player.data.admin.isAcceptedAdmin)
                            return player.outputChatBox("<b>Error:</b> \u0423 \u0432\u0430\u0441 \u043D\u0435 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u044B \u0430\u0434\u043C\u0438\u043D-\u043F\u0440\u0430\u0432\u0430!");
                    }
                    if (!checkCommandAcces(player, commandName))
                        return player.outputChatBox("<b>Error:</b> \u0414\u0430\u043D\u043D\u0430\u044F \u043A\u043E\u043C\u0430\u043D\u0434\u0430 \u043D\u0435 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430 \u0434\u043B\u044F \u0432\u0430\u0448\u0435\u0433\u043E \u0443\u0440\u043E\u0432\u043D\u044F!");
                }
                callback.apply(void 0, __spreadArrays([player, _], args));
            });
        }
        catch (e) {
            console.error("<Error in commands/admin.ts> " + e);
        }
    }
    addAdminCommand('alog', function (player, _) {
        if (player.data.admin.isAuthenticated)
            return player.outputChatBox("<b>Error:</b> \u0412\u044B \u0443\u0436\u0435 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u043D\u044B!");
        player.data.admin.isAuthenticated = true;
        if (checkGeoLocation_1(player)) {
            player.data.admin.isAcceptedAdmin = true;
            player.outputChatBox("<b>Successful:</b> \u0412\u044B \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u043D\u044B!");
        }
        else {
            player.data.admin.isAcceptedAdmin = false;
            player.outputChatBox("<b>Some problems:</b> \u0412\u044B \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u043D\u044B, \u043D\u043E \u0434\u043E\u0441\u0442\u0443\u043F \u043A \u043A\u043E\u043C\u0430\u043D\u0434\u0430\u043C \u0437\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D \u0434\u043E \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F");
            sendAdminMessage(2, "<b>\u041C\u043E\u0434\u0435\u0440\u0430\u0442\u043E\u0440 " + player.data.main.firstName + ": " + player.data.main.lastName + " \u043D\u0435 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D</b>");
        }
    });
    addAdminCommand('acceptadmin', function (player, _, playerId) {
        if (playerId && playerId.trim().length > 0) {
            var sourcePlayer = mp.players.at(parseInt(playerId));
            if (!sourcePlayer)
                return player.outputChatBox("<b>Error:\u0422\u0430\u043A\u043E\u0433\u043E \u0438\u0433\u0440\u043E\u043A\u0430 \u043D\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442</b>");
            var cmdData = player.data.temp.commandAcceptData;
            if (cmdData && cmdData.commandName === 'acceptadmin') {
                sourcePlayer.data.admin.isAcceptedAdmin = true;
                player.data.temp.commandAcceptData.commandName = '';
                player.outputChatBox("<b>\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D");
            }
            else {
                var geoData = {
                    lastIp: player.data.main.geoLocation.lastIp,
                    currentIp: player.data.main.geoLocation.currentIp
                };
                player.outputChatBox("<b>\u0414\u0430\u043D\u043D\u044B\u0435 \u0438\u0433\u0440\u043E\u043A\u0430:");
                player.outputChatBox("\n                <b>\n                    Last Place: " + getGeoLocationCountryFromData_1(geoData.lastIp) + ", \n                    " + getGeoLocationCityFromData_1(geoData.lastIp) + "<br/> \n             \n                    Current Place: " + getGeoLocationCountryFromData_1(geoData.currentIp) + ", \n                    " + getGeoLocationCityFromData_1(geoData.currentIp) + " \n                </b>\n    \n                player.data.temp.commandAcceptData.commandName = 'acceptadmin'\n            ");
                player.outputChatBox("<b>\u0414\u043B\u044F \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u043C\u0430\u043D\u0434\u0443 \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u043E: /acceptadmin [playerid]");
            }
        }
        else
            player.outputChatBox("<b>\u041A\u043E\u043C\u0430\u043D\u0434\u0430:</b> /acceptadmin [playerId]");
    });
    addAdminCommand('kill', function (player) {
        player.health = 0;
    });
    addAdminCommand('hp', function (player) {
        player.health = 100;
    });
}
catch (e) {
    console.error("<Error in commands/admin.ts> " + e);
}
