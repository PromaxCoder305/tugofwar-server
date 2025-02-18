const express = require("express");
const uploads = require("../multerfiles/uploads");
const {
  addContent,
  getContentByDistrict,
  getLatestContent,
  getContentbyId
} = require("../controls/contentctrl");

const router = express.Router();

router.post("/addcontent", uploads.single("image"), addContent);
router.get('/bydistrict', getContentByDistrict);
router.get('/latestcontent', getLatestContent);
router.get('/getbyid/:id',getContentbyId)

module.exports = router;
