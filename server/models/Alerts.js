const mongoose = require("mongoose");
const { Schema } = mongoose;

const AlertSchema = new Schema({} ,{strict:false}, { timestamps: true });

module.exports = mongoose.model("Alert", AlertSchema);
