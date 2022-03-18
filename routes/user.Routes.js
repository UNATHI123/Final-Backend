const express = require('express')
const { authJwt } = require("../middlewares");
const router =express.Router();
const controller = require("../controllers/user.controller");
const bcrypt = require('bcryptjs')
const User = require("../models/user.model");
const { user } = require('../models');

//GET ALL USERS "/user" ///
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//GET USER BY ID //
router.get("/:user_id", (req, res) => {
  res.json(res.users);
});
  //GET ADMIN DATA //
  router.get(
    "/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

 /// POST ON USERS//

router.post("/signup", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    });
    const newUser = await user.save();
    res.status(201).json(newUser);
    console.log(salt);
    console.log(hashedPassword);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



// user login //
router.patch("/login", [authJwt.verifyToken], async (req, res) => {
  try {
    User.findOne({ username: req.body.username }, (err, customer) => {
      if (error) return handleError(error);
      if (!customer) {
        return res.status(404).send({ message: "User not found" });
      }
      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        User.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({ message: "invalid password" });
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const user = new User({
    username: req.body.user_fullname,
    email: req.body.email,
    password: req.body.password,

  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//updated user
router.patch("/signup/_id", async (req, res) => {
  if (req.body.username != null) {
    res.username = req.body.username;
  }
  if (req.body.email != null) {
    req.body.email = req.body.email;
  }
  if (req.body.password) {
    req.body.password = req.body.password;
  }
  if (req.body.phone_number != null) {
    req.user.phone_number = req.body.phone_number;
  }

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ mesage: error.message });
  }
});

//DELETING//
router.delete("/:id", getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: "user successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null)
      return res.status(404).json({ message: "cannot find user" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.user = user;
  next();
}

module.exports = router;

  
