const expect = require('chai').expect;
const sinon = require('sinon');
const app = require('./photo-album.js');
const request = require('request');
const body = require('./test-body.js');

describe('photoAlbum', () => {
  it('should log 50 times', done => {
    sinon.spy(console, 'log');
    sinon.stub(request, 'get').yields(null, null, body);
    app('4');
    expect(console.log.callCount).to.equal(50);
    done();
  });
});
