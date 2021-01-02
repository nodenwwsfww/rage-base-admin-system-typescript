try {
    mp.events.add('playerJoin', (player: PlayerMp) => {
        if (!game['test']) game['test'] = {
            lastIp: player.ip
        }

        player.data.local = {
            admin: {
                isAcceptedAdmin: false,
                isAuthenticated: false,
                level: 1,
            },

            main: {
                isAuthenticated: true,
                login: 'test',
                firstName: 'Test',
                lastName: 'Testovich',
                geoLocation: {
                    lastIp: game['test'].lastIp,
                    currentIp: player.ip,
                }
            },

        } as PlayerData

    })
} catch (e) {
    console.error(`<Error in events> ${e}`)
}