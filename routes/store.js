const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const multer = require("multer");
const fs = require("fs");
const auth = require("../middleware/auth");

const User = require("../models/User");
const Store = require("../models/store");

// Upload Folder
const upload = multer({ dest: "../New Folder/hypeit/public/images/" });

// @route    POST /store/link
// @desc     Link save to DB
// @access   Private
router.post("/link", auth, upload.single("image"), async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    const { title, linkURL } = req.body;
    const imgName = req.file.filename;

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
      await store.save();
    } else {
      // New
      await newStore.save();
    }
    res.send("success");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET /store/getAllStore
// @desc     Get all stores
// @access   Public
router.get("/getAllStore", async (req, res) => {
  let users = await Store.find();

  const { imgName } = users;

  res.json(users);
});

// @route    GET /store/:item
// @desc     Unpublish item
// @access   Private
router.get("/:imgName", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    let store = await Store.find({ user: user.id }).findOne({
      imgName: req.params.imgName,
    });

    const { isUnpublish } = store;

    await Store.findOneAndUpdate(
      { imgName: req.params.imgName },
      { isUnpublish: !isUnpublish }
    );

    res.json(store);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    Delete /store/:item
// @desc     Delete item
// @access   Private
router.delete("/:imgName", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    await Store.findOneAndDelete({ imgName: req.params.imgName });

    res.send("successed");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
