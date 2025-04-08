const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");

// Rota para gerar o CSV
router.get("/csv", reportController.exportWizardCSV);

// Rota para gerar o PDF
router.get("/pdf", reportController.exportWizardPDF);

module.exports = router;