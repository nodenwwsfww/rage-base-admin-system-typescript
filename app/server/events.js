try {
    mp.events.add('playerJoin', function (player) {
        if (!game['test'])
            game['test'] = {
                lastIp: player.ip
            };
        player.data = {
            admin: {
                isAcceptedAdmin: false,
                isAuthenticated: false,
                level: 1
            },
            main: {
                isAuthenticated: true,
                login: 'test',
                firstName: 'Test',
                lastName: 'Testovich',
                geoLocation: {
                    lastIp: game['test'].lastIp,
                    currentIp: player.ip
                }
            },
            temp: {}
        };
        mp.players.forEach(function (_player) {
            if (_player !== player)
                _player.call('playerJoinedServer', [player.id, player.name]);
        });
    });
}
catch (e) {
    console.error("<Error in events> " + e);
}
