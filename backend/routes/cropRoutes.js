// routes/CropRoutes.js
const express = require("express");
const router = express.Router();
const cropController = require("../controllers/cropController");

router.get("/crops", cropController.getAllCropNodes);

module.exports = router;
