module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt)

    grunt.initConfig({
        uglify: {
            dist: {
                files: {
                    'dist/log.min.js': ['src/log.js']
                }
            }
        },
        jasmine: {
            tests: {
                src: 'src/log.js',
                options: {
                    specs: 'spec/log.spec.js',
                }
            }
        },
        jshint: {
            options:{
                reporter: require('jshint-stylish'),
                asi: true,
                laxcomma: true,
                laxbreak: true,
                shadow: true
            },
            source: {
                src: 'src/log.js'
            }
        }
    })

    grunt.registerTask('default', ['uglify', 'jasmine'])
}