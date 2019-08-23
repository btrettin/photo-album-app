const expect = require('chai').expect;
const sinon = require('sinon');
const app = require('./photo-album.js');
const request = require('request');
const body = require('./test-body.js');
const errMsg = 'invalid argument';

describe('isInt', () => {
  it('should return true if the string only contains digits', () => {
    expect(app.isInt('35')).to.be.true;
  });
  it('should return false if the string contains characters', () => {
    expect(app.isInt('3a5')).to.be.false;
  });
  it('should return false if the string contains +,-', () => {
    expect(app.isInt('+35')).to.be.false;
  });
  it('should return false if the string contains float numbers', () => {
    expect(app.isInt('3.5')).to.be.false;
  });
});
describe('photoAlbum', () => {
  describe('photoAlbum with invalid parameters', () => {
    beforeEach(() => {
      sinon.spy(console, 'log');
    });
    afterEach(() => {
      sinon.restore();
    });
    it('should log errMsg with no albumId', () => {
      app.photoAlbum();
      expect(console.log.calledOnce).to.be.true;
      expect(console.log.calledWith(errMsg)).to.be.true;
    });
    it('should log errMsg with albumId less than 1', () => {
      app.photoAlbum('0');
      expect(console.log.calledOnce).to.be.true;
      expect(console.log.calledWith(errMsg)).to.be.true;
    });
    it('should log errMsg with albumId greater than 100', () => {
      app.photoAlbum('101');
      expect(console.log.calledOnce).to.be.true;
      expect(console.log.calledWith(errMsg)).to.be.true;
    });
    it('should log errMsg with albumId containing characters', () => {
      app.photoAlbum('1x5');
      expect(console.log.calledOnce).to.be.true;
      expect(console.log.calledWith(errMsg)).to.be.true;
    });
    it('should log errMsg with albumId containing floats', () => {
      app.photoAlbum('1.5');
      expect(console.log.calledOnce).to.be.true;
      expect(console.log.calledWith(errMsg)).to.be.true;
      expect(console.log.callCount).to.equal(1);
    });
  });
  describe('photoAlbum with valid parameters', () => {
    beforeEach(() => {
      sinon.stub(request, 'get').yields(null, null, body);
    });
    afterEach(() => {
      sinon.restore();
    });
    it('should parse the body of an http request', done => {
      sinon.spy(JSON, 'parse');
      app.photoAlbum('4');
      expect(JSON.parse.callCount).to.equal(1);
      done();
    });
    it('should log 50 times', done => {
      sinon.spy(console, 'log');
      app.photoAlbum('4');
      expect(console.log.callCount).to.equal(50);
      done();
    });
    it('should provide the correct arguments to the first log', done => {
      sinon.spy(console, 'log');
      app.photoAlbum('4');
      expect(
        console.log.firstCall.calledWith(
          '[151] possimus dolor minima provident ipsam'
        )
      ).to.be.true;
      done();
    });
  });
});
