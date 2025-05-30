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
        'eclipse.zip': 'https://ftp.halifax.rwth-aachen.de/eclipse/technology/epp/downloads/release/2025-03/R/eclipse-jee-2025-03-R-win32-x86_64.zip'
      }
    },
    unzip: {
      'build': 'downloads/eclipse.zip'
    },
    zip: {
      'dist': {
        cwd: 'build/eclipse',
        src: ['build/eclipse/**/*'],
        dest: 'dist/eclipse-dist.zip',
        compression: 'DEFLATE',
        dot: true
      }
    },
    exec: {
      eclipse: {
        command: 'build\\eclipse\\eclipse.exe -application org.eclipse.equinox.p2.director -repository https://download.eclipse.org/releases/2025-03,https://tools.hana.ondemand.com/latest -installIU com.sap.adt.tools.bopf.devedition.feature.group,com.sap.adt.core.devedition.feature.group,com.sap.adt.tools.hana.devedition.feature.group,com.sap.adt.wda.core.devedition.feature.group,com.sap.adt.pitools.tlf.devedition.feature.group -tag AddADT -destination .\\build\\eclipse -profile epp.package.jee.profile',
        stdout: true,
        stderr: true
      },
    },
    clean: [
      'dist', 
      'build',
      'downloads'
    ]
  });
  
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-downloadfile');   
  grunt.loadNpmTasks('grunt-zip');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['clean', 'mkdir:build', 'downloadfile', 'unzip', 'exec', 'zip:dist']);

  // prepare folders
  grunt.registerTask('1', ['clean']);
  grunt.registerTask('2', ['mkdir:build']);
  // download eclipse
  grunt.registerTask('3', ['downloadfile']);
  // unzip eclipse
  grunt.registerTask('4', ['unzip']);
  // run p2 director and add ADT
  grunt.registerTask('5', ['exec']);
  // zip Eclipse + ADT
  grunt.registerTask('6', ['zip:dist']);
};