const express = require("express");

const router = express.Router();

const User = require("../models/user.model");

const transport = require("../configs/mails");

router.get("/", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const pagesize = req.query.pagesize || 10;

    const skip = (page - 1) * pagesize;

    const users = await User.find({}).skip(skip).limit(pagesize).lean().exec();

    const totalPages = Math.ceil(
      (await User.find().countDocuments()) / pagesize
    );
    return res.status(200).send({ users, totalPages });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);

    // send mail with defined transport object
    transport.sendMail({
      from: '"Amazone sales department" <nayanvpingale@example.com>', // sender address

      to: user.email, // list of receivers
      subject: `Welcome to ABC system ${user.first_name} ${user.last_name}`, // Subject line
      text: `Hi ${user.first_name}, Please confirm your email address create a set of admins ( 5 admin users)`, // plain text body
      html: `Hi ${user.first_name}, Please confirm your email address create a set of admins ( 5 admin users)`, // html body
    });

    return res.status(201).send(user);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

module.exports = router;
