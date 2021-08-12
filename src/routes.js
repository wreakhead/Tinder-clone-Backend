const express = require("express");
const service = require("./connection")
const router = express.Router();

router.post("/tinder/card", async (req, res, next) => {
  try {
    const dbCard = req.body;
    const DB = await service.getTinderData();
    let createEntry = new DB({
      name: dbCard.name,
      imgUrl: dbCard.url,
    });
    await createEntry.save();
    if (createEntry) res.status(200).json({ message: "entry added" });
    else res.status(500).send("some error in updating");
  } catch (error) {
    next(error);
  }
});

router.get("/tinder/cards", async (req, res, next) => {
  try {
    const DB = await service.getTinderData();
    const data = await DB.find();
    if (data) res.status(200).json({ data });
    else res.status(500).send("some error in fetching");
  } catch (error) {
    next(error);
  }
});

module.exports = router;





