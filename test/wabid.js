var expect = require('chai').expect,
    wabid = require('../wabid'),
    mock = require('mock-fs');

describe('wabid', function() {

    describe("Checking directory endoing", function () {
       it ("Appends a / if there is not one on the directory path", function () {
           expect(wabid.checkDirectoryPath('myDir')).to.equal('myDir/');
       });

        it ("Does not append a / if there is already one", function () {
            expect(wabid.checkDirectoryPath('myDir/')).to.equal('myDir/');
        });
    });

    describe("Checking for WAB files", function () {

        afterEach(function () {
            mock.restore();
        });

        it('Has a method to determine if a directory contains a WAB widget', function () {
            expect(wabid.isWidget).to.exist;
        });

        it('Returns true if all the files exist in the directory', function () {
            var files = [
                    'manifest.json',
                    'Widget.js'
                ];
            mock({
                'my/mock/directory': {
                   'Widget.js': '',
                   'manifest.json': ''
               }
           });
            expect(wabid.isWidget('my/mock/directory/', files)).to.be.true;
        });

        it('Uses a default file list if not given one', function () {
            mock({
                'my/mock/directory': {
                    'Widget.js': '',
                    'manifest.json': ''
                }
            });
            expect(wabid.isWidget('my/mock/directory/')).to.be.true;
        });

        it('Returns false if any of the files do not exist in the directory', function () {
            var files = [
                'manifest.json',
                'Widget.js'
            ];
            mock({
                'my/mock/directory': {
                    'manifest.json': ''
                }
            });
            expect(wabid.isWidget('my/mock/directory/', files)).to.be.false;
        });
    });

    describe("Getting a list of widget subdirectories", function () {
        afterEach(function () {
            mock.restore();
        });

        it('Has a method to get a list of subdirectories', function () {
            expect(wabid.getWidgetSubdirectories).to.exist;
        });

        it('Returns an empty array if there are no subdirectories', function () {
            var expected = [];
            mock({
                'my/mock/directory': {
                    'someFile.txt': ''
                }
            });
            expect(wabid.getWidgetSubdirectories('my/mock/directory/')).to.deep.equal(expected);
        });

        it('Returns an empty array if there are no widget subdirectories', function () {
            var expected = [];
            mock({
                'my/mock/directory': {
                    'submock1': {},
                    'submock2': {},
                    'someFile.txt': ''
                }
            });
            expect(wabid.getWidgetSubdirectories('my/mock/directory/')).to.deep.equal(expected);
        });

        it('Returns all subdirectories that contain wab widgets', function () {
            var expected = [
                'submock1'
            ];
            var files = [
                'Widget.js',
                'manifest.json'
            ];
            mock({
                'my/mock/directory': {
                    'submock1': {
                        'Widget.js': '',
                        'manifest.json': ''
                    },
                    'submock2': {
                        'Widget.js': ''
                    },
                    'someFile.txt': ''
                }
            });
            expect(wabid.getWidgetSubdirectories('my/mock/directory/')).to.deep.equal(expected);
        });
    });
})