import { SET_ERROR, DELETE_ERROR } from '../types/errorsTypes';

const errorReducer = (state = null, action) => {
  switch (action.type) {
    case SET_ERROR: {
      return action.payload
    }
    case DELETE_ERROR: {
      return null
    }
    default:
      return state;
  }
}

export default errorReducer;
