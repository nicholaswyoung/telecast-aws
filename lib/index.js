/**
 * Dependencies
 */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _path = require('path'),
    pkgcloud = require('pkgcloud');

/**
 * Module body
 */

var AWSProvider = (function () {
  function AWSProvider() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, AWSProvider);

    this.name = 'aws';
    this.region = options.region || 'us-east-1';
    this.root = options.root || _path.join(process.cwd(), 'uploads');
    this.container = options.container;

    if (!options.container || !options.key || !options.secret) {
      throw new Error('Container, key, and options are all required.');
    }

    this.options = {
      provider: 'amazon',
      region: this.region,
      keyId: options.key,
      key: options.secret
    };

    this.client = pkgcloud.storage.createClient(this.options);
  }

  _createClass(AWSProvider, [{
    key: 'path',
    value: function path(input) {
      return _path.join(this.root, input);
    }
  }, {
    key: 'get',
    value: function get(input) {
      return this.client.download({
        remote: input,
        container: this.container
      });
    }
  }, {
    key: 'put',
    value: function put(input) {
      return this.client.upload({
        remote: input,
        container: this.container
      });
    }
  }, {
    key: 'del',
    value: function del(input, done) {
      return this.client.removeFile(this.container, input, done);
    }
  }]);

  return AWSProvider;
})()

/**
 * Expose
 */
;

module.exports = AWSProvider;