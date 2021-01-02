try {
    const geoAPIUrl = require('./config')

    const fetch = require('node-fetch')
    const ipRangeCheck = require('ip-range-check');

    module.exports = {
        checkGeoLocation(player: PlayerMp): boolean {
            try {
                return ipRangeCheck(player.data.local.main.geoLocation.lastIp, `${player.data.local.main.geoLocation.currentIp}/16`)
            } catch (e) {
                console.error(`<Error in data/geolocation/geoMethods.ts> ${e}`)
            }
        },

        async getGeoLocationCountryFromData(ipAddress: string) {
            try {
                const data = await fetch(geoAPIUrl + ipAddress)
                return data.country
            } catch (e) {
                console.error(`<Error in data/geolocation/geoMethods.ts> ${e}`)
            }
        },

        async getGeoLocationCityFromData(ipAddress: string) {
            try {
                const data = await fetch(geoAPIUrl  + ipAddress)
                return data.city
            } catch (e) {
                console.error(`<Error in data/geolocation/geoMethods.ts> ${e}`)
            }
        }

    }
} catch (e) {
    console.error(`<Error in data/geolocation/geoMethods.ts> ${e}`)
}