/**!
 *
 * Copyright (c) 2016, Vathos GmbH
 *
 * All rights reserved.
 */
module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.description %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
      'Vathos GmbH; All rights reserved. */\n',
    browserify: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src',
          src: ['**/*.js'],
          dest: 'tmp/js',
          ext: '.js',
          extDot: 'first'
        }]
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'tmp/js',
          src: ['**/*.js'],
          dest: 'static/js',
          ext: '.js',
          extDot: 'first'
        }]
      }
    },
    clean: {
      folder: ['tmp']
    },
    stylus: {
      compile: {
        options: {
          compress: true
        },
        files: [{
          expand: true,
          cwd: 'styles',
          src: ['**/*.styl'],
          dest: 'static/css',
          ext: '.css',
          extDot: 'first'
        }]
      }
    },
    pug: { // just for export to other projects
      compile: {
        options: {
          debug: true
        },
        files: [{
          expand: true,
          cwd: 'views',
          src: ['index.pug', 'teaching.pug', 'projects.pug'],
          //dest: '//',
          ext: '.html',
          extDot: 'first'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-pug');

  grunt.registerTask('default', ['browserify', 'uglify', 'clean', 'stylus', 'pug']);
  grunt.registerTask('html', ['clean']);

};