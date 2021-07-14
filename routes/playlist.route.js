const express = require("express");
const router  = express.Router();

const {getPlaylist, addPlaylist, singleListOfPlaylist, addToListOfPlaylist, deleteListOfPlaylist, removeVideoFromList} = require("../controllers/playlist.controller");
router.get("/:user_id", getPlaylist);
router.post("/", addPlaylist);
router.get("/single/:playlistId", singleListOfPlaylist);
router.post("/:playlistId", addToListOfPlaylist);
router.delete("/:userId/:playlistId", deleteListOfPlaylist);
router.delete("/:userId/:playlistId/:videoId", removeVideoFromList);
module.exports = router;