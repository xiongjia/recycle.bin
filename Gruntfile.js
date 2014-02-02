'use strict';

var util = require('util'),
  _ = require('underscore');

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
    jsBootstrap: bowerFile('bootstrap/dist/js/bootstrap.js'),
    jsSyntax: '_config/syntaxhighlighter.js',
    cssSyntax: '_config/syntaxhighlighter.css'
  };

  grunt.initConfig({
    jshint: {
      options: { jshintrc: '.jshintrc' },
      gruntfile: { src: 'Gruntfile.js' },
      config: { src: ['Gruntfile.js', '_config/vimwiki.js'] }
    },
    concat: {
      css: {
        src: [
          config.cssBootstrap,
          '_config/vimwiki.css',
          config.cssSyntax,
          '_config/recycle.bin.css'
        ],
        dest: config.cssDest
      },
      js: {
        src: [
          config.jsJQuery,
          config.jsBootstrap,
          config.jsSyntax,
          '_config/vimwiki.js'
        ],
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
    sitemap: {
      cwd: 'dist',
      dest: 'dist/sitemap.txt',
      site: 'http://test.com',
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

  /* sitemap task */
  grunt.registerTask('sitemap', 'create sitemap.txt', function () {
    var pages, pgCwd, dest, site, data;
    grunt.config.requires('sitemap', 'sitemap.cwd',
      'sitemap.dest', 'sitemap.site');

    pgCwd = grunt.config.get('sitemap.cwd');
    dest = grunt.config.get('sitemap.dest');
    site = grunt.config.get('sitemap.site');
    grunt.log.writeln('creating sitemap. { cwd:%s, dest: %s, site: %s }',
      pgCwd, dest, site);

    pages = grunt.file.expand({cwd: pgCwd}, '**/*.html');
    data = '';
    _.each(pages, function (pg) {
      data = data + util.format('%s/%s\n', site, pg);
    });
    grunt.file.write(dest, data);
  });

  /* alias */
  grunt.registerTask('dist',
    'Export all files to dist folder',
    ['clean', 'jshint', 'concat', 'cssmin', 'uglify', 'copy', 'sitemap']);
  grunt.registerTask('dist-debug',
    'Export all files to dist folder (disable uglify)',
    ['clean', 'jshint', 'concat', 'copy', 'sitemap']);

  /* default task */
  grunt.registerTask('default', ['dist']);
};

