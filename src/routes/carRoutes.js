const express = require('express');
const { Marcas, Cars } = require('../models/carModel');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Carros
 *   description: Operações relacionadas a Carros
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Carro:
 *       type: object
 *       required:
 *         - Marca
 *         - Modelo
 *         - Ano
 *       properties:
 *         Id:
 *           type: integer
 *           description: Identificador único do carro
 *           example: 1
 *         Marca:
 *           type: string
 *           description: Marca do carro
 *           example: "Toyota"
 *         Modelo:
 *           type: string
 *           description: Modelo do carro
 *           example: "Corolla"
 *         Ano:
 *           type: integer
 *           description: Ano de fabricação do carro
 *           example: 2020
 *   responses:
 *     NotFound:
 *       description: Carro não encontrado
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: "Carro não encontrado"
 *     BadRequest:
 *       description: Requisição inválida
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: "Dados inválidos fornecidos"
 */

/**
 * @swagger
 * /Carros:
 *   get:
 *     summary: Retorna uma lista de carros
 *     tags: [Carros]
 *     responses:
 *       200:
 *         description: Lista de carros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Carro'
 */
router.get('/Carros', (req, res) => {
    res.status(200).send(Cars);
});

/**
 * @swagger
 * /Carros/{id}:
 *   get:
 *     summary: Retorna um carro pelo ID
 *     tags: [Carros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do carro a ser retornado
 *         example: 1
 *     responses:
 *       200:
 *         description: Carro encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Carro'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.get('/Carros/:id', (req, res) => {
    const carro = CarrosId(parseInt(req.params.id));
    if (carro.length === 0) {
        return res.status(404).json({ error: "Carro não encontrado" });
    }
    res.json(carro);
});

/**
 * @swagger
 * /:
 *   get:
 *     summary: Rota raiz que retorna uma saudação
 *     tags: [Carros]
 *     responses:
 *       200:
 *         description: Saudação de boas-vindas
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Olá, mundo!"
 */
router.get('/', (req, res) => {
    res.send('Olá, mundo!');
});

/**
 * @swagger
 * /Carros:
 *   post:
 *     summary: Adiciona um novo carro à lista
 *     tags: [Carros]
 *     requestBody:
 *       description: Dados do carro a ser adicionado
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Carro'
 *     responses:
 *       201:
 *         description: Carro cadastrado com sucesso
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Carro cadastrado com sucesso!"
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */
router.post('/Carros', (req, res) => {
    const { Marca, Modelo, Ano } = req.body;

    if (!Marca || !Modelo || !Ano || !parseInt(Ano)) {
        return res.status(400).send("Preencha o campo corretamente!49");
    }

    if (typeof Marca === "string" && !Marcas.includes(Marca)) {
        return res.status(400).send("Preencha o campo corretamente!50");
    }

    // Gerar um ID único (simulação)
    const novoId = Cars.length > 0 ? Cars[Cars.length - 1].Id + 1 : 1;
    const novoCarro = { Id: novoId, Marca, Modelo, Ano };
    Cars.push(novoCarro);
    res.status(201).send('Carro cadastrado com sucesso!');
});

/**
 * @swagger
 * /Carros/{id}:
 *   put:
 *     summary: Atualiza um carro existente na lista
 *     tags: [Carros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do carro a ser atualizado
 *         example: 1
 *     requestBody:
 *       description: Dados atualizados do carro
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Carro'
 *     responses:
 *       200:
 *         description: Carro atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Carro'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.put('/Carros/:id', (req, res) => {

    const { Marca, Modelo, Ano } = req.body;

    if (!Marca || !Modelo || !Ano || !parseInt(Ano)) {
        return res.status(400).send("Preencha o campo corretamente!");
    }

    if (typeof Marca !== "string" || !Marcas.includes(Marca)) {
        return res.status(400).send("Preencha o campo corretamente!");
    }

    let index = CarrosIndex(parseInt(req.params.id));

    if (index === -1) { 
        return res.status(404).send("Id não encontrado!");
    } else { 
        Cars[index].Marca = Marca;
        Cars[index].Modelo = Modelo;
        Cars[index].Ano = Ano;
    }
    res.status(200).json(Cars);
});

/**
 * @swagger
 * /Carros/{id}:
 *   delete:
 *     summary: Deleta um carro da lista pelo ID
 *     tags: [Carros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do carro a ser deletado
 *         example: 1
 *     responses:
 *       200:
 *         description: Carro deletado com sucesso
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Carro com o id: 1 excluído com sucesso!"
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.delete('/Carros/:id', (req, res) => {
    let index = CarrosIndex(parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).send("Id não encontrado!");
    }
    Cars.splice(index, 1);
    res.send(`Carro com o id: ${req.params.id} excluído com sucesso!`);
});

module.exports = router;
