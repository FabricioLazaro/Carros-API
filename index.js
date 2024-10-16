const express = require('express');
const setupSwagger = require('./src/swagger.js');

const router = require('./src/routes/carRoutes.js')

const errorHandler = require('./src/middlewares/errorHandler.js')

require('dotenv').config()

const app = express();

//const port = 3000;

app.use(express.json())

app.use('/', router)

setupSwagger(app)

/*app.listen(port, () => {
    console.log(`servidor rodando no endereço http://localhost:${port}`)
})*/

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`servidor rodando no endereço http://localhost:${PORT}`)
})

const logger = require('./src/utils/logger.js');

app.use((req, res, next) => {
    logger.info(`Requisição ${req.method} em ${req.url}`);
    next();
})

app.use(errorHandler);
