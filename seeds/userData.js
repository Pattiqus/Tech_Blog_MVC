/* eslint-disable @typescript-eslint/no-var-requires */
const { User } = require("../dist/models");
const userData = [

    {
        "name": "Mario",
        "email": "Mario@gmail.com",
        "password": "mario123"
    },
    {
        "name": "Luigi",
        "email": "Luigi@gmail.com",
        "password": "luigi123"
    },
    {
        "name": "Wario",
        "email": "Wario@gmail.com",
        "password": "wario123"
    },
    {
        "name": "Yoshi",
        "email": "Yoshi@gmail.com",
        "password": "yoshi123"
    }
]

const userSeed = () => User.bulkCreate(userData);

module.exports = userSeed;