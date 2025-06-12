module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mkdir: {
      build: {
        options: {
          create: ['build', 'dist', 'downloads']
        },
      },
    },
    downloadfile: {
      options: {
        dest: './downloads',
        overwriteEverytime: true
      },
      files: {
        'eclipse.zip': 'https://ftp.halifax.rwth-aachen.de/eclipse/technology/epp/downloads/release/2025-06/R/eclipse-jee-2025-06-R-win32-x86_64.zip'
      }
    },
    unzip: {
      'build': 'downloads/eclipse.zip'
    },
    zip: {
      'build': {
          cwd: 'build/eclipse',
          src: ['build/eclipse/**/*'],
          dest: 'dist/eclipse-dist.zip',
          compression: 'DEFLATE',
          dot: true
      }
    },
    clean: {
      all: ['dist', 'build', 'downloads'],
      build : ['build', 'downloads']
    }
  });

  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-downloadfile');  
  grunt.loadNpmTasks('grunt-zip');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // default task. Just prepare the directory structure
  grunt.registerTask('default', ['clean:all', 'mkdir:build']);

  // tasks / workflow
  grunt.registerTask('1', ['clean:all']);
  grunt.registerTask('2', ['mkdir:build']);
  grunt.registerTask('3', ['downloadfile']);
  grunt.registerTask('4', ['unzip']);
  grunt.registerTask('5', ['zip']);
  grunt.registerTask('6', ['clean:build']);
};