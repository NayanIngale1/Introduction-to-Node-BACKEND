const express = require("express");
const fs = require("fs");
const router = express.Router();

const upload = require("../middlewares/uploadProfilePic")

const User = require("../models/user.model");

// geting user list

router.get("/", async (req, res) => {
  try {
    const users = await User.find().lean().exec();

    return res.status(200).send({ users });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

//posting the user into

router.post("/",upload.single("profile_pic"),async (req, res) => {
  try {
    //setting data as per our formate and aslo setting the file path from file.path

    const data = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      profile_pic: req.file.path,
    };

    // setting data in the database

    const user = await User.create(data);

    return res.status(200).send({ user });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

//  updating the user with updated file path for profile pic
router.patch("/:userId", upload.single("profile_pic"), async (req, res) => {
  try {
    // getting data from the frontend server
    const data = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      profile_pic: req.file.path,
    };

    //getting user from data base

    let user = await User.findById(req.params.userId);

    // getting older path of profile picture from database inside
    let path = user.profile_pic;

    //deleting profile picture from database
    fs.unlinkSync(path);

    //upadating the users new data in database collection

    user = await User.findByIdAndUpdate(req.params.userId, data, { new: true });

    return res.status(200).send({ user });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

//deleting user from database

router.delete("/userId", async (req, res) => {
  try {
    //finding the user
    let user = await User.findById(req.params.userId);

    //removing path from the user database
    let path = user.profile_pic;

    fs.unlinkSync(path);

    //finding and deleting the user from database
    user = await User.findByIdAndDelete(req.params.userId);

    return res.status(200).send({ user });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

module.exports = router;
