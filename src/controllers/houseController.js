const houseModel = require("../models/houseModel");

const getAllHouses = async (req, res) => {
    try {
        const houses = await houseModel.getHouses();
        res.json(houses);
    } catch (error) {
        console.error("Erro ao buscar casas:", error);
        res.status(500).json({ message: "Erro ao buscar casas." });
    }
};

const getHouse = async (req, res) => {
    try {
        const house = await houseModel.getHouseById(req.params.id);
        if (!house) {
            return res.status(404).json({ message: "Casa não encontrada." });
        }
        res.json(house);
    } catch (error) {
        console.error("Erro ao buscar casa:", error);
        res.status(500).json({ message: "Erro ao buscar casa." });
    }
};

const createHouse = async (req, res) => {
    try {
        const { name, founder } = req.body;

        // Validação de entrada
        if (!name || !founder) {
            return res.status(400).json({ message: "Os campos 'name' e 'founder' são obrigatórios." });
        }

        const newHouse = await houseModel.createHouse(name, founder); // Corrigido
        res.status(201).json(newHouse);
    } catch (error) {
        console.error("Erro ao criar casa:", error);
        if (error.code === "23505") { // Código de erro para duplicidade (PostgreSQL)
            return res.status(400).json({ message: "Casa já cadastrada." });
        }
        res.status(500).json({ message: "Erro ao criar Casa." });
    }
};

const updateHouse = async (req, res) => {
    try {
        const { name, founder } = req.body;

        // Validação de entrada
        if (!name || !founder) {
            return res.status(400).json({ message: "Os campos 'name' e 'founder' são obrigatórios." });
        }

        const updatedHouse = await houseModel.updateHouse(req.params.id, name, founder);
        if (!updatedHouse) {
            return res.status(404).json({ message: "Casa não encontrada." });
        }
        res.json(updatedHouse);
    } catch (error) {
        console.error("Erro ao atualizar casa:", error);
        res.status(500).json({ message: "Erro ao atualizar Casa." });
    }
};

const deleteHouse = async (req, res) => {
    try {
        const message = await houseModel.deleteHouse(req.params.id);
        res.json(message);
    } catch (error) {
        console.error("Erro ao deletar casa:", error);
        res.status(500).json({ message: "Erro ao deletar Casa." });
    }
};

module.exports = { getAllHouses, getHouse, createHouse, updateHouse, deleteHouse };