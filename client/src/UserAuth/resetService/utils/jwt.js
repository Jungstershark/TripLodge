const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const StatusCodes = require('http-status-codes')

const createJWT = ({payload}) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return token;
}

const isTokenValid = ({token}) => {
   return jwt.verify(token, process.env.JWT_SECRET)
}


const attachCookiesToResponse = (res, user) => {
    const token = createJWT({payload: user})

    const oneDay = 1000 * 60 * 60 * 24 //the number of ms in a day

    console.log("token  new is is", token)

    console.log("attaching cookies to responseeeeeeeee ", user)
    console.log("token  new is is", token)
    console.log("uploading token to ", process.env.FRONTEND_URL)
    res.cookie('token', token, {
        origin:[process.env.FRONTEND_URL],
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: true,
        signed : true,
        sameSite: "none",
    }).cookie('checkToken', token, {
        origin: process.env.FRONTEND_URL,
        expires: new Date(Date.now() + oneDay),
        secure: true,
        signed : true,
        sameSite: "none",
    })

    console.log("----------------")
    console.log("COOKIE token  new is is", token)

    return token;
}

module.exports = {createJWT, isTokenValid, attachCookiesToResponse}