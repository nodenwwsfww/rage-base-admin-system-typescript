function sendAdminMessage(minimalLevel: number, message: string): void {
    try {
        mp.players.forEach((_player: PlayerMp) => {
            if (_player.data.local.admin.level >= minimalLevel) {
                _player.outputChatBox(message)
            }
        })

    } catch (e) {
        console.error(`<Error in global/admin.ts> ${e}`)
    }
}