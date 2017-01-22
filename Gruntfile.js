module.exports = function(grunt) {
  grunt.initConfig({
    
    // Options, Config, ETC
    pkg: grunt.file.readJSON('package.json'),
    // site  : grunt.file.readYAML('_config.yml'),
    config: {
      src: 'src',
      dist: 'dist',
      assets: 'dist/assets',
    },
    site: {
      title: 'Jennifer Scroggins',
      desc: 'Developer & Designer'
    },
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
        
        // Site Vars
        root: '<%= config.dist %>',
        assets: '<%= config.assets %>',
        site: '<%= site %>',
        
        // Data
        data: '',

        // Templates
        layout: 'src/layouts/root_layout.hbs',
        partials: ['src/partials/*.hbs'],
        
      },
      devblog : {
        options: {
          layout: 'src/layouts/blog.hbs',
          engine: 'handlebars'
        },
        files: {
          '<%= config.dist %>/devblog/': ['src/content/devblog/*.md']
        }
      },
      // pages : {
      //   files: {
      //     'dist/': ['src/content/pages/*.hbs']
      //   }
      // }
    },
    
    browserSync: {
      bsFiles: {
        src : [
          '<%= config.assets %>/css/*.css',
          '<%= config.dist %>/*.html',
          '<%= config.dist %>/**/*.html',
        ]
      },
      options: {
        watchTask: true,
        server: './<%= config.dist %>'
      }
    },
    
    watch: {
      options: {
        livereload: true,
      },
      all: {
            files: ['src/*.hbs', 'src/content/**/*.hbs', 'src/layouts/*.hbs', 'src/partials/*.hbs'],
            tasks: ['clean', 'assemble']
        },
      css: {
        files: ['src/sass/**/*.scss'],
        tasks: ['sass']
      }
    },
    
    clean: {
      example: ['<%= config.dist %>/**/*.{html,md}']
    }

  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default',['sass', 'clean', 'assemble', 'browserSync', 'watch']);
}

