const express = require("express");
const router = express.Router();
const { getAllCropNodes, getByCrop } = require("../controllers/cropController");

router.get("/", getAllCropNodes);
router.get("/crop/:name", getByCrop);

module.exports = router;
