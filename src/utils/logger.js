const { format, transports, createLogger } = require('winston');

const { combine, timestamp, printf, errors } = format;

const DailyRotateFile = require( 'winston-daily-rotate-file' );


const logFormat = printf(({level, message, timestamp, stack }) => {
    return `${timestamp} [${level}] : ${ stack || message}`;
});

const logger = createLogger({
    level: 'info', // Nivel minimo de log (info, error, warn)
    format: combine(
        timestamp(),
        errors({ stack: true }), // exibe o stack trace em caso de erro
        logFormat
    ),
    transports: [
        new transports.Console(), // log no console
        new DailyRotateFile({// log em arquivo rotacionado diariamente
            filename: 'logs/%DATE%-combined.log',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '14d' // mantem os logs por 14 dias
        })
    ],
    exceptionHandlers: [
        new transports.File({ filename: 'logs/exceptions.log'})
    ]
});



module.exports = logger;