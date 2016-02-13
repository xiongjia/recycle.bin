'use strict';

module.exports = function (grunt) {
  var cfg, optNoCompress;

  /* load grunt plugins */
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  /* load cli-options & configuration */
  optNoCompress = grunt.option('no-compress');
  cfg = grunt.file.readYAML('_config.yml');
  console.log('cfg %j', cfg);

  /* grunt config */
  grunt.initConfig({});
  /* bower config */
  grunt.config('bower', {
    install: { options: { targetDir: './bower_components' } }
  });
  /* JSHint config - only check our code, skip 3rd party JS files */
  grunt.config('jshint', {
    options: { jshintrc: '.jshintrc' },
    reporter: require('jshint-stylish'),
    gruntfile: { src: 'Gruntfile.js' },
    config: { src: ['_config/vimwiki.js'] }
  });
  /* concat config: 
   * 1. Merge all the CSS files and save it to cfg.dest.cssDest
   * 2. Merge all the JS files and save it to cfg.dest.jsDest
   */
  grunt.config('concat', {
    /* merge all css */
    css: {
      src: [
        cfg.mod.cssBootstrap,
        '_config/vimwiki.css',
        cfg.mod.cssSyntax,
        '_config/recycle.bin.css'
      ],
      dest: cfg.dest.cssDest
    },
    /* merge all js */
    js: {
      src: [
        cfg.mod.jsJQuery,
        cfg.mod.jsLodash,
        cfg.mod.jsBootstrap,
        cfg.mod.jsSyntax,
        cfg.mod.jsLazyLoad,
        cfg.mod.jsQRCode,
        '_config/vimwiki.js',
        '_config/ganalytics.js'
      ],
      dest: cfg.dest.jsDest
    }
  });
  /* cssmin - compress css files */
  grunt.config('cssmin', {
    minify: { src: [ cfg.dest.cssDest ], dest: cfg.dest.cssDest }
  });
  /* uglify - compress js files */
  grunt.config('uglify', {
    dist: { src: cfg.dest.jsDest, dest: cfg.dest.jsDest }
  });
  /* html min - compress html files */
  grunt.config('htmlmin', {
    dist: {
      options: { removeComments: true, collapseWhitespace: true },
      files: [{ expand: true, cwd: 'dist', src: '**/*.html', dest: 'dist' }]
    }
  });
  /* copy - copy all the files to dist folder */
  grunt.config('copy', {
    content: {
      expand: true,
      cwd: cfg.dest.output + '/',
      src: [ '**/*.html' ],
      dest: cfg.dest.base + '/'
    },
    data: {
      expand: true,
      cwd: '_content/data',
      src: [ '**/*.*' ],
      dest: cfg.dest.base + '/data/'
    },
    fonts: {
      expand: true,
      cwd: cfg.mod.dirBootstrap,
      src: [ '**/*.{eot,svg,ttf,woff}' ],
      dest: cfg.dest.base + '/assets'
    },
    conf: {
      src: [ '_config/_htaccess' ],
      dest: cfg.dest.base + '/.htaccess'
    },
    icon: {
      src: [ '_config/favicon.ico' ],
      dest: cfg.dest.base + '/favicon.ico'
    }
  });
  /* connect - the local HTTP server for test/dev */
  grunt.config('connect', {
    server: {
      options: {
        port: cfg.util.servPort,
        debug: cfg.util.servDbg,
        base: cfg.dest.base
      }
    }
  });
  /* watch - monitor the content folders and 
   * automatical update changed content to dist folder
   */
  grunt.config('watch', {
    content: {
      files: [cfg.dest.output + '/**/*.html'],
      tasks: [ 'copy:content', 'htmlmin' ],
      options: { spawn: false }
    },
    data: {
      files: [ '_content/data/**/*.*' ],
      tasks: [ 'copy:data' ],
      options: { spawn: false }
    }
  });
  /* sitemap */
  grunt.config('sitemap', {
    dist: {
      pattern: [ cfg.dest.base + '/**/*.html' ],
      siteRoot: cfg.dest.base,
      homepage: cfg.util.siteRoot,
      changefreq: 'weekly'
    }
  });
  /* rsync - update dist folder to remote */
  grunt.config('rsync', { src: cfg.util.rsyncSrc, dest: cfg.util.rsyncDest });
  /* checkSiteLinks - check all the site links are avliable */
  grunt.config('checkSiteLinks', {
    cwd: cfg.dest.base,
    site: cfg.util.siteRoot
  });
  /* clean - remove dest files */
  grunt.config('clean', [ cfg.dest.base ]);

  /* check sitemap */
  grunt.registerTask('checkSiteLinks', 'check siteamp', function () {
    var pages, links, pgCwd, site, done, request;

    request = require('request');
    pgCwd = grunt.config.get('checkSiteLinks.cwd');
    site =  grunt.config.get('checkSiteLinks.site');
    grunt.log.writeln('check site links. { cwd: %s, site: %s }', pgCwd, site);

    /* site links */
    pages = grunt.file.expand({cwd: pgCwd}, '**/*.html');
    links = [];
    grunt.util._.each(pages, function (pg) {
      links.push(function (callback) {
        var req;
        req = {
          url: grunt.util._.str.sprintf('%s/%s', site, pg),
          proxy: process.env.http_proxy
        };
        grunt.log.writeln('Check Site link %j', req);
        request(req, function (err, res) {
          if (err) {
            grunt.log.error('Cannot access %s', req.url);
            grunt.fail.warn(err);
          }
          else {
            if (res.statusCode !== 200) {
              grunt.log.error('Cannot access %s, status [%s]',
                req.url, res.statusCode);
              grunt.fail.warn(new Error('Cannot access site link'));
            }
            else {
              grunt.log.writeln('Site link %s OK, res [%s]',
                req.url, res.statusCode);
            }
          }
          callback(err);
        });
      });
    });

    /* start check links */
    done = this.async();
    require('async').parallel(links, function (err) {
      grunt.log.writeln('All sit links have been checked');
      done(err);
    });
  });

  /* rsync upload task */
  grunt.registerTask('rsync', 'rsync upload task', function () {
    var rsync, rsyncOpt, done;

    /* rsync options */
    grunt.config.requires('rsync', 'rsync.src', 'rsync.dest');
    rsyncOpt = {
      src: grunt.config.get('rsync.src'),
      dest: grunt.config.get('rsync.dest'),
      recursive: true
    };
 
    /* execute rsync upload */
    done = this.async();
    rsync = require("rsyncwrapper").rsync;
    rsync(rsyncOpt, function (err, stdout, stderr, cmd) {
      if (err) {
        grunt.log.writeln('Rsync upload err = %j, opt = %j', err, rsyncOpt);
      }
      else {
        grunt.log.writeln('Rsync upload ok. opt = %j', rsyncOpt);
      }
      grunt.log.writeln('cmd = %s', cmd);
      grunt.log.writeln('stdout: "%s", stderr: "%s"', stdout, stderr);
      done(err);
    });
  });

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

