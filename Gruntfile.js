module.exports = function(grunt) {
  grunt.initConfig({
    
    // Options, ETC
    pkg: grunt.file.readJSON('package.json'),

    // Tasks
    
    sass: {
      options: { 
        sourcemap: 'none',
        includePaths: [
          './node_modules/bootstrap/scss/',
        ],                      
        outputStyle: 'expanded'
      },
      dist: {
        files: {
          'dist/assets/css/style.css' : 'src/sass/style.scss'
        }
      }
    },

    assemble: {
      options: {
        flatten: true,
        assets: 'dist/assets/',
        data: '',
        layout: 'src/layouts/root_layout.hbs',
        partials: ['src/partials/*.hbs'],
        
      },
      index : {
        files: {
          'dist/': ['src/views/*.hbs']
        }
      }
    },
    
    browserSync: {
      bsFiles: {
        src : [
          'dist/assets/css/*.css',
          'dist/*.html',
          'dist/**/*.html',
        ]
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
      all: {
            files: ['src/*.hbs', 'src/layouts/*.hbs', 'src/partials/*.hbs', 'src/views/*.hbs'],
            tasks: ['clean', 'assemble']
        },
      css: {
        files: ['src/sass/**/*.scss'],
        tasks: ['sass']
      }
    },
    
    clean: {
      example: ['dist/**/*.{html,md}']
    }

  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default',['sass', 'clean', 'assemble', 'browserSync', 'watch']);
}

