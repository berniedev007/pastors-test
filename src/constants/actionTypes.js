import { defineAction } from 'redux-define';

export default {
  GET_CONTACTS : defineAction('GET_CONTACTS', ['REQUEST', 'SUCCESS', 'FAILURE']),
}