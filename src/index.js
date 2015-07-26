/**
 * Dependencies
 */
var path     = require('path')
,   pkgcloud = require('pkgcloud');

/**
 * Module body
 */
class AWSProvider {
  constructor (options = {}) {
    this.name      = 'aws';
    this.region    = options.region || 'us-east-1';
    this.root      = options.root || path.join(process.cwd(), 'uploads');
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

  path (input) {
    return path.join(this.root, input);
  }

  get (input) {
    return this.client.download({
      remote: input,
      container: this.container
    });
  }

  put (input) {
    return this.client.upload({
      remote: input,
      container: this.container
    });
  }

  del (input, done) {
    return this.client.removeFile(this.container, input, done);
  }
}

/**
 * Expose
 */
module.exports = AWSProvider;
