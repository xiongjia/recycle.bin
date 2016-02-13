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
  /* checkSiteLinks - check all the site links are avliable */
  grunt.config('checkSiteLinks', {
    cwd: cfg.dest.base,
    site: cfg.util.siteRoot
  });
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

