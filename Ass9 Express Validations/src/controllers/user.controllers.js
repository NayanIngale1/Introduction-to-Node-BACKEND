const express = require("express");

const { body, validationResult } = require("express-validator");

const router = express.Router();

const User = require("../models/user.model");

router.post(
  "/",
  body("first_name").not().isEmpty().withMessage("First name is required"),
  body("last_name").not().isEmpty().withMessage("Last name is required"),
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email should be valid Email")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });

      if (user) {
        throw new Error("Email is already taken");
      }
      return true;
    }),
  body("pincode")
    .not()
    .isEmpty()
    .withMessage("please enter a pincode")
    .isLength({ min: 6, max: 6 })
    .withMessage("Please Enter A valid pincode"),
  body("age")
    .not()
    .isEmpty()
    .withMessage("age is required")
    .isNumeric()
    .withMessage("Age must be Number")
    .isNumeric()
    .withMessage("Age must be Number")
    .custom((value) => {
      if (value < 1 || value > 100) {
        throw new Error("please enter a valid age");
      }
      return true;
    }),
  body("gender")
    .not()
    .isEmpty()
    .withMessage("Gender is required")
    .custom((value) => {
      if (value < 4) {
        throw new Error("Please enter a valid gender");
      }
      if (value == "Male" || value == "Female" || value == "Others") {
        return true;
      }
      throw new Error("gender Should be male, female or others");
    }),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      console.log({ errors });
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }
      const user = await User.create(req.body);

      res.status(201).send({ user: user });
    } catch (error) {
      res.status(500).send({ message: error.message });
      // console.log("res:", res);
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const users = await User.find().lean().exec();

    return res.status(200).send({ Users: users });
  } catch (error) {
    return res.status(500).send({ message: error.message });
    // console.log('error:', error)
  }
});

module.exports = router;
