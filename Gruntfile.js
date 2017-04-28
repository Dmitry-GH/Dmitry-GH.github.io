module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {

      files: ['Gruntfile.js', 'src/**/*.js'],

       options: {
        reporter: require('jshint-stylish')
      }
    },

    uglify: {
      options: {
        //banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/js/mainApp.js',
        dest: 'dist/js/mainApp.min.js'
      }
    },

    sass: {
      dist: {
        options: { 
          style: 'compressed',
          sourcemap: 'none'
        },
        files: {
          'dist/css/style.css': 'src/css/*.scss'
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      css: {
        files: ['src/css/*.scss'],
        tasks: ['sass']
      },
      html: {
        files: ['*.html']
      },
      js: {
        files: ['src/js/*.js'],
        tasks: ['jshint', 'uglify']
      }
    },

    express:{
      all:{
        options:{
          port:1300,
          hostname:'localhost',
          bases:['.']
        }
      }
    }

  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-express');

  // Default tasks.
  grunt.registerTask('default', ['jshint', 'uglify', 'sass', 'watch']);
  // Server tasks.
  grunt.registerTask('server',['express','watch']);

};