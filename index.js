const express = require('express');
const setupSwagger = require('./src/swagger.js');

const router = require('./src/routes/carRoutes.js')

const app = express();

const port = 3000;

app.use(express.json())

app.use('/', router)

setupSwagger(app)

app.listen(port, () => {
    console.log(`servidor rodando no endereço http://localhost:${port}`)
})
