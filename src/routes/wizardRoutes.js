const express = require("express");
const router = express.Router();
const wizardController = require("../controllers/wizardController");

router.get("/", wizardController.getAllWizards);
router.get("/:id", wizardController.getWizard);
router.post("/", wizardController.createWizard);
router.put("/houses/:id", wizardController.updateWizard);
router.delete("/houses/:id", wizardController.deleteWizard);


module.exports = router;
