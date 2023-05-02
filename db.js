const mongoose = require("mongoose")
require("dotenv").config()

const appConnect = mongoose.connect(process.env.mongoURL)

module.exports = {
    appConnect
}