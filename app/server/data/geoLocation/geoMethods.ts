import geoAPIUrl from './config'

// @ts-ignore
import fetch from 'node-fetch'
// @ts-ignore
import ipRangeCheck from 'ip-range-check'

export function checkGeoLocation (player: PlayerMp): boolean {
    try {
        return ipRangeCheck(player.data.local.main.geoLocation.lastIp, `${player.data.local.main.geoLocation.currentIp}/16`)
    } catch (e) {
        console.error(`<Error in data/geolocation/geoMethods.ts> ${e}`)
    }
}

export async function getGeoLocationCountryFromData(ipAddress: string)
{
    try {
        const data = await fetch(geoAPIUrl + ipAddress)
        if (typeof data?.country !== 'string') return false
        return data.country
    } catch (e) {
        console.error(`<Error in data/geolocation/geoMethods.ts> ${e}`)
    }
}

export async function getGeoLocationCityFromData(ipAddress: string) {
    try {
        const data = await fetch(geoAPIUrl  + ipAddress)
        if (typeof data?.city !== 'string') return false
        return data.city
    } catch (e) {
        console.error(`<Error in data/geolocation/geoMethods.ts> ${e}`)
    }
}