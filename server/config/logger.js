const winston = require('winston');
const { format } = require('winston');

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message} `;
})
const logger = winston.createLogger({
    level: 'info',
    format: combine(
        label({ label: 'server' }),
        format.colorize(),
        timestamp('YYYY-MM-DD HH:mm:ss'),
        myFormat
    ),
    transports: [new winston.transports.Console()],
})

module.exports = logger;