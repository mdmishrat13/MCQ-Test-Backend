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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.PORT || 5000;
const connectDb = require("./db/db");
const cors = require('cors');
const userRouter = require('./routes/user');
const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser')
const corsOptions = {
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true // Allow credentials (cookies) to be sent
};
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/api/v1/auth', userRouter);
app.get("/", (req, res) => {
    res.send("hellow world!");
});
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connectDb(process.env.MONGO_URI);
        app.listen(port, () => console.info("Server is running...."));
    }
    catch (error) {
        console.info(`ERROR:${error.message}`);
    }
});
run();
