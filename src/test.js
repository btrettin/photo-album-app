const expect = require('chai').expect;
const sinon = require('sinon');
const request = require('request');
const app = require('./photo-album.js');
const body = require('./test-body.js');
const errMsg = 'Argument must be an int from 1-100. Ex: node photo-album 43';

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
      sinon.spy(console, 'log');
      sinon.spy(JSON, 'parse');
      sinon.stub(request, 'get').yields(null, null, body);
      app.photoAlbum('4');
    });
    afterEach(() => {
      sinon.restore();
    });
    it('should parse the body of an http request', done => {
      expect(JSON.parse.callCount).to.equal(1);
      done();
    });
    it('should log 50 times', done => {
      expect(console.log.callCount).to.equal(50);
      done();
    });
    it('should provide the correct arguments to the first log', done => {
      expect(
        console.log.firstCall.calledWith(
          '[151] possimus dolor minima provident ipsam'
        )
      ).to.be.true;
      done();
    });
    it('should provide the correct arguments to the last log', done => {
      expect(
        console.log.lastCall.calledWith(
          '[200] perspiciatis est commodi iste nulla et eveniet voluptates eum'
        )
      ).to.be.true;
      done();
    });
  });
});
