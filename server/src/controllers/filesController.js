const fileService = require('../service/file-service');
const path = require('path');
const File = require('../models/file-model');

class FilesController {
  async uploadFile(req, res) {
    try {
      const { fileInfo } = req.body;
      const { id } = req.session.user;
      const fileData = await fileService.uploadFile(fileInfo, id);
      return res.status(200).json(fileData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }

  async getAllFiles(req, res) {
    try {
      const { id } = req.session.user;
      const files = await File.find({ author: id });
      return res.status(200).json({ files });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async deleteFile(req, res) {
    const { id } = req.body;
    const status = await fileService.deleteFile(id);
    if (status === 200) {
      return res.sendStatus(200);
    }
    res.status(500).json(err);
  }
}

module.exports = new FilesController();
