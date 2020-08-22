export default class BaseApi {
  REACT_APP_SERVER_URL = 'https://api.dev.pastorsline.com/api/contacts.json';
  getToken() {
      return `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNzEiLCJleHAiOjE2MDM3ODM0Mzd9.3ievseHtX0t3roGh7nBuNsiaQeSjfiHWyyx_5GlOLXk`;
  }
}