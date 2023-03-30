const router = require("express").Router();
const User = require("../models/User");


//CREATE USER
router.post("/", async (req, res) => {
  const newUser = new User(req.body);
  console.log(req.body)
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
});
//DELETE
router.delete("/:id", async (req, res) => {
  console.log(req.params.id)
  try {
    const deletedCat = await User.findByIdAndDelete(req.params.id);
   
    if (!deletedCat) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(deletedCat);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    const sanitizedUsers = users.map((user) => {
      const { password, ...others } = user._doc;
      return others;
    });
    res.status(200).json(sanitizedUsers);
  } catch (err) {
    res.status(500).json(err);
  }
});


//GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
