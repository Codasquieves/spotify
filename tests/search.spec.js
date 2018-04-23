import chai, { expect } from 'chai';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

import SpotifyWrapper from '../src/index';

describe('Search', () => {
  let spotify;
  let fetchedStub;
  let promise;

  beforeEach(() => {
    spotify = new SpotifyWrapper({
      token: 'foo'
    });
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('smoke tests', () => {

    it('shoul exist the spotify.search.artists method', () => {
      expect(spotify.search.artists).to.exist;
    });

    it('shoul exist the spotify.search.albums method', () => {
      expect(spotify.search.albums).to.exist;
    });

    it('shoul exist the spotify.search.tracks method', () => {
      expect(spotify.search.tracks).to.exist;
    });

    it('shoul exist the spotify.search.playlists method', () => {
      expect(spotify.search.playlists).to.exist;
    });
  });


  describe('search.artists', () => {

    it('should call fetch function', () => {
      const artists = spotify.search.artists('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const artist = spotify.search.artists('Incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');

      const artist2 = spotify.search.artists('Muse');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist');
    });

    it('should return the correct data from Promise', () => {
      promise.resolves([{ track: 'name' }, { track: 'name2' }]);
      const artists = spotify.search.artists('0sNOF9WDwhWunNAHPD3Baj');
      expect(artists.resolveValue).to.be.eql([{ track: 'name' }, { track: 'name2' }]);
    });

  });

  describe('search.albums', () => {

    it('should call fetch function', () => {
      const albums = spotify.search.albums('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const albums = spotify.search.albums('Incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');

      const albums2 = spotify.search.albums('Muse');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=album');
    });

    it('should return the correct data from Promise', () => {
      promise.resolves([{ track: 'name' }, { track: 'name2' }]);
      const albums = spotify.search.albums('0sNOF9WDwhWunNAHPD3Baj');
      expect(albums.resolveValue).to.be.eql([{ track: 'name' }, { track: 'name2' }]);
    });
  });

  describe('search.artists', () => {

    it('should call fetch function', () => {
      const artists = spotify.search.artists('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const artists = spotify.search.artists('Incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');

      const artists2 = spotify.search.artists('Muse');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist');
    });

    it('should return the correct data from Promise', () => {
      promise.resolves([{ track: 'name' }, { track: 'name2' }]);
      const artists = spotify.search.artists('0sNOF9WDwhWunNAHPD3Baj');
      expect(artists.resolveValue).to.be.eql([{ track: 'name' }, { track: 'name2' }]);
    });

  });

  describe('search.tracks', () => {

    it('should call fetch function', () => {
      const tracks = spotify.search.tracks('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const tracks = spotify.search.tracks('Incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=track');

      const tracks2 = spotify.search.tracks('Muse');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=track');
    });

    it('should return the correct data from Promise', () => {
      promise.resolves([{ track: 'name' }, { track: 'name2' }]);
      const tracks = spotify.search.tracks('0sNOF9WDwhWunNAHPD3Baj');
      expect(tracks.resolveValue).to.be.eql([{ track: 'name' }, { track: 'name2' }]);
    });

  });

  describe('searchPlaylists', () => {

    it('should call fetch function', () => {
      const tracks = spotify.search.playlists('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const playlists = spotify.search.playlists('Incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=playlist');

      const playlists2 = spotify.search.playlists('Muse');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=playlist');
    });

    it('should return the correct data from Promise', () => {
      promise.resolves([{ track: 'name' }, { track: 'name2' }]);
      const playlists = spotify.search.playlists('0sNOF9WDwhWunNAHPD3Baj');
      expect(playlists.resolveValue).to.be.eql([{ track: 'name' }, { track: 'name2' }]);
    });

  });

});
