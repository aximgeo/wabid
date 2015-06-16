var fs = require('fs'),
    path = require('path');

module.exports = {

    /**
     * Deletes all subdirectories that contain WAB widgets
     * @param dir
     */
    deleteWidgets: function (dir) {

    },

    getSubdirectories: function (dir) {
        return fs.readdirSync(dir).filter(function(file) {
            return fs.statSync(path.join(dir, file)).isDirectory();
        });
    },

    /**
     * Returns true if the directory contains a WAB widget
     * @param dir
     */
    isWidget: function(dir, files) {
        var wabFiles = files || [
            'manifest.json',
            'Widget.js'
        ];
        var self = this;
        return wabFiles.map(function (file) {
            return dir + file;
        }).every(function (file) {
                return self.exists(file);
        });
    },

    exists: function (filePath) {
        var fileExists = true, fd;
        try {
            fd = fs.openSync(filePath, 'r');
            fs.closeSync(fd);
        }
        catch (e) {
            fileExists = false;
        }
        finally {
            return fileExists;
        }
    }
}