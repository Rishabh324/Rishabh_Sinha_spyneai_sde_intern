const mongoose = require("mongoose");

const connectDB = async () => {
    const DB = process.env.DATABASE.replace('<db_password>', process.env.DATABASE_PASSWORD);

    console.log(DB);
    await mongoose
        .connect(DB)
        .then(() => console.log("connected database"))
        .catch(err => console.log(err));
}

module.exports = connectDB;