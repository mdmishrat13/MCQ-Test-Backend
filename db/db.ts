const { default: mongoose } = require("mongoose");

const connectDb = async(uri:string) => await mongoose.connect(uri)

module.exports = connectDb;