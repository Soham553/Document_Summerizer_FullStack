import mongoose from "mongoose";

const docSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  link: {
    type: String,   
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",   
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Document = mongoose.model("Document", docSchema);
export default Document;
