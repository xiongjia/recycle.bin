'use strict';

module.exports = function (grunt) {
  var cfg, optNoCompress;

  /* check cli options */
  optNoCompress = grunt.option('no-compress');
  /* load grunt config */
  cfg = grunt.file.readYAML('_config.yml');
 
  grunt.initConfig({
    jshint: {
      options: { jshintrc: '.jshintrc' },
      gruntfile: { src: 'Gruntfile.js' },
      config: { src: ['_config/vimwiki.js'] }
    },
    concat: {
      css: {
        src: [
          cfg.mod.cssBootstrap,
          '_config/vimwiki.css',
          cfg.mod.cssSyntax,
          '_config/recycle.bin.css'
        ],
        dest: cfg.dest.cssDest
      },
      js: {
        src: [
          cfg.mod.jsJQuery,
          cfg.mod.jsBootstrap,
          cfg.mod.jsSyntax,
          '_config/vimwiki.js',
          '_config/ganalytics.js'
        ],
        dest: cfg.dest.jsDest
      }
    },
    cssmin: {
      minify: { src: [ cfg.dest.cssDest ], dest: cfg.dest.cssDest }
    },
    uglify: {
      dist: { src: cfg.dest.jsDest, dest: cfg.dest.jsDest }
    },
    copy: {
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
        src: [ '**/*' ],
        dest: cfg.dest.base + '/assets'
      },
      conf: {
        src: [ '_config/_htaccess' ],
        dest: cfg.dest.base + '/.htaccess'
      }
    },
    connect: {
      dist: {
        options: {
          port: cfg.util.servPort,
          debug: cfg.util.servDbg,
          base: cfg.dest.base
        }
      }
    },
    sitemap: {
      cwd: cfg.dest.base,
      dest: cfg.dest.sitemap,
      site: cfg.util.siteRoot
    },
    watch: {
      content: {
        files: [cfg.dest.output + '/**/*.html'],
        tasks: [ 'copy:content' ],
        options: { spawn: false }
      },
      data: {
        files: [ '_content/data/**/*.*' ],
        tasks: [ 'copy:data' ],
        options: { spawn: false }
      }
    },
    rsync: { src: cfg.util.rsyncSrc, dest: cfg.util.rsyncDest },
    clean: [ cfg.dest.base ]
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
      ['clean', 'jshint', 'concat', 'copy', 'sitemap'] :
      ['clean', 'jshint', 'concat', 'cssmin', 'uglify', 'copy', 'sitemap']);

  grunt.registerTask('serv', 'Build the dist folder and launch local serv',
    ['dist', 'connect', 'watch']);
  grunt.registerTask('server', ['serv']);

  /* default task */
  grunt.registerTask('default', ['dist']);
};

