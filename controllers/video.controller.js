const {Video} = require("../models/video.model");


exports.getVideos =async (req, res) => {
   try {
    const videos = await Video.find({});
    res.status(200).json({
      success: true,
      videos
    })
  }catch(err) {
    res.status(500).json({
      success: false,
      message: "could not found products"
    })
  }
}

exports.singleVideo  = async (req, res) =>{
 try {
  const video =  req.video;
  res.status(200).json({
    success: true,
    video
  })
  }catch(err){
  res.json({
    success: false,
    message: "error occured while retrieving"
  })
}
}
exports.videoById = async(req, res, next, id) =>{
  try {
    const video = await Video.findById(id);
    if(!video){
      return res.status(400).json({
        success: false,
        message: "there is no such video.",
        errorMessage: err.message
      })
    }
    req.video = video;
  }catch(err){
res.status(400).json({
        success: false,
        message: "error in finding the queried video.",
        errorMessage: err.message
      })
  }
  next()
}