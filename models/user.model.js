const mongoose = require("mongoose");
const {v4: uuid} = require("uuid");
const {ObjectId} = mongoose.Schema;
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: "Enter your name.",
    minlength: [3, "Name length atleast 3"],
  },
  email: {
      type: String,
      trim: true,
      unique: true,
      required: "Email is required",
    },
  hashed_password: {
      type: String,
      required: true,
    },
  salt: String,
  likedVideo: [{type: ObjectId, ref: "Video"}],
  watchLater: [{type: ObjectId, ref: "Video"}],
  history: [{type: ObjectId, ref: "Video"}]

}, {timestamps: true});


// virtual field

userSchema
.virtual("password")
.set(function (password){
  // create a temp virtual
  this._password = password;
  // generate a timestamp
  this.salt = uuid();
  // encryptPassword()
  this.hashed_password  = this.encryptPassword(password);
})
.get(function (){
  return this._password;
});

// methods 
userSchema.methods = {
  authenticate: function (plainText){
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if(!password) return "";
    try{
      return crypto
          .createHmac("sha1", this.salt)
          .update(password)
          .digest("hex");
    }catch(err){
      return "";
    }
  },
}

module.exports = mongoose.model("User", userSchema);