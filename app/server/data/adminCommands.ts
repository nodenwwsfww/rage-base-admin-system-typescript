type adminCMD = {
    name: string
    accessLevel? : number
}

const adminData: Array<adminCMD> = [

    {
        name: 'alog',
        accessLevel: 1,
    },

    {
        name: 'acceptadmin',
        accessLevel: 2,
    },

    {
        name: 'kill',
        accessLevel: 1,
    },

    {
        name: 'hp',
        accessLevel: 1,
    },
]

module.exports = adminData
