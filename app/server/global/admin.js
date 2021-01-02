function sendAdminMessage(minimalLevel, message) {
    try {
        mp.players.forEach(function (_player) {
            if (_player.data.admin.level >= minimalLevel) {
                _player.outputChatBox(message);
            }
        });
    }
    catch (e) {
        console.error("<Error in global/admin.ts> " + e);
    }
}
