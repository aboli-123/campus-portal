const router = require("express").Router();
const Item = require("../models/Item");
const auth = require("../middleware/auth");
const { upload, uploadToCloudinary } = require("../config/cloudinary");

// Post a new item (login required)
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const { title, description, type, category, location, date } = req.body;
    let imageUrl;
    if (req.file) imageUrl = await uploadToCloudinary(req.file.buffer);

    const item = await Item.create({
      title, description, type, category, location, date, imageUrl,
      postedBy: req.user.id,
    });
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// List items, with optional filters: ?type=lost&category=ID&search=wallet
router.get("/", async (req, res) => {
  try {
    const { type, category, search } = req.query;
    const filter = {};
    if (type) filter.type = type;
    if (category) filter.category = category;
    if (search) {
      const safe = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.title = { $regex: safe, $options: "i" };
    }
    const items = await Item.find(filter)
      .sort({ createdAt: -1 })
      .populate("postedBy", "name");
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get one item
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate("postedBy", "name");
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: "Invalid item id" });
  }
});

module.exports = router;