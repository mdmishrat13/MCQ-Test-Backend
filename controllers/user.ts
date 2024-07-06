import { NextFunction, Request, Response } from "express";

const User = require("./../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, } = req.body;
    if (!name) {
      return res.status(500).json({ errorMessage: "Name Name is required!" });
    }
    if (!email) {
      return res.status(500).json({ errorMessage: "Email is required!" });
    }
    if (!password) {
      return res.status(500).json({ errorMessage: "Password is required!" });

    }
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(500).send({ status: "Email already exists!" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });
    const saveUser = await newUser.save();

    const token = jwt.sign(
      {
        user: saveUser._id,
      },
      process.env.JWT_SECRET
    );

    res

      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Secure cookies in production
        sameSite: 'lax'
      })
      .send({ status: 'Registration Successful!', data: saveUser });
  } catch (error: any) {
    console.log(error.message)
    return res.json(error);
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(500).json({ errorMessage: "Email is required!" });
  }
  if (!password) {
    return res.status(500).json({ errorMessage: "Password id required!" });
  }
  try {

    const exist = await User.findOne({ email });
    if (!exist) {
      return res.status(500).json({ errorMessage: "Wrong email or password!" });
    }

    const verifyPassword = await bcrypt.compare(password, exist.password);
    if (!verifyPassword) {
      return res.status(500).json({ errorMessage: "Wrong email or password!" });
    }
    const token = jwt.sign(
      {
        user: exist._id,
      },
      process.env.JWT_SECRET
    );

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send({ status: 'Login Successful!', data: exist });
  } catch (error) {
    return res.send(error);
  }
};

const checkLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("checkloggedin api hit")
    const token = req.cookies.token;
    if (!token) {
      return res.send(false)
    }
    jwt.verify(token, process.env.JWT_SECRET)
    res.send(true)
  } catch (error) {
    res.send(false)
  }
}

const logoutUser = (req: Request, res: Response) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  })
    .send('logged out successfully');
};

const getProfile = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ errorMessage: "Authentication failed!" })
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    if (!decode) {
      return res.status(401).json({ errorMessage: "Authentication failed!" })
    }
    const user = await User.findById(id).select('-password');
    if (!user) {
      res.status(404).json({ errorMessage: "User not found!" });
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(404).json({ errorMessage: "User not found!" });
  }
};

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

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find()
    if (!users) {
      res.status(404).json({ errorMessage: "Users not found!" })
    }
    res.status(200).json(users)
  } catch (error) {
    res.status(404).json({ errorMessage: "Users not found!" })
  }
}

module.exports = {
  createUser,
  loginUser,
  getProfile,
  logoutUser,
  getUsers,
  checkLoggedIn
};