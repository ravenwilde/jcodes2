module.exports = function(grunt) {
  grunt.initConfig({
    // Options, ETC
    pkg: grunt.file.readJSON('package.json'),
    routes: {

    },
    // Tasks
    sass: {
      options: { 
        sourcemap: 'none',
        includePaths: [
          'node_modules/bootstrap/scss/'
        ],                      
        outputStyle: 'compressed'
      },
      dist: {
        files: {
          'dist/assets/css/style.css' : 'src/sass/style.scss'
        }
      }
    },
    assemble: {
      options: {
        assets: 'dist/assets/',
        data: '<%= routes %>',
        layout: 'src/layouts/root_layout.hbs',
        partials: ['src/partials/*.hbs'],
        flatten: true
      },
      index : {
        files: {
          'dist/': ['src/views/*.hbs']
        }
      }
    },
    browserSync: {
      bsFiles: {
        src: 'dist/**/*'
      },
      options: {
        watchTask: true,
        server: './dist'
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      css: {
        files: ['**/*.scss', 'src/views/*.hbs', 'src/partials/*.hbs', 'src/layouts/*.hbs'],
        tasks: ['sass', 'assemble']
      }
    }
    // Before generating any new files,
    // remove any previously-created files.
    clean: {
      example: ['dest/*.{html,md}']
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default',['sass', 'assemble', 'browserSync', 'watch']);
}

