global.fetch = require('node-fetch');

import SpotifyWrapper from '../src/index';

const spotify = new SpotifyWrapper({
  token: 'BQCB-Nf4plJxWn-JkF1s1EydYzQLq4xno5R_Ty_E3dYAU_-K_7dbcUsb4dNKHDtxOGrwwTQfZQB_5WYfLx4ESJx9d6v14ZYKXAW8OXq0uaDbbkSW7-WoEkxCewqqGFJy2Uyfciit6aP_nlxzHr5LCJgxlgWqEVUCyaqvDSbEJglcbB4KZc8B9lygE7LMPg6ogg6ObQ6Wa9-CrwLj1tYPGjVy2wrS_P5Wk5jVDC2LyTST95K6lIz9EaPFSktNgMqNbhvqJSb91w'
});

const albuns = spotify.search.albums('Elvis');
albuns.then(data => console.log(data));
