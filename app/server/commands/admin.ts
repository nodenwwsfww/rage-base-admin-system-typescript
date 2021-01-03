try {
    const adminCommands: Array<adminCMD> = require('../data/adminCommands')
    const {checkGeoLocation, getGeoLocationCityFromData, getGeoLocationCountryFromData} = require('../data/geoLocation/geoMethods')

    function checkCommandAcces(player: PlayerMp, commandName: string): boolean {
        try {
            const idx = adminCommands.findIndex(c => c.name === commandName)
            if (idx !== -1) {
                return player.data.local.admin.level >= adminCommands[idx].accessLevel
            }
            return false
        } catch (e) {
            console.error(`<Error in commands/admin.ts> ${e}`)
        }
    }

    function addAdminCommand(commandName: string, callback: Function) {
        try {
            mp.events.addCommand(commandName, (player: PlayerMp, _: string, ...args: Array<string>): void => {
                const isCommandInAdminCommands: number = adminCommands.findIndex( (c: adminCMD) => c.name === commandName)
                if (isCommandInAdminCommands !== -1) { // if command is admin command
                    if (commandName !== 'alog') {
                        if (!player.data.local.admin.isAuthenticated) return player.outputChatBox(`<b>Error:</b> Вы не авторизованы, доступ к админ командам закрыт (/alog)!`);
                        if (!player.data.local.admin.isAcceptedAdmin) return player.outputChatBox(`<b>Error:</b> У вас не подтверждены админ-права!`)
                    }
                    if (!checkCommandAcces(player, commandName)) return player.outputChatBox(`<b>Error:</b> Данная команда не доступна для вашего уровня!`)
                }

                callback(player, _, ...args)
            })
        } catch (e) {
            console.error(`<Error in commands/admin.ts> ${e}`)
        }
    }

    addAdminCommand('alog', (player: PlayerMp, _: string) => {
        if (player.data.local.admin.isAuthenticated) return player.outputChatBox(`<b>Error:</b> Вы уже авторизованы!`)

        player.data.local.admin.isAuthenticated = true
        if (checkGeoLocation(player)) {
            player.data.local.admin.isAcceptedAdmin = true
            player.outputChatBox(`<b>Successful:</b> Вы успешно авторизованы!`)
        } else {
            player.data.local.admin.isAcceptedAdmin = false
            player.outputChatBox(`<b>Some problems:</b> Вы авторизованы, но доступ к командам заблокирован до подтверждения`)
            sendAdminMessage(2,
                `<b>Модератор ${player.data.local.main.firstName}: ${player.data.local.main.lastName} не подтвержден</b>`
            )
        }

    })

    async function outputAcceptAdminData (player: PlayerMp, sourcePlayer: PlayerMp) {
        try {
            const geoData = {
                lastIp: sourcePlayer.data.local.main.geoLocation.lastIp,
                currentIp: sourcePlayer.data.local.main.geoLocation.currentIp,
            }

            const lastCityFromServer: string = await getGeoLocationCityFromData(geoData.lastIp)
            const lastCountryFromServer: string = await getGeoLocationCountryFromData(geoData.lastIp)

            const currentCityFromServer: string = await getGeoLocationCityFromData(geoData.currentIp)
            const currentCountryFromServer: string = await getGeoLocationCountryFromData(geoData.currentIp)

            if (!lastCityFromServer || !lastCountryFromServer || !currentCityFromServer || !currentCountryFromServer) {
                throw new Error('problems with geo API')
            }

            player.outputChatBox(`<b>Данные игрока:`)
            player.outputChatBox(`
                <b>
                    Last Place: ${lastCountryFromServer}, 
                    ${lastCityFromServer}<br/> 
             
                    Current Place: ${currentCountryFromServer}, 
                    ${currentCityFromServer} 
                </b>
            `)
            player.data.local.temp.commandAcceptData.commandName = 'acceptadmin'

            player.outputChatBox(`<b>Для подтверждения, введите команду повторно: /acceptadmin [playerid]`)
        }
        catch (e)
        {
            player.outputChatBox('<b>Error:</b> Произошла непредвиденная ошибка, сообщите разработчикам')
            console.error(e)
        }
    }

    addAdminCommand('acceptadmin', (player: PlayerMp, _: string, playerId: string) => {
        if (playerId && playerId.trim().length > 0) {
            let sourcePlayer = mp.players.at(parseInt(playerId));
            if (!sourcePlayer) return player.outputChatBox(`<b>Error:Такого игрока не существует</b>`)

            const cmdData = player.data.local.temp.commandAcceptData

            if (cmdData && cmdData.commandName === 'acceptadmin') {
                sourcePlayer.data.admin.isAcceptedAdmin = true
                player.data.local.temp.commandAcceptData.commandName = ''
                player.outputChatBox(`<b>Администратор успешно подтвержден`)
            } else {
                outputAcceptAdminData(player, sourcePlayer)
            }

        } else player.outputChatBox(`<b>Команда:</b> /acceptadmin [playerId]`);
    })
    addAdminCommand('kill', (player: PlayerMp) => {
        player.health = 0;
    });

    addAdminCommand('hp', (player: PlayerMp) => {
        player.health = 100;
    });

} catch (e) {
    console.error(`<Error in commands/admin.ts> ${e}`)
}