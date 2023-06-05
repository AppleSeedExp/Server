const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const multer = require("multer");
const auth = require("../middleware/auth");

const User = require("../models/User");
const Store = require("../models/store");

// Upload Folder
const upload = multer({ dest: "images/" });

// @route    POST /store/link
// @desc     Link save to DB
// @access   Private
router.post("/link", auth, upload.single("image"), async (req, res) => {
  console.log("Start");
  try {
    const user = await User.findById(req.user.id).select("-password");

    const { title, linkURL } = req.body;
    const imgName = req.file.filename;

    console.log(
      "T-" + user.id + ", linkURL-" + linkURL + ", imgName-" + imgName
    );

    let store = await Store.findOne({ linkURL: req.body.linkURL }).populate(
      "user",
      ["name", "email"]
    );

    let newStore = new Store({
      user: user.id,
      imgName: imgName,
      title: title,
      linkURL: linkURL,
    });

    if (store) {
      // Update

      store.imgName = imgName;
      await store.save();
    } else {
      // New
      await newStore.save();
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
