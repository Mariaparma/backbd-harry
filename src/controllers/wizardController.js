const wizardModel = require("../models/wizardModel");

const getAllWizards = async (req, res) => {
    try {
        const wizards = await wizardModel.getWizards();
        res.json(wizards);
    } catch (error) {
        console.error("Erro ao buscar bruxos:", error);
        res.status(500).json({ message: "Erro ao buscar bruxos." });
    }
};

const getWizard = async (req, res) => {
    try {
        const wizard = await wizardModel.getWizardById(req.params.id);
        if (!wizard) {
            return res.status(404).json({ message: "Bruxo não encontrado." });
        }
        res.json(wizard);
    } catch (error) {
        console.error("Erro ao buscar bruxo:", error);
        res.status(500).json({ message: "Erro ao buscar bruxo." });
    }
};

const createWizard = async (req, res) => {
    try {
        const { name, house_id } = req.body;

        // Validação de entrada
        if (!name || !house_id) {
            return res.status(400).json({ message: "Os campos 'name' e 'house_id' são obrigatórios." });
        }

        const newWizard = await wizardModel.createWizard(name, house_id);
        res.status(201).json(newWizard);
    } catch (error) {
        console.error("Erro ao criar bruxo:", error);
        res.status(500).json({ message: "Erro ao criar bruxo." });
    }
};

const updateWizard = async (req, res) => {
    try {
        const { name, house_id } = req.body;

        // Validação de entrada
        if (!name || !house_id) {
            return res.status(400).json({ message: "Os campos 'name' e 'house_id' são obrigatórios." });
        }

        const updatedWizard = await wizardModel.updateWizard(req.params.id, name, house_id); // Corrigido
        if (!updatedWizard) {
            return res.status(404).json({ message: "Bruxo não encontrado." });
        }
        res.json(updatedWizard);
    } catch (error) {
        console.error("Erro ao atualizar bruxo:", error);
        res.status(500).json({ message: "Erro ao atualizar bruxo." });
    }
};

const deleteWizard = async (req, res) => {
    try {
        const message = await wizardModel.deleteWizard(req.params.id);
        res.json(message);
    } catch (error) {
        console.error("Erro ao deletar bruxo:", error);
        res.status(500).json({ message: "Erro ao deletar bruxo." });
    }
};

module.exports = { getAllWizards, getWizard, createWizard, updateWizard, deleteWizard };