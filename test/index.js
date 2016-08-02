'use strict';

const chai = require('chai');
const expect = chai.expect;
const should = chai.should();

const array = require('array-stream');
const map = require('map-stream');
const path = require('path');

const file = require('../');

describe('gulp-file', function(){
  it('should transform data to vinyl file object.', function(done){
    const users = [
      {username: 'taro'},
      {username: 'jiro'},
      {username: 'saburo'}
    ];
    var counter = 0;
    array(users)
    .pipe(file('{{username}}.json'))
    .pipe(map(function(file, next){
      const user = users[counter];
      file.data.should.deep.equal(user);
      should.equal(file.contents, null);
      path.basename(file.path).should.equal(user.username + '.json');

      counter++;
      if (counter === users.length) done();
    }))
  })
})