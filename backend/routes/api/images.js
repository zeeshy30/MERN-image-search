const express = require("express");
const router = express.Router();
const Unsplash = require("unsplash-js").default;
const toJson = require("unsplash-js").toJson;
const fetch = require("node-fetch");
const keys = require("../../config/keys");
const auth = require("../../middleware/auth")
global.fetch = fetch;

const unsplash = new Unsplash({ accessKey: keys.UnsplashAccessKey });

// @route GET api/images/search
// @desc Use unsplash API to find images using search query
// @access Private
router.get("/search", auth, (req, res) => {
  const searchTerm = req.query.query;
  const pageNum = req.query.page;
  unsplash.search
    .photos(searchTerm, pageNum, 20, { orientation: "portrait" })
    .then(toJson)
    .then(json => {
      res.send(json);
    });
});

module.exports = router;