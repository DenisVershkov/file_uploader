const express = require('express');
const fileRouter = express.Router();
const FilesController = require('../controllers/filesController');

fileRouter.get('/allFiles', FilesController.getAllFiles);
fileRouter.post('/newFile', FilesController.uploadFile);
fileRouter.delete('/file', FilesController.deleteFile);

module.exports = fileRouter;
