const dateFns = require('date-fns');

const { format } = dateFns;

const dateFormat = (date) => format(date, 'MMMM dd, yyyy');

const now = new Date();

const formatted = dateFormat(now);

module.exports = { dateFormat, formatted };