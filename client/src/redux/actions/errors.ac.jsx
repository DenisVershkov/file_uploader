import { SET_ERROR, DELETE_ERROR } from '../types/errorsTypes';

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error
})

export const deleteError = () => ({
  type: DELETE_ERROR
})
