const validator = require('./validator');
const passport = require('./passport');
const httpErrorHandler = require('./httpErrorHandler');

module.exports = {
    validator,
    httpErrorHandler,
    ...passport,
}
