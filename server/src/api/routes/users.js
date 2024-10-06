const router = require('express').Router();

const { successResponseGenerator } = require('../../utils');
const { userController } = require('../controllers');

router.get('/list',
    async(req, res) => {
        try{
            const users = await userController.getUsers();

            return res.status(200).json(successResponseGenerator({users}));
        } catch(error) {
            return res.status(500).json(createResponse({
                returnCode: 1,
                errorCode: 'SYSTEM_ERROR',
                errorMessage: error.sqlMessage || error.message,
                errorMeta: error.stack
            }));
        }
    }
)

function createResponse(info) {
    return appResponse.createResponse({
        data: info.data,
        returnCode: info.returnCode || 0,
        error: {
            message: info.errorMessage,
            code: info.errorCode,
            meta: info.errorMeta
        }
    });
  }

module.exports = router