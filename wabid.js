var fs = require('fs'),
    path = require('path');

module.exports = {

    /**
     * Returns all subdirectories that contain WAB widgets
     * @param dir
     */
    getWidgetSubdirectories: function (dir, files) {
        var self = this;
        return fs.readdirSync(dir).filter(function(file) {
            var filePath = path.join(dir, file);
            return (fs.statSync(filePath).isDirectory() && self.isWidget(filePath, files));
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
        dir = self.checkDirectoryPath(dir);
        return wabFiles.map(function (file) {
            return dir + file;
        }).every(function (file) {
                return self.exists(file);
        });
    },

    checkDirectoryPath: function (dir) {
        return dir.indexOf('/') === dir.length - 1 ? dir : dir + "/";
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