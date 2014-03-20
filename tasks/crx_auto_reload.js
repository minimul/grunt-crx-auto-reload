/*
 * grunt-crx-auto-reload
 * https://github.com/minimul/grunt-crx-auto-reload
 *
 * Copyright (c) 2014 Christian Pelczarski
 * Licensed under the MIT license.
 */

'use strict';
var path = require('path');

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('crx_auto_reload', 'Pure Javascript solution for automatically reloading a Chrome extension.', function () {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      extensionDir: ''
    });

    var reloadHTML = path.normalize(options.extensionDir + '/reload.html');
    var reloadJs = path.normalize(options.extensionDir + '/reload.js');
    if (!grunt.file.exists(reloadJs)) {
      var reloadJsSrc = grunt.template.process(grunt.file.read(path.resolve(__dirname, 'reload.js.tpl')), { data: { 'reloadFile': path.basename(reloadHTML) } } );
      grunt.file.write(reloadJs, reloadJsSrc);
    }
    grunt.file.write(reloadHTML, new Date().getTime().toString());
  });

};
