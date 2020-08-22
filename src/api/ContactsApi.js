import axios from 'axios';
import BaseApi from './BaseApi';

class ContactsApi extends BaseApi {
  getContacts(params) {
    return axios.get(
      this.REACT_APP_SERVER_URL, 
      { 
        headers: { 
          'Authorization': this.getToken() 
        },
        params
      },
    );
  }
}

export default new ContactsApi();