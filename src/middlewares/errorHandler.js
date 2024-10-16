const logger = require('../utils/logger.js');

const errorHandler = (err, req, res, next) => {
    logger.error(`Erro na rota ${req.url}: ${err.message}`);

    if (err.name === 'ValidationError') {
        return res.status(400).json({message: err.message});
    }

    res.status(500).json({ message: 'Ocorreu um erro no servidor!' });
};

module.exports = errorHandler;