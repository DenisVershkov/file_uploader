import { UPLOAD_FILE, EDIT_FILE, DELETE_FILE, INIT_FILES } from '../types/filesTypes';
import { disableLoader, enableLoader } from './loader.ac';
import * as endPoints from '../../config/endPoints';

export const initFiles= (files) => ({
  type: INIT_FILES,
  payload: files
});

export const uploadFile= (file) => ({
  type: UPLOAD_FILE,
  payload: file
});

export const editeFile = (file) => ({
  type: EDIT_FILE,
  payload: file
})

export const deleteFile = (id) => ({
  type: DELETE_FILE,
  payload: {id}
})

export const setFiles = () => async (dispatch) => {
  dispatch(enableLoader())
      const response = await fetch(endPoints.initiateFiles(), {
        credentials: 'include',
      })
      const files = await response.json();
      if (response.status === 200) {
        dispatch(initFiles(files));
      }
        dispatch(disableLoader());
}
