interface AdminData {
    level: number
    isAuthenticated: boolean
    isAcceptedAdmin: boolean
}

interface PlayerData {
    admin: AdminData
    main: {
        login: string
        firstName: string
        lastName: string
        geoLocation: {
            lastIp: string
            currentIp: string
        }
        isAuthenticated: boolean
    }
    temp: {
        commandAcceptData: {
            commandName: string
        }
    }
}

interface globalData {
    [key: string]: {
        lastIp: string
    }
}
declare let game: globalData




