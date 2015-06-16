var expect = require('chai').expect,
    wabid = require('../wabid');

describe('wabid', function() {
    it('Has a method to determine if a directory contains a WAB widget', function () {
        expect(wabid.isWidget).to.exist;
    });
});