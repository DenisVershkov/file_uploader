const File = require('../models/file-model');
const { cloudinary } = require('../../utils/cloudinary');

class FileService {
  async uploadFile({ url, original_filename: fileName, bytes: size, public_id }, author) {
    try {
      const fileInfo = await File.create({
        public_id,
        url,
        size,
        author,
        fileName,
      });
      return fileInfo;
    } catch (err) {
      console.error(err);
      throw new Error('Something went wrong');
    }
  }

  async deleteFile(id) {
    try {
      await File.findByIdAndDelete(id);
      return 200;
    } catch (err) {
      console.log(err);
      throw new Error('Something went wrong');
    }
  }
}

module.exports = new FileService();
