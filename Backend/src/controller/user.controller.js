import { asyncHandler } from "../utils/asynchandler.js";
import { User } from "../models/user.model.js";
import { ApiErrors } from "../utils/apierrors.js";
import {ApiResponse} from "../utils/apiresponse.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId); 

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken(); 

    user.refreshToken = accessToken; 

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiErrors(500, "Sorry for inconvenience");
  }
};

const registerUser = asyncHandler(async (req, res) => {
    const {email, fullName, username, password} = req.body;

    if([email, fullName, username, password].some((field) => 
        field?.trim() === ""
    )){
        throw new ApiErrors(400, "All field must be fill");
    }


    const existUser = await User.findOne({
        $or : [{username}, {email}]
    })

    if(existUser){
        throw new ApiErrors(409, "alerady exist username or email");
    }

    const Cuser = await User.create({
        fullName ,
        email,
        password,
        username : username,
    })


     if(!Cuser){
        throw ApiErrors(500, "somthing went wrong while registring user")
    }
     
    console.log(Cuser);

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(Cuser._id);

    const option = {
        httponly : true,
        secure : true
    }



    const createduser = await User.findById(Cuser._id).select("-password -refreshToken");
   
    return res
    .status(201)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(
        new ApiResponse(200, createduser, "user register successfuly")
    )
})


const loginUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    
     if(!(email || username)){
        throw new ApiErrors(400, "Please enter username or email");
    }
    
    const user = await User.findOne({ 
        $or : [{email}, {username}]
    })

    if(!user){
        throw new ApiErrors(404, "user not found with this email or username");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if(!isPasswordCorrect){
        throw new ApiErrors(400, "Password is incorrect");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    const option = {
        httponly : true,
        secure : true
    }

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    return res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(
        new ApiResponse(200, loggedInUser, "user login successfuly")
    )
})

const logout = asyncHandler(async (req, res) => {
  const userId = req.user._id; 

  if (!userId) {
    throw new ApiErrors(400, "User ID not found in cookies");
  }

  await User.findByIdAndUpdate(
    userId,
    { $set: { refreshToken: undefined } }, 
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "Strict"
  };

  return res
    .status(200)
    .clearCookie("accessToken", options) 
    .clearCookie("refreshToken", options)
    .json(new ApiErrors(200, {}, "User logged out successfully"));
});

export {registerUser, loginUser, logout}
