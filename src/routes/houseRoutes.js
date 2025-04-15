const express = require("express");
const router = express.Router();
const houseController = require("../controllers/houseController");

/**
 * @swagger
 * /api/houses:
 *   get:
 *     summary: Lista todas as casas
 *     tags: [Houses]
 *     responses:
 *       200:
 *         description: Lista de casas
 */
router.get("/houses", houseController.getAllHouses);

/**
 * @swagger
 * /api/houses:
 *   post:
 *     summary: Cria uma nova casa
 *     tags: [Houses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               founder:
 *                 type: string
 *     responses:
 *       201:
 *         description: Casa criada
 */
router.post("/houses", houseController.createHouse);

/**
 * @swagger
 * /api/houses/{id}:
 *   delete:
 *     summary: Deleta uma casa
 *     tags: [Houses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Casa deletada
 */
router.delete("/houses/:id", houseController.deleteHouse);

/**
 * @swagger
 * /api/houses/{id}:
 *   put:
 *     summary: Atualiza uma casa
 *     tags: [Houses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               founder:
 *                 type: string
 *     responses:
 *       200:
 *         description: Casa atualizada
 */
router.put("/houses/:id", houseController.updateHouse);


// Rotas para casas
router.get("/", houseController.getAllHouses);
router.get("/:id", houseController.getHouse);
router.post("/", houseController.createHouse); 
router.put("/:id", houseController.updateHouse); 
router.delete("/:id", houseController.deleteHouse); 

module.exports = router;