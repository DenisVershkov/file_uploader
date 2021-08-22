import { SET_USER, DELETE_USER } from '../types/userTypes';
import { disableLoader, enableLoader } from './loader.ac';
import * as endPoints from '../../config/endPoints';
import {setError} from './errors.ac';

export const setUser = (user) => ({
  type: SET_USER,
  payload: user
})

export const deleteUser = () => ({
  type: DELETE_USER,
})

export const signIn = (payload, history) => async (dispatch) => {
  dispatch(enableLoader());
  const response = await fetch(endPoints.signIn(), {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(payload)
  });
    const user = await response.json();
    if (response.status === 200) {
    dispatch(setUser(user));
    history.replace('/main');
  } else {
    const error = user.message;
    dispatch(setError(error))
    dispatch(disableLoader());
  }
};

export const signUp = (payload, history) => async (dispatch) => {
  dispatch(enableLoader());
  const response = await fetch(endPoints.signUp(), {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(payload)
  })
  const user = await response.json();
  if (response.status === 200) {
    dispatch(setUser(user));
    history.replace('/main');
  } else {
    const error = user.message;
    dispatch(setError(error))
    dispatch(disableLoader());
  }
};

export const signOut = (history) => async (dispatch) => {
  dispatch(enableLoader());
  const response = await fetch(endPoints.signOut(), {
    credentials: 'include'
  })
  if (response.status === 200) {
    dispatch(deleteUser());
    history.replace('/auth');
  }
    dispatch(disableLoader());
};

export const checkAuth = () => async (dispatch) => {
  dispatch(enableLoader());
  const response = await fetch(endPoints.checkAuth(), {
    credentials: 'include'
  })
  if (response.status === 200) {
    const user = await response.json()
    dispatch(setUser(user))
  }
  dispatch(disableLoader());
};
