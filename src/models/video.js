import mongoose from "mongoose";

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

videoSchema.pre("save", async function () {
  this.hashtags = this.hashtags[0]
    .split(",")
    .map((word) =>
      !word.trim().startsWith("#")
        ? `#${word.trim().replace(/#/g, "")}`
        : `#${word.trim().replace(/#/g, "")}`
    );
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
