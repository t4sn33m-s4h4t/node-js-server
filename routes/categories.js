const router = require("express").Router();
const Category = require("../models/Category");

router.post("/", async (req, res) => {
  
  const newCat = new Category(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
  } catch (err) {
    
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  console.log(req.params.id)
  try {
    const deletedCat = await Category.findByIdAndDelete(req.params.id);
   
    if (!deletedCat) {
      res.status(404).json({ message: "Category not found" });
    } else {
      res.status(200).json(deletedCat);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const cats = await Category.find();
    res.status(200).json(cats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
