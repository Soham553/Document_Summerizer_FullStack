import {v2 as cloudinary} from "cloudinary"

cloudinary.config({
    cloud_name: process.env.Cloud_Name, 
    api_key: process.env.Api_Key, 
    api_secret: process.env.Api_Secret
})

export default cloudinary;