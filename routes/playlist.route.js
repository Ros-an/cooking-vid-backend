const express = require("express");
const router  = express.Router();

const {getPlaylist, addPlaylist, singleListOfPlaylist, addToListOfPlaylist, deleteListOfPlaylist, removeVideoFromList} = require("../controllers/playlist.controller");
router.get("/", getPlaylist);
router.post("/", addPlaylist);
router.get("/:playlistId", singleListOfPlaylist);
router.post("/:playlistId", addToListOfPlaylist);
router.delete("/:userId/:playlistId", deleteListOfPlaylist);
router.delete("/:userId/:playlistId/:videoId", removeVideoFromList);
module.exports = router;