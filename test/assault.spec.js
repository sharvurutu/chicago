const chai = require('chai');
const expect = chai.expect;

const jsonDiff = require('./jsonDiff');
const totalObjectKeys = require('./totalObjectKeys');

const expectedJSON = require('./json/assault.json');
const actualJSON = require('../output/assault.json');

describe('Test Application as Blackbox - Assault Scenario', function(){

  it('JSON has expected Number of Objects', function(done){
    for(let i=0; i < expectedJSON.length; i++){
      let objMatrix = totalObjectKeys.traverse(actualJSON[i]);
      expect(objMatrix.totalNoObjects).to.not.equal(0);
      expect(objMatrix.totalNoKeys).to.not.equal(0);
    }
    done();
  });

  it('Test JSON is as expected', function(done){
    for(let i=0; i < expectedJSON.length; i++){
      let compareResult = jsonDiff.compareJSONObjects(expectedJSON, actualJSON);
      expect(compareResult.diffs).equal(0);
    }
    done();
  });
});
