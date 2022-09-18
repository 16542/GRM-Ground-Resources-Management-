const Alerts = require("../models/Alerts");
const alerts = require("../../alerts");
const router = require("express").Router();
// * Try to save the json fie into the db
router.post("/add-alert", async (req, res) => {
  try {
    let savedAlerts = await Alerts.insertMany(alerts);
    res.status(200).json(savedAlerts);
  } catch (error) {
    res.status(500).json(error);
  }
});

// * try to get a specific alert ;
router.get("/get/:id", async (req, res) => {
  try {
    const alert = await Alerts.findById(req.params.id);
    res.status(200).json(alert)
  } catch {
    res.status(500).send()


  }
});

//* get all  Alerts ;

router.get("/" , async(req,res)=>{
  try {
      const alerts = await Alerts.find({})
      res.status(200).json(alerts)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router;
