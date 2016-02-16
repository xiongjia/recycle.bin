'use strict';

module.exports = function (grunt) {
  var cfg, optNoCompress;

  /* load grunt plugins */
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  /* load cli-options & configuration */
  optNoCompress = grunt.option('no-compress');
  cfg = grunt.file.readYAML('_config.yml');
  /* update jshint reporter */
  cfg.gruntConfRoot.jshint.reporter = require('jshint-stylish');
  /* grunt config */
  grunt.initConfig(cfg.gruntConfRoot);

  /* alias */
  grunt.registerTask('dist',
    optNoCompress ?
      'Export all files to dist folder (no compress)' :
      'Export all files to dist folder',
    optNoCompress ?
      ['clean', 'bower', 'jshint', 'concat', 'copy', 'sitemap'] :
      ['clean', 'bower', 'jshint', 'concat',
       'cssmin', 'uglify', 'copy', 'htmlmin', 'sitemap']);

  grunt.registerTask('serv', 'Build the dist folder and launch local serv',
    ['dist', 'connect', 'watch']);
  grunt.registerTask('server', ['serv']);

  grunt.registerTask('check', 'Check Site links', ['dist', 'checkSiteLinks']);

  /* default task */
  grunt.registerTask('default', ['dist']);
};

