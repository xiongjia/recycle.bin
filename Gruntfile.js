'use strict';

var util = require('util');

module.exports = function (grunt) {
  var config;

  function bowerFile(file) {
    return util.format('bower_components/%s', file || '');
  }

  config = {
    cssDest: 'dist/assets/css/main-v0.1.css',
    jsDest: 'dist/assets/js/main-v0.1.js',

    cssBootstrap: bowerFile('bootstrap/dist/css/bootstrap.css'),
    jsJQuery: bowerFile('jquery/jquery.js'),
    jsBootstrap: bowerFile('bootstrap/dist/js/bootstrap.js')
  };

  grunt.initConfig({
    jshint: {
      options: { jshintrc: '.jshintrc' },
      gruntfile: { src: 'Gruntfile.js' },
      config: { src: ['_config/**/*.js'] }
    },
    concat: {
      css: {
        src: [ config.cssBootstrap, '_config/vimwiki.css' ],
        dest: config.cssDest
      },
      js: {
        src: [ config.jsJQuery, config.jsBootstrap, '_config/vimwiki.js' ],
        dest: config.jsDest
      }
    },
    cssmin: {
      minify: {
        src: [ config.cssDest ],
        dest: config.cssDest
      }
    },
    uglify: {
      dist: {
        src: config.jsDest,
        dest: config.jsDest
      }
    },
    copy: {
      content: {
        expand: true,
        cwd: 'output/',
        src: [ '**/*.html' ],
        dest: 'dist/'
      }
    },
    clean: ['dist']
  });

  /* load plugins */
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');

  /* register tasks */
  grunt.registerTask('dist',
    ['clean', 'jshint', 'concat', 'cssmin', 'uglify', 'copy' ]);
  grunt.registerTask('dist-debug',
    ['clean', 'jshint', 'concat', 'copy' ]);

  /* default task */
  grunt.registerTask('default', ['dist']);
};

