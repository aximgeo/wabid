# Wabid
A node module to aid in dependency managment for Web Appbuilder projects, by identifying whether a dependency is a WAB widget and should be placed in the `/widgets` directory, or another dependency (i.e., third-party library, dojo dijit) which should go in `/libs`.

Currently implemented as a set of file checks; by default, any directory which contains both `Widget.js` and `manifest.json` will be considered a WAB widget.  The caller can also pass in a custom list of files to test against.

This module is meant to be used together with [grunt-bower-task](https://github.com/yatskevich/grunt-bower-task); An example gruntfile might look like:

```

var wabid = require('./node_modules/wabid');
module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-bower-task');

    grunt.initConfig({
        bower: {
            install: {
                options: {
                    targetDir: './',
                    cleanBowerDir: false,
                    layout: function (type, component, source) {
                        var path = '', subDirectory = '';
                        if (wabid.isWidget('bower_components/' + component)) {
                            subDirectory = ' is a widget';
                            path = 'widgets/' + component;
                        } else {
                            subDirectory = ' is a lib';
                            path = 'libs/' + component;
                        }
                        console.log(component + subDirectory);
                        return path;
                    }
                }
            }
        },
    });

    grunt.registerTask('bower-deps', ['bower:install']);
}
