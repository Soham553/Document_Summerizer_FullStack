import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userShema = new Schema({
    username : {
        type : String,
        required : true,
        lowercase : true,
        unique : true,
        trim : true,
        index : true
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        unique : true,
        trim : true
    },
    fullName : {
        type : String,
        required : true,
    },
     password : {
        type : String,
        required : [true, "Password is required"]
    },
    refreshToken : {
        type : String
    }
})

userShema.pre("save", async function (next) {
    if(!this.isModified("password") ) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userShema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userShema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this.id,
      email: this.email,
      username: this.username,
      fullname: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userShema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this.id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};



export const User = mongoose.model("User", userShema);