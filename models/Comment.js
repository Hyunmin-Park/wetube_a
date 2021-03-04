import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: "Text is required",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  //   videos: {
  //     // 비디오와 관계를 만들어주기
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Video",
  //   },
});

const model = mongoose.model("Comment", CommentSchema);
export default model;
