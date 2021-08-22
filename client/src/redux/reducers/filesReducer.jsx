import { INIT_FILES, UPLOAD_FILE, DELETE_FILE } from '../types/filesTypes';

const filesReducer = (state = [], action) => {
  switch (action.type) {
    case INIT_FILES: {
      const { files } = action.payload;
      return files;
    }
    case UPLOAD_FILE: {
      const { url, fileName, size, _id, public_id } = action.payload;
      return [{ url, fileName, size, _id, public_id }, ...state];
    }
    case DELETE_FILE: {
      const { id } = action.payload;
      const newState = state.filter((item) => item._id !== id);
      return newState;
    }
    default:
      return state;
  }
};

export default filesReducer;
