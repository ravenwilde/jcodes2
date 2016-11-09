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
        // includePaths: [
        //   'node_modules/bootstrap-sass/assets/stylesheets/bootstrap/'
        // ],                      
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
        layout: 'src/layouts/root-layout.hbs',
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
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-assemble');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default',['sass', 'assemble', 'browserSync', 'watch']);
}

