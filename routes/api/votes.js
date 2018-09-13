const express = require("express");
const router = express.Router();

//item model
const Vote = require("../../models/Vote");

// @route GET api/items
// @desc Get all items
// @access Public
router.get("/", (req, res) => {
  Vote.find()
    .sort({ date: -1 })
    .then(votes => res.json(votes));
});

// @route  POST api/items
// @desc   Create a item
// @access Public
router.post("/", (req, res) => {
  const { user_data, vote_reslt } = req.body;
  const newItem = new Vote({
    name: user_data.name,
    email: user_data.email,
    phone: user_data.phone,
    voteResult: vote_reslt
  });

  newItem.save().then(vote => res.status(200).json({ success: true }));
});

// @route  DELETE api/items/:id
// @desc   Delete a item
// @access Public
router.delete("/:id", (req, res) => {
  Vote.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
