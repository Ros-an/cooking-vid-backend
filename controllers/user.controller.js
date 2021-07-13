const User = require("../models/user.model");
const Video = require("../models/video.model");

// get like , watch and history data

exports.getUserExploredData = async (req, res) => {
  try {
    const {likedVideo, watchLater, history} = await User.findById(req.body.userId).populate("likedVideo watchLater history").select("likedVideo watchLater history");
    res.status(201).json({
      success: true,
      likedVideo, 
      watchLater, 
      history
    })
  }catch(err){
    res.status(400).json({
      success: false,
      message: "error occurred during retrieval of data, for more see error message",
      errorMessage: err.message,
    });
  }
}
exports.saveToLike = async (req, res) => {
  try {
    const data = await User.findById(req.body.userId).populate("likedVideo watchLater history").select("likedVideo watchLater history");
    res.status(201).json({
      success: true,
      data
    })
  }catch(err){
    res.status(400).json({
      success: false,
      message: "problem occurred during updation, for more see error message",
      errorMessage: err.message,
    });
  }
}



exports.saveToLike = async (req, res) => {
  try {
    const {likedVideo} = await User.findByIdAndUpdate(req.body.userId,
    {$push : {likedVideo: req.body.videoId}}, {new: true}).populate("likedVideo").select("likedVideo");
    res.status(201).json({
      success: true,
      likedVideo
    })
  }catch(err){
    res.status(400).json({
      success: false,
      message: "problem occurred during updation, for more see error message",
      errorMessage: err.message,
    });
  }
}
exports.saveToWatchLater = async (req, res) => {
  try {
    const {watchLater} = await User.findByIdAndUpdate(req.body.userId,
    {$addToSet : {watchLater: req.body.videoId}}, {new: true}).populate("watchLater").select("watchLater");
    res.status(201).json({
      success: true,
      watchLater
    })
  }catch(err){
    res.status(400).json({
      success: false,
      message: "problem occurred during updation, for more see error message",
      errorMessage: err.message,
    });
  }
}
exports.saveToHistory = async (req, res) => {
  try {
    // this logic removes item if already exist
    await User.findByIdAndUpdate(req.body.userId,
    {$pull : {history: req.body.videoId}}, {new: true}).select("history");
    // after removing that item, this logic enters at last
    const {history} = await User.findByIdAndUpdate(req.body.userId,
    {$push : {history: req.body.videoId}}, {new: true}).populate("history").select("history");
    res.status(201).json({
      success: true,
      history
    })
  }catch(err){
    res.status(400).json({
      success: false,
      message: "problem occurred during updation, for more see error message",
      errorMessage: err.message,
    });
  }
}

// remove video
exports.removeFromLike = async (req, res) => {
  try {
    const {likedVideo} = await User.findByIdAndUpdate(req.body.userId,
    {$pull : {likedVideo: req.body.videoId}}, {new: true}).populate("likedVideo").select("likedVideo");
    res.status(201).json({
      success: true,
      likedVideo
    })
  }catch(err){
    res.status(400).json({
      success: false,
      message: "problem occurred during updation, for more see error message",
      errorMessage: err.message,
    });
  }
}
exports.removeFromWatchLater = async (req, res) => {
  try {
    const {watchLater} = await User.findByIdAndUpdate(req.body.userId,
    {$pull : {watchLater: req.body.videoId}}, {new: true}).populate("watchLater").select("watchLater");
    res.status(201).json({
      success: true,
      watchLater
    })
  }catch(err){
    res.status(400).json({
      success: false,
      message: "problem occurred during updation, for more see error message",
      errorMessage: err.message,
    });
  }
}
exports.removeFromHistory = async (req, res) => {
  try {
    const {history} = await User.findByIdAndUpdate(req.body.userId,
    {$pull : {history: req.body.videoId}}, {new: true}).populate("history").select("history");
    res.status(201).json({
      success: true,
      history
    })
  }catch(err){
    res.status(400).json({
      success: false,
      message: "problem occurred during updation, for more see error message",
      errorMessage: err.message,
    });
  }
}