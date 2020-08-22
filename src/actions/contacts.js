import ContactsApi from '../api/ContactsApi';
import ActionTypes from '../constants/actionTypes';

export function getContacts(params) {
    
  return dispatch => {
      dispatch(request());
      return ContactsApi
        .getContacts(params)
        .then(resp => dispatch(success(resp.data)))
        .catch(error => dispatch(failure(error)));
  };

  function request() { return { type: ActionTypes.GET_CONTACTS.REQUEST } }
  function success(data) { return { type: ActionTypes.GET_CONTACTS.SUCCESS, payload: data } }
  function failure(error) { return { type: ActionTypes.GET_CONTACTS.FAILURE, payload: error } }
}