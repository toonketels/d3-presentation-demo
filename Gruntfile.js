'use strict';

var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
  return connect.static(path.resolve(point));
};

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      livereload: {
        options: {
          port: 8080,
          middleware: function(connect, options) {
            return [lrSnippet, folderMount(connect, options.base)]
          },
          base: 'www'
        }
      }
    },
    jade: {
      html: {
        files: {
          'www/': ['jade/*.jade']
        },
        options: {
          client: false,
          pretty: true
        }
      }
    },
    sass: {
      dev: {
        options: {
          style: 'expanded'
        },
        files: {
          'www/css/main.css': 'sass/main.sass' 
        }
      }
    },
    regarde: {
      html: {
        files: ['jade/*.jade', 'jade/includes/*.jade'],
        tasks: ['jade', 'livereload'],
        events: true
      },
      css: {
        files: ['sass/*.sass'],
        tasks: ['sass', 'livereload'],
        events: true
      },
      js: {
        files: [
          'www/js/*.js', 
          'www/js/vendor/*.js'
        ],
        tasks: ['livereload'],
        events: true
      }
    }
  });

  // Load contrib tasks...
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-jade');
  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Register tasks aliases...
  grunt.registerTask('build', 'Compile all jade/sass into html/css ready to be served.', ['jade', 'sass']);
  grunt.registerTask('default', 'Starts a server, watches for changes to automatically build and live reload files.', ['livereload-start', 'connect', 'regarde']);
};