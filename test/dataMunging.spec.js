const should = require("chai").should(),
    expect = require("chai").expect,
    sinon = require('sinon'),
    readline = require("readline"),
    fs = require("fs"),
    pkginfo = require("pkginfo")(module),
    convert = require("../index");

describe("Test the createInterface method of readline", function(err) {
    it("should be called only once", function() {
        var spyCreateInterface = sinon.spy(readline, 'createInterface');
        convert();
        readline.createInterface.restore();
        sinon.assert.calledOnce(spyCreateInterface);
    });
});
describe("Test the on() method of readline interface for line event", function(err) {
    it("should be called", function() {
        var stub = sinon.stub(readline.Interface.prototype, 'on');
        convert();
        sinon.assert.called(stub);
        readline.Interface.prototype.on.restore();
        sinon.assert.calledWith(stub, "line");

    });
});
describe("Test the on() method of readline interface for close event", function(err) {
    it("should be called", function() {
        var stub = sinon.stub(readline.Interface.prototype, 'on');
        convert();
        readline.Interface.prototype.on.restore();
        sinon.assert.calledWith(stub, "close");
    });
});

describe("Test for use of Array.map() and Array.push() function", function(err) {
    it("Array.map() should be used atleast once", function() {
        var mapSpy = sinon.spy(Array.prototype, 'map');
        convert();
        sinon.assert.called(mapSpy);
    });
    it("Array.push() should be used atleast once", function() {
        var pushSpy = sinon.spy(Array.prototype, 'push');
        convert();
        sinon.assert.called(pushSpy);
    });
});

describe.skip("Unit tests have been created", function(err) {
    it("check for existence of test files", function(done) {
        fs.stat(__dirname + '/' + module.exports.unittests, function(err, stat) {
            expect(err).to.equal(null);
            expect(err).to.not.equal('ENOENT');
            done();
        });
    });
});

describe("Testing for existence of Synchronous file read methods", function(err) {
    let sandbox = '';
    beforeEach(function() {
        this.sandbox = sinon.sandbox.create();
    })

    it("should not be called readFileSync", function() {
        var stub = this.sandbox.stub(require('fs'), "readFileSync");
        convert();
        sinon.assert.callCount(stub, 0);
    });
    afterEach(function() {
        this.sandbox.restore();
    });
});

describe("Testing for existence of Synchronous writeFileSync methods", function(err) {
    let sandbox = '';
    beforeEach(function() {
        this.sandbox = sinon.sandbox.create();
    })

    it("should not be called writeFileSync", function() {
        var stub = this.sandbox.stub(require('fs'), "writeFileSync");
        convert();
        sinon.assert.callCount(stub, 0);
    });
    afterEach(function() {
        this.sandbox.restore();
    });
});

describe("Testing for existence of Asynchronous writeFile methods", function(err) {
    let sandbox = '';
    beforeEach(function() {
        this.sandbox = sinon.sandbox.create();
    })

    it("should be called writeFile", function(done) {
        var stub = this.sandbox.stub(require('fs'), "writeFile");
        convert();
        setTimeout(function() {
            sinon.assert.called(stub);
        }, 10000);

        done();
    });
    afterEach(function() {
        this.sandbox.restore();
    });
});

describe.skip("Testing for whether close() method called on fs", function(err) {
    let sandbox = '';
    beforeEach(function() {
        this.sandbox = sinon.sandbox.create();
    })

    it("should be called", function() {
        var stub = this.sandbox.stub(require('fs'), "close");
        convert();
        sinon.assert.called(stub);
    });

    afterEach(function() {
        this.sandbox.restore();
    });
});
describe.skip("Test for use of JSON.parse() and JSON.stringify() functions", function(err) {
    it("JSON.parse() should be used atleast once", function() {
        var parseSpy = sinon.spy(JSON, 'parse');
        convert();
        sinon.assert.called(parseSpy);
    });
    it("JSON.stringify() should be used atleast once", function() {
        var stringifySpy = sinon.spy(JSON, 'stringify');
        convert();
        sinon.assert.called(stringifySpy);
    });
});

describe.skip("Test for use of Regular Expressions and RegExp.test() or RegExp.exec() methods", function(err) {
		let sandbox = '';
    beforeEach(function() {
        this.sandbox = sinon.sandbox.create();
    })

    it("should be called", function() {
        var stub = this.sandbox.stub(RegExp, "test");
        convert();
        sinon.assert.called(stub);
    });

    afterEach(function() {
        this.sandbox.restore();
    });
});
