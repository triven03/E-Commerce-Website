const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  fullname: String,
  userid: String,
  password: String,
  profile_pic: String,
  email:String,
  isVerified: {
    type: Boolean,
    default: false
  },
  otp:{
    type: String,
    default: ""
  }

});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;

