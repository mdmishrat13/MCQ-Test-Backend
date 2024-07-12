import express, { Request, Response } from 'express';
import dotenv from 'dotenv'
dotenv.config()
const port = process.env.PORT || 5000

const connectDb = require("./db/db");
const cors = require('cors')
const router = require('./routes/user')
const cookieParser = require('cookie-parser')

const corsOptions = {
  origin: 'https://e-learning-git-main-mdmishrat13s-projects.vercel.app', 
  credentials: true
};


const app = express()

app.use(express.json());
app.use(cors(corsOptions))
app.use(cookieParser())

app.use('/api/v1',router)

app.get("/", (req:Request,res:Response) => {
    res.send("hellow world!")
})

const run = async () => {
    try {
      await connectDb(process.env.MONGO_URI);
      app.listen(port, () => console.info("Server is running...."));
    } catch (error:any) {
      console.info(`ERROR:${error.message}`)
    }
  };
  
  run();