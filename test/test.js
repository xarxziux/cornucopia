'use strict';

const expect = require('chai').expect;
const should = require('chai').should();
const cc = require ('../src/2_uglified/cornucopia.min.js');

describe('Basic tests', function() {
    
      const blankArray = cc.getBlankArray (12);
      const joinedArray = blankArray.reduce ((a, x) => (a + x));
      
      it ('Should return an array of size 12 with blank strings',
            function() {
          
          expect (blankArray.length).to.equal (12);
          expect (joinedArray).to.equal ('');
          expect (typeof blankArray [4]).to.equal ('string');
          
    });
});

