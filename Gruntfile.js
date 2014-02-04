'use strict';

module.exports = function (grunt) {
  var config, optNoCompress;

  function bowerFile(file) {
    return grunt.util._.str.sprintf('bower_components/%s', file || '');
  }

  /* check cli options */
  optNoCompress = grunt.option('no-compress');

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
      config: { src: ['_config/vimwiki.js'] }
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
    connect: {
      dist: {
        options: { port: 9000, base: 'dist', debug: true }
      }
    },
    sitemap: {
      cwd: 'dist',
      dest: 'dist/sitemap.txt',
      site: 'http://www.xj-labs.net'
    },
    watch: {
      content: {
        files: ['output/**/*.html'],
        tasks: ['copy:content'],
        options: { spawn: false }
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
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  /* sitemap task */
  grunt.registerTask('sitemap', 'create sitemap.txt', function () {
    var pages, pgCwd, dest, site, data;

    /* check options */
    grunt.config.requires('sitemap', 'sitemap.cwd',
      'sitemap.dest', 'sitemap.site');

    pgCwd = grunt.config.get('sitemap.cwd');
    dest = grunt.config.get('sitemap.dest');
    site = grunt.config.get('sitemap.site');
    grunt.log.writeln('creating sitemap. { cwd:%s, dest: %s, site: %s }',
      pgCwd, dest, site);

    /* save the sitemap to 'data' */
    pages = grunt.file.expand({cwd: pgCwd}, '**/*.html');
    data = '';
    grunt.util._.each(pages, function (pg) {
      data = data + grunt.util._.str.sprintf('%s/%s\n', site, pg);
    });
    /* write sitemap to dest file */
    grunt.file.write(dest, data);
  });

  /* alias */
  grunt.registerTask('dist',
    optNoCompress ?
      'Export all files to dist folder (no compress)' :
      'Export all files to dist folder',
    optNoCompress ?
      ['clean', 'jshint', 'concat', 'copy', 'sitemap'] :
      ['clean', 'jshint', 'concat', 'cssmin', 'uglify', 'copy', 'sitemap']);

  grunt.registerTask('serv', 'Build the dist folder and launch local serv',
    ['dist', 'connect', 'watch']);

  /* default task */
  grunt.registerTask('default', ['dist']);
};

