'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.crx_auto_reload = {
  setUp: function (done) {
    // setup here if necessary
    done();
  },
  default_options: function (test) {
    test.expect(2);

    test.ok(grunt.file.exists('tmp/reload.html'));
    test.ok(grunt.file.exists('tmp/reload.js'));

    test.done();
  },
  custom_options: function (test) {
    test.expect(2);

    test.ok(grunt.file.exists('tmp/templates/reload.html'));
    test.ok(grunt.file.exists('tmp/templates/reload.js'));

    test.done();
  },
  process_js_template: function (test) {
   test.expect(1); 
   var str = grunt.file.read('tmp/reload.js');
   test.ok(str.match(/reload\.html/), 'Reload.js was processed correctly because it contains "reload.html".');
   test.done();
  },
  create_reload_html: function (test) {
    test.expect(1); 
    var str = grunt.file.read('tmp/reload.html');
    test.ok(str.length > 8, 'Reload.html was timestamped correctly');
    test.done();
  }
};
