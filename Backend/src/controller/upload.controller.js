import fs from "fs"
import cloudinary from "../utils/cloudinary.js"
import Document from "../models/summerdoc.model.js"
import { asyncHandler } from "../utils/asynchandler.js";

export const uploadDocument = asyncHandler(async (req, res) => {

    const result = await cloudinary.uploader.upload(req.files.file[0].path, { resource_type: "auto" })

    if(!result) {{
        return res.status(500).json({message: "Cloudinary upload failed"});
    }}
    const newDocument = Document.create({
        name: req.files.file[0].originalname,
        link: result.secure_url,
        userId: req.user._id
    })

    fs.unlinkSync(req.files.file[0].path)

    res.status(201).json({ success: true, document: newDocument });


})