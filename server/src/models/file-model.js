const mongoose = require('mongoose');

const FileSchema = mongoose.Schema({
  url: {
    type: String,
  },
  fileName: {
    type: String,
  },
  size: {
    type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  public_id: {
    type: String,
  },
});

module.exports = mongoose.model('File', FileSchema);
