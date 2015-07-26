require('dotenv').load()

var AWSProvider = require('../')
,   fs          = require('fs')
,   path        = require('path')
,   expect      = require('chai').expect
,   Readable    = require('stream').Readable;

describe('AWSProvider: Configuration', function () {
  it('should require container, key, and secret', function () {
    try {
      new AWSProvider();
    } catch (err) {
      expect(err).to.not.equal(null);
    }

    try {
      new AWSProvider({ container: 'telecast-test' });
    } catch (err) {
      expect(err).to.not.equal(null);
    }

    try {
      new AWSProvider({
        container: 'telecast-test',
        key: 'xxx'
      });
    } catch (err) {
      expect(err).to.not.equal(null);
    }

    try {
      new AWSProvider({
        container: 'telecast-test',
        key: 'xxx',
        secret: 'xxx'
      });
    } catch (err) {
      expect(err).to.equal(null);
    }
  });

  it('should default to US East 1', function () {
    expect(new AWSProvider({
      container: 'telecast-test',
      key: 'xxx',
      secret: 'xxx'
    }).region).to.equal('us-east-1');
  });
});

describe('AWSProvider: File Upload', function () {
  before(function () {
    this.provider = new AWSProvider({
      container: 'telecast-test',
      key: process.env.AWS_KEY,
      secret: process.env.AWS_SECRET
    });
  });

  describe('#put', function () {
    it('should return a writable stream', function (done) {
      var input  = path.join(__dirname, 'support/data.txt')
      ,   output = path.join(__dirname, 'tmp/hello.txt')
      ,   upload;

      upload = this.provider.put('hello.txt');

      upload.on('error', function (err) {
        if (err) return done(err);
      });

      upload.on('success', function (stored) {
        expect(stored).to.not.equal(null);
        done();
      });

      fs.createReadStream(input).pipe(upload);
    });
  });

  describe('#get', function () {
    it('should return a readable stream', function () {
      expect(this.provider.get('hello.txt') instanceof Readable).to.equal(true);
    });

    it('should be pipable', function (done) {
      var output   = path.join(__dirname, 'support/test.txt')
      ,   download = fs.createWriteStream(output)
      ,   transfer = this.provider.get('hello.txt');

      download.on('error', function (err) {
        return done(err);
      });

      download.on('finish', function () {
        done();
      });

      transfer.on('error', function (err) {
        return done(err);
      });

      transfer.pipe(download);
    });
  });

  describe('#del', function () {
    it('should not return an error when a file is deleted', function (done) {
      this.provider.del('hello.txt', function (err) {
        expect(err).to.equal(null);
        done();
      });
    });

    it('should not return an error period', function (done) {
      this.provider.del('howdy.txt', function (err) {
        expect(err).to.equal(null);
        done();
      });
    });
  });
});
