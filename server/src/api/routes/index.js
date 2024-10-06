/**
 * @description  This file is called an entry file for routes folder.
 */
const router = require('express').Router();
const authRouter = require('./auth');
const userRouter = require('./users');

router.use('/auth', authRouter);

router.use('/user', userRouter);

module.exports = (app) => app.use(router);
