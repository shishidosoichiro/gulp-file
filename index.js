'use strict';

const util = require('util');
const stream = require('stream');
const Transform = stream.Transform;
const path = require('path');
const assign = Object.assign;

const handlebars = require('handlebars');
const File = require('vinyl');

module.exports = Convert;

const defaults = {
  objectMode: true,
  engine: function(template){
    return handlebars.compile(template);
  },
  base: ''
}

function Convert(options){
  if (!(this instanceof Convert)) return new Convert(options);

  if (typeof options === 'string') options = {template: options};
  options = assign(options || {}, defaults);
  if (typeof options.template === 'string') {
    options.template = options.engine(options.template);
  }

  Transform.call(this, options);

  this.options = options;
}
util.inherits(Convert, Transform);

Convert.prototype._transform = function(chunk, encoding, callback){
  const options = {};
  if (typeof chunk === 'string') options.contents = new Buffer(chunk, encoding);
  else if (chunk instanceof Buffer) options.contents = chunk;
  else options.data = chunk;

  options.cwd = this.options.cwd;
  options.base = this.options.base;
  options.path = path.resolve(options.base, this.options.template(chunk));

  callback(null, new File(options));
};
