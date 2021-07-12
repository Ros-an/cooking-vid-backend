const Playlist =  require("../models/playlist.model");

// get all the list of playlist
exports.getPlaylist = async(req, res) => {
  try{
    const {userId} = req.body;
    const playlist = await Playlist.findOne({userId});
    if(playlist){
      res.status(200).json({
        success: true,
        playlist
      })
    }else {
      res.status(400).json({
        success: false,
        message: "No playlist"
      })
    }
  }catch(err){
      res.status(500).json({ 
        success: false,
        message: "Could not fetch data, for reason see errorMessage",
        errorMessage: err.message
      })
  }
}
// add list to playlist
exports.addPlaylist = async (req, res) => {
  try{
    const {userId, playlist } = req.body;
    const listExists = await Playlist.findOne({userId});
    if(listExists){
      const list = await Playlist.findOneAndUpdate({userId},
      {$push : {playlist: playlist}}, {new: true});
      res.status(201).json({
        success: true,
        playlist: list
      }) 
    }else{
      const newPlaylist = new Playlist({userId, playlist});
      const savedPlaylist = await newPlaylist.save();
      res.status(201).json({
        success: true,
        playlist: savedPlaylist
      })
    }
  }catch (error) {
      res.status(500).json({
        success: false, 
        message: "could not add",
        errorMessage: error.message
      })
  }
}

// add/remove operation on playlist

// get info of single list of playlist
exports.singleListOfPlaylist = async (req, res) => {
  try {
    const {playlistId} = req.params;
    const [data] = await Playlist.find({"playlist._id": playlistId},
    {
      playlist:{$elemMatch: {_id: playlistId}}
    });
    res.status(200).json({
      success: true,
      playlist: data
    })
  }catch(err){
    res.status(400).json({
      success: false,
      message: "could not retrieve requested list",
      error: err
    })
  }
}

// add video to one of the list of playlist
exports.addToListOfPlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const {video, userId} = req.body;
    const list =  await Playlist.findOneAndUpdate({"userId": userId, "playlist._id": playlistId}, {"$addToSet":{"playlist.$.list": video}}, {new: true}); 
    res.status(201).json({
      success: true,
      playlist: list
    })
  }catch(err){
    res.status(500).json({
      success: false,
      message: "could not add video to list",
      errorMessage: err.message
    })
  }
}

// remove list from playlist

exports.deleteListOfPlaylist = async (req, res) => {
  try{
    const {userId, playlistId} = req.params;
    const updatePlaylist = await Playlist.findOneAndUpdate({userId}, {$pull: {playlist: {_id: playlistId}}}, {new: true});
    res.status(200).json({
      success: true,
      playlist: updatePlaylist
    })
  }catch(err){
    res.status(500).json({
      success: false,
      message: "could not delete that list, for reason check errorMessage",
      errorMessage: err.message
    })
  }
}

// remove video from list

exports.removeVideoFromList = async(req, res) => {
  try{
    const { userId, playlistId, videoId} = req.params;
    const updatedList = await Playlist.findOneAndUpdate({"userId":  userId, "playlist._id": playlistId},{ "$pull": {"playlist.$.list": {"_id": videoId}}}, {new: true});
    res.status(201).json({
      success: true,
      playlist: updatedList
    })
  }catch(err){
    res.status(500).json({
      success: false,
      message: "could not remove video form list",
      errorMessage: err.message
    })
  }
}