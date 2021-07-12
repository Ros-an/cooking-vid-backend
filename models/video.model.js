const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;
const videoData = require("./data")

const videoSchema = new mongoose.Schema({
  category: String,
  title: String,
  views: String,
  timestamp: String,
  channel: String,
  avatar_img: String,
  image: String,
  gif: String,
  videoLink: String,
  likes: [{type: ObjectId, ref: "User"}]
});

const Video = mongoose.model("Video", videoSchema);

// function fillDB() {
//   try {
//     videoData.forEach(async (video) => {
//       const newVideo = new Video(video);
//       const savedVideo = await newVideo.save();
//       console.log(savedVideo);
//     })
//   }catch(e) {
//       console.log(e);
//   }
// }



module.exports = {Video};