/**
 * @description  This file is called an entry file for routes folder.
 */
const router = require('express').Router();
const authRouter = require('./auth');

router.use('/auth', authRouter);

module.exports = (app) => app.use(router);
