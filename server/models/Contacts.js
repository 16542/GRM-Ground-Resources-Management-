const mongoose = require("mongoose");
const { Schema } = mongoose;

const ContactSchema = new Schema({} ,{strict:false}, {timestamps:true});



module.exports = mongoose.model("Contact", ContactSchema)