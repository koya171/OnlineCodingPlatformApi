const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const CryptoJS = require("crypto-js");
const { v4: uuidv4 } = require("uuid");

// 1.Login - POST
// 2.creating account - POST

router.get("/", async (req, res) => {
  let users = await userModel.find({});
  res.status(200).json(users);
});

router.post("/", (req, res) => {
  let userObj = req.body;
  userObj.password = CryptoJS.AES.encrypt(
    userObj.password,
    "1234567"
  ).toString();
  userObj["userid"] = uuidv4();
  let newUser = new userModel(userObj);
  newUser
    .save()
    .then((doc) => {
      res.json({ error: false, response: doc });
    })
    .catch((err) => {
      console.log(err);
      res.json({ error: true, message: "Error in creating doc" });
    });
});

router.post("/login", (req, res) => {
  // localhost:3000/users/login
  let data = req.body;
  userModel
    .findOne({ email: data.email })
    .then((userDoc) => {
      if (userDoc == null) {
        res.json({ error: true, message: "Account does not exit" });
      } else {
        let decryptedPassword = CryptoJS.AES.decrypt(
          userDoc.password,
          "1234567"
        ).toString(CryptoJS.enc.Utf8);
        if (decryptedPassword == data.password) {
          res.json({ error: false, response: userDoc });
        } else {
          res.json({ error: true, message: "Incorrect Password" });
        }
      }
    })
    .catch();
});

module.exports = router;
