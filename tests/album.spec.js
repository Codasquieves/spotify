import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

sinonStubPromise(sinon);
chai.use(sinonChai);

global.fetch = require('node-fetch');

import SpotifyWrapper from '../src/index';

describe('Album', () => {
  let spotify;
  let stubedFetch;
  let promise;

  beforeEach(() => {
    spotify = new SpotifyWrapper({
      token: 'foo'
    });
    stubedFetch = sinon.stub(global, 'fetch');
    promise = stubedFetch.returnsPromise();
  });

  afterEach(() => {
    stubedFetch.restore();
  });

  describe('smoke tests', () => {

    it('should have getAlbum method', () => {
      expect(spotify.album.getAlbum).to.exist;
    });

    it('should have getAlbumTracks method', () => {
      expect(spotify.album.getAlbumTracks).to.exist;
    });

  });

  describe('getAlbum', () => {

    it('should call fetch method', () => {
      const album = spotify.album.getAlbum();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const album = spotify.album.getAlbum('0sNOF9WDwhWunNAHPD3Baj');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/0sNOF9WDwhWunNAHPD3Baj');

      const album2 = spotify.album.getAlbum('0sNOF9WDwhWunNAHPD3Bar');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/0sNOF9WDwhWunNAHPD3Bar');
    });

    it('should return the correct data from Promise', () => {
      promise.resolves({ album: 'name' });
      const album = spotify.album.getAlbum('0sNOF9WDwhWunNAHPD3Baj');
      expect(album.resolveValue).to.be.eql({ album: 'name' });
    });
  });

  describe('getAlbums', () => {

    it('should call fetch method', () => {
      const album = spotify.album.getAlbums();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const album = spotify.album.getAlbums(['0sNOF9WDwhWunNAHPD3Baj', '0sNOF9WDwhWunNAHPD3Bar']);
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums?ids=0sNOF9WDwhWunNAHPD3Baj,0sNOF9WDwhWunNAHPD3Bar');

      const album2 = spotify.album.getAlbums(['0sNOF9WDwhWunNAHPD3Bar', '0sNOF9WDwhWunNAHPD3Baj']);
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums?ids=0sNOF9WDwhWunNAHPD3Bar,0sNOF9WDwhWunNAHPD3Baj');
    });

    it('should return the correct data from Promise', () => {
      promise.resolves([{ album: 'name' }, { album: 'name2' }]);
      const album = spotify.album.getAlbums(['0sNOF9WDwhWunNAHPD3Bar', '0sNOF9WDwhWunNAHPD3Baj']);
      expect(album.resolveValue).to.be.eql([{ album: 'name' }, { album: 'name2' }]);
    });
  });

  describe('getAlbumTracks', () => {

    it('should call fetch method', () => {
      const album = spotify.album.getAlbumTracks();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const album = spotify.album.getAlbumTracks('0sNOF9WDwhWunNAHPD3Baj');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/0sNOF9WDwhWunNAHPD3Baj/tracks');

      const album2 = spotify.album.getAlbumTracks('0sNOF9WDwhWunNAHPD3Bar');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/0sNOF9WDwhWunNAHPD3Bar/tracks');
    });

    it('should return the correct data from Promise', () => {
      promise.resolves([{ track: 'name' }, { track: 'name2' }]);
      const album = spotify.album.getAlbumTracks('0sNOF9WDwhWunNAHPD3Baj');
      expect(album.resolveValue).to.be.eql([{ track: 'name' }, { track: 'name2' }]);
    });
  });
});
