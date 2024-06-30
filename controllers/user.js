"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const User = require("./../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, } = req.body;
        if (!name) {
            return res.status(500).json({ errorMessage: "First Name is required!" });
        }
        if (!email) {
            return res.status(500).json({ errorMessage: "Email is required!" });
        }
        if (!password) {
            return res.status(500).json({ errorMessage: "Password is required!" });
        }
        const exist = yield User.findOne({ email });
        if (exist) {
            return res.status(500).send({ status: "Email already exists!" });
        }
        const salt = yield bcrypt.genSalt(10);
        const hashPassword = yield bcrypt.hash(password, salt);
        const newUser = new User({
            name,
            email,
            password: hashPassword,
        });
        const saveUser = yield newUser.save();
        const token = jwt.sign({
            user: saveUser._id,
        }, process.env.JWT_SECRET);
        res
            .cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Secure cookies in production
            sameSite: 'lax'
        })
            .send({ status: 'Registration Successful!', data: saveUser });
    }
    catch (error) {
        console.log(error.message);
        return res.json(error);
    }
});
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email) {
        return res.status(500).json({ errorMessage: "Email is required!" });
    }
    if (!password) {
        return res.status(500).json({ errorMessage: "Password id required!" });
    }
    try {
        const exist = yield User.findOne({ email });
        if (!exist) {
            return res.status(500).json({ errorMessage: "Wrong email or password!" });
        }
        const verifyPassword = yield bcrypt.compare(password, exist.password);
        if (!verifyPassword) {
            return res.status(500).json({ errorMessage: "Wrong email or password!" });
        }
        const token = jwt.sign({
            user: exist._id,
        }, process.env.JWT_SECRET);
        res
            .cookie("token", token, {
            httpOnly: true,
        })
            .send({ status: 'Login Successful!', data: exist });
    }
    catch (error) {
        return res.send(error);
    }
});
const checkLoggedIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("checkloggedin api hit");
        const token = req.cookies.token;
        if (!token) {
            return res.send(false);
        }
        jwt.verify(token, process.env.JWT_SECRET);
        res.send(true);
    }
    catch (error) {
        res.send(false);
    }
});
const logoutUser = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
    })
        .send('logged out successfully');
};
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ errorMessage: "Authentication failed!" });
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode) {
            return res.status(401).json({ errorMessage: "Authentication failed!" });
        }
        const user = yield User.findById(id).select('-password');
        if (!user) {
            res.status(404).json({ errorMessage: "User not found!" });
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(404).json({ errorMessage: "User not found!" });
    }
});
// const getUser= async(req:Request,res:Response)=>{
//   try {
//     const id = req.user.user
//       const user = await User.findOne({_id:id})
//       if(!user){
//           res.status(404).json({errorMessage:"User not found!"})
//       }
//       res.status(200).json(user)
//   } catch (error) {
//       res.status(404).json({errorMessage:"User not found!"})
//   }
// }
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User.find();
        if (!users) {
            res.status(404).json({ errorMessage: "Users not found!" });
        }
        res.status(200).json(users);
    }
    catch (error) {
        res.status(404).json({ errorMessage: "Users not found!" });
    }
});
module.exports = {
    createUser,
    loginUser,
    getProfile,
    logoutUser,
    getUsers,
    checkLoggedIn
};
