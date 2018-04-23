import { API_URL } from './config';

import album from './album';
import search from './search';

export default class SpotifyWrapper {
  constructor(options = {}) {
    this.apiUrl = options.apiUrl || API_URL;
    this.token = options.token;

    this.album = album.bind(this)();
    this.search = search.bind(this)();
  }

  request(action) {
    console.log(`${this.apiUrl}${action}`);
    return fetch(`${this.apiUrl}${action}`, {
      headers: {
        'Authorization': `'Bearer ${this.token}'`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(data => data.json());
  }
}
