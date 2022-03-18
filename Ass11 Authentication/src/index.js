const express = require("express");

const app = express();

app.use(express.json());

const { register, login } = require("./controllers/auth.controller");

const { body, validationResult } = require("express-validator");

const postController = require("./controllers/post.controller");

app.post(
  "/register",
  body("name")
    .not()
    .isEmpty()
    .withMessage("Name is required")
    .isLength({ min: 4 })
    .withMessage("Name must be at least 4 characters"),
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address"),
  body("password")
    .not()
    .isEmpty()
    .withMessage("Please enter a password")
    .custom((value) => {
      const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{7,15}$/;
      if (!value.match(passw)) {
        throw new Error("Password must be strong");
      }
      return true;
    }),
  register
);

app.post(
  "/login",
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address"),
  login
);

app.use("/post", postController);

module.exports = app;
