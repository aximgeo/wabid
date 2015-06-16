var expect = require('chai').expect,
    wabid = require('../wabid'),
    mock = require('mock-fs');

describe('wabid', function() {

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

    describe("Getting a list of subdirectories", function () {
        afterEach(function () {
            mock.restore();
        });

        it('Has a method to get a list of subdirectories', function () {
            expect(wabid.getSubdirectories).to.exist;
        });

        it('Returns an empty array if there are no subdirectories', function () {
            var expected = [];
            mock({
                'my/mock/directory': {
                    'someFile.txt': ''
                }
            });
            expect(wabid.getSubdirectories('my/mock/directory/')).to.deep.equal(expected);
        });

        it('Returns a list of subdirectories', function () {
            var expected = [
                'submock1',
                'submock2'
            ];
            mock({
                'my/mock/directory': {
                    'submock1': {},
                    'submock2': {},
                    'someFile.txt': ''
                }
            });
            expect(wabid.getSubdirectories('my/mock/directory/')).to.deep.equal(expected);
        });
    });
});