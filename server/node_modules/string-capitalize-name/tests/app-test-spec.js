"use strict";

var charlatan = require('charlatan'),
    should = require('chai').should(),
    SCN = require('../app.js');

describe("Testing if the end of string is correct", function(){

    var name = (charlatan.Name.name()).toLowerCase();

    var verifyIfFirstPositionIsUpperCase = function(name){
        var arrString = name.trim().split(' ');

        for(var i = 0; i< arrString.length; i++){
            var first = arrString[i];
            if(first[0] !== first[0].toUpperCase()){
                return false;
            }
        }
        return true;
    }

    it("All the first letter is UpperCase", function(done){
        var nameSCN = SCN(name);
        console.log(nameSCN);
        verifyIfFirstPositionIsUpperCase(nameSCN).should.be.true;
        done();
    });

    it("Only the first character is UpperCase", function(done){
        var nameTest ='NIColas FiRemberg RamiRez',
            nameSCN = SCN(nameTest);
        nameSCN.should.be.equal('Nicolas Firemberg Ramirez');
        done();
    });

    it("Ignore name that length is less than specified", function(done){
        var nameTest ='nicolas das firemberg c. ramirez rond',
            nameSCN = SCN(nameTest,{ignoreLessThanLength: 3});
        nameSCN.should.be.equal('Nicolas das Firemberg c. Ramirez Rond');
        done();
    });

    it("Return empty string if does not pass anything", function(done){
        var nameTest ='',
            nameSCN = SCN(nameTest);
        nameSCN.should.be.equal('');
        done();
    });

    it("Return string with no spaces at end and beginning", function(done){
        var nameTest =' JosÉ fagundes HernanteS ',
            nameSCN = SCN(nameTest);
        nameSCN.should.be.equal('José Fagundes Hernantes');
        done();
    });

    it("Ignore option case ignoreLessThanLength is not a number", function(done){
        var nameTest =' JosÉ fagundes da HernanteS ',
            nameSCN = SCN(nameTest,{ignoreLessThanLength: 'teste'});
        nameSCN.should.be.equal('José Fagundes Da Hernantes');
        done();
    });

});