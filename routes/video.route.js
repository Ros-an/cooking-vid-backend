const express = require("express");
const router = express.Router();

const {getVideos, videoById, singleVideo} = require("../controllers/video.controller");

router.get("/", getVideos);
router.get("/video/:videoId", singleVideo);
router.param("videoId", videoById)

module.exports = router;