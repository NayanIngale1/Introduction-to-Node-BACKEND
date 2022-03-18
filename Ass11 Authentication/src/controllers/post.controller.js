const express = require("express");
const router = express.Router();

const authenticate = require("../middlewares/authenticate");

const Post = require("../models/post.model");

router.get("/", authenticate, async (req, res) => {
  try {
    const posts = await Post.find()
      .populate({ path: "user", select: { name: 1, email: 1, _id: 0 } })
      .lean()
      .exec();

    return res.status(200).send(posts);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.post("/", authenticate, async (req, res) => {
  try {
    req.body.user = req.user._id;

    const post = await Post.create(req.body);

    return res.status(200).send(post);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.patch("/:id", authenticate, async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate({ path: "user", select: { name: 1, email: 1, _id: 0 } });

    return res.status(200).send(post);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id, req.body);

    return res.status(200).send(post);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

module.exports = router;
