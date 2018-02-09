const path = require('path');
const should = require("chai").should(),
expect = require("chai").expect,
astprocessor = require("../tools/src/processFile"),
app = require("../index");

//console.log("Filename :" + __filename);

describe("Check the AST for this file", function(err){
  it("should be called only once", function(done) {
    astprocessor((__dirname + '/../' + 'index.js'), function(err, data) {
          // data.forEach(function(d){
          //   //console.log(d.name,d.result);
          // });
					// console.log(data);
          done();
        });
  });
});
