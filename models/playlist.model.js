const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const playlistSchema = new mongoose.Schema({
  userId: {type: ObjectId, ref: "User"},
  playlist: [{
    name: String,
    list: {
      type: Array,
      video: Object
      }
    }]
})

module.exports = mongoose.model("Playlist", playlistSchema);