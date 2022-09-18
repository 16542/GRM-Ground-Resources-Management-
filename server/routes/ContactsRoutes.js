const contacts = require("../../contacts");
const Contacts = require("../models/Contacts");
const User = require("../models/User");

// *  Contact Route ;
const router = require("express").Router();

router.post("/add", async (req, res) => {
  try {
    let SavedContacts = await Contacts.insertMany(contacts);
    res.status(200).json(SavedContacts);
  } catch (error) {
    res.status(500).status(error);
  }
});

//* return a spesific user ;

router.get("/get/:id", async (req, res) => {
  try {
    const user = await Contacts.findById({ _id: req.params.id });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

// return All Contacts ;
router.get("/", async (req, res) => {
  try {
    const contacts = await Contacts.find({});
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
