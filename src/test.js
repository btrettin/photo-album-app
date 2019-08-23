const expect = require('chai').expect;
const sinon = require('sinon');
const app = require('./photo-album.js');
const request = require('request');
const body = require('./test-body.js');

describe('photoAlbum', () => {
  beforeEach(() => {
    sinon.stub(request, 'get').yields(null, null, body);
  });
  afterEach(() => {
    sinon.restore();
  });
  it('should parse the body of an http request', done => {
    sinon.spy(JSON, 'parse');
    app('4');
    expect(JSON.parse.callCount).to.equal(1);
    done();
  });
  it('should log 50 times', done => {
    sinon.spy(console, 'log');
    app('4');
    expect(console.log.callCount).to.equal(50);
    done();
  });
  it('should provide the correct arguments to the first log', done => {
    sinon.spy(console, 'log');
    app('4');
    expect(
      console.log.firstCall.calledWith(
        '[151] possimus dolor minima provident ipsam'
      )
    ).to.be.true;
    done();
  });
});
