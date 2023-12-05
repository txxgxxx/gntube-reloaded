import mongoose from "mongoose";

export const formatHashtags = (hashtags) =>
  hashtags
    .split(",")
    .map((word) =>
      !word.trim().startsWith("#")
        ? `#${word.trim().replace(/#/g, "")}`
        : `#${word.trim().replace(/#/g, "")}`
    );

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
