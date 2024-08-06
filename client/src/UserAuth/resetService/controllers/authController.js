const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')
const {attachCookiesToResponse, createTokenUser} = require('../utils')

const register = async(req, res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        throw new CustomError.BadRequestError('please provide name, email, password')
    }
   
    const isEmailExist = await User.findOne({email: email});
    if(isEmailExist){
        throw new CustomError.BadRequestError('email already exist')
    }
    const NumOfAccounts = await User.countDocuments({});
    const role =(NumOfAccounts === 0)? 'admin' : 'user'

    const user = await User.create({name, email, password, role});

    const tokenUser = createTokenUser(user);
    attachCookiesToResponse(res, tokenUser)

    res.status(StatusCodes.CREATED).json({user: tokenUser});
}

const login = async(req, res) => {
    const {email, password} = req.body;
    console.log("email password is ", email, password)
    if(!email || !password){
        throw new CustomError.BadRequestError('please provide email and password')
    }
    const user = await User.findOne({email: email});
    if(!user){
        throw new CustomError.BadRequestError(`no user with email ${email}`)
    }

    const isPasswordCorrect = await user.comparePassword(password)

    if(!isPasswordCorrect){
        throw new CustomError.BadRequestError('invalid credential')
    }

    const tokenUser = createTokenUser(user);
    const new_token = attachCookiesToResponse(res, tokenUser)  ;
    res.status(StatusCodes.ACCEPTED).json({user: tokenUser})
}  

const logout = async(req, res) => {
    console.log("  LOGGGING OUT")
    res.cookie('checkToken', 'logout', {
        origin:process.env.FRONTEND_URL,
        expires: new Date(Date.now() + 5 * 1000),
        secure: true,
        sameSite: "none",
    })
    res.status(StatusCodes.OK).json({msg: 'log out'})
}

module.exports = {login, logout, register}