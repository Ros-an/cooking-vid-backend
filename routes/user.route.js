const express = require("express");
const router = express.Router();

const { saveToLike, saveToWatchLater, saveToHistory, removeFromLike, removeFromWatchLater, removeFromHistory, getUserExploredData } = require("../controllers/user.controller");
router.get("/like_watch_history", getUserExploredData)
router.post("/like", saveToLike);
router.post("/watch_later", saveToWatchLater);
router.post("/history", saveToHistory);
router.post("/like/remove", removeFromLike);
router.post("/watch_later/remove", removeFromWatchLater);
router.post("/history/remove", removeFromHistory);

module.exports = router;

// for post request you can send userid/videoid in body