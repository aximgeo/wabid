var fs = require('fs'),
    path = require('path');

module.exports = {

    /**
     * Returns all subdirectories that contain WAB widgets
     * @param dir
     * @param files
     * @returns {Array|*}
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
     * @param dir - directory in question
     * @param files - optional list of files that identify a widget
     * @returns {boolean}
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

    /**
     * Appends a / to end of directory path if it does not exist
     * @param dir
     * @returns {*}
     */
    checkDirectoryPath: function (dir) {
        return dir.indexOf('/') === dir.length - 1 ? dir : dir + "/";
    },

    /**
     * Returns true if the given file exists
     * @param filePath
     * @returns {boolean}
     */
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