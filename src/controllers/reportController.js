const { format } = require("@fast-csv/format");
const PDFDocument = require("pdfkit"); 
const wizardModel = require("../models/wizardModel");

const exportWizardCSV = async (req, res) => {
    try {
        const wizards = await wizardModel.getWizards();

        if (!wizards || wizards.length === 0) {
            return res.status(404).json({ message: "Nenhum bruxo encontrado para exportar." });
        }

        res.setHeader("Content-Disposition", "attachment; filename=wizards.csv");
        res.setHeader("Content-Type", "text/csv"); // Corrigido

        const csvStream = format({ headers: true });
        csvStream.pipe(res);

        wizards.forEach((wizard) => {
            csvStream.write({
                Id: wizard.id,
                Nome: wizard.name,
                Casa: wizard.house_name || "Sem casa",
            });
        });
        csvStream.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao criar o CSV" });
    }
};

const exportWizardPDF = async (req, res) => {
    try {
        const wizards = await wizardModel.getWizards();

        if (!wizards || wizards.length === 0) {
            return res.status(404).json({ message: "Nenhum bruxo encontrado para exportar." });
        }

        res.setHeader("Content-Disposition", "attachment; filename=wizards.pdf");
        res.setHeader("Content-Type", "application/pdf");

        const pdfDoc = new PDFDocument();
        pdfDoc.pipe(res);

        // Título
        pdfDoc.fontSize(20).text("Relatório de Bruxos", { align: "center" });
        pdfDoc.moveDown();

        // Cabeçalho
        pdfDoc.fontSize(12).text("ID | Nome | Casa", { underline: true });
        pdfDoc.moveDown();

        // Dados
        wizards.forEach((wizard) => {
            pdfDoc.text(`${wizard.id} | ${wizard.name} | ${wizard.house_name || "Sem casa"}`);
        });
        pdfDoc.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao gerar o PDF" });
    }
};

module.exports = { exportWizardCSV, exportWizardPDF }; // Corrigido