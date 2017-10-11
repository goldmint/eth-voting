var solc = require('solc');
var Web3 = require('web3');

var fs = require('fs');
var assert = require('assert');
var BigNumber = require('bignumber.js');

// You must set this ENV VAR before testing
//assert.notEqual(typeof(process.env.ETH_NODE),'undefined');
var web3 = new Web3(new Web3.providers.HttpProvider(process.env.ETH_NODE));

var accounts;
var creator;

var tokenContractAddress;
var tokenContract;

var voteContractAddress;
var voteContract;

eval(fs.readFileSync('./test/helpers/misc.js')+'');

describe('Contracts 1', function() {
     before("Initialize everything", function(done) {
          web3.eth.getAccounts(function(err, as) {
               if(err) {
                    done(err);
                    return;
               }

               accounts = as;
               creator = accounts[0];

               deploySampleTokenContract(function(err){
                    deployVoteContract(function(err){
                         done();
                    });
               });
          });
     });

     after("Deinitialize everything", function(done) {
          done();
     });

     it('should not vote if no tokens',function(done){
          var params = {from: creator, gas: 2900000};

          voteContract.vote(true,params,function(err){
               assert.notEqual(err,null);
               done();
          });
     });

     it('should issue tokens',function(done){
          var params = {from: creator, gas: 2900000};

          tokenContract.issueTokens(creator,1000,params,function(err){
               assert.equal(err,null);

               var am = tokenContract.balanceOf(creator);
               assert.equal(am.toString(10),1000);

               done();
          });
     });

     it('should not vote if less than 1 ETH tokens',function(done){
          var params = {from: creator, gas: 2900000};
          voteContract.vote(true,params,function(err){
               assert.notEqual(err,null);
               done();
          });
     });

     it('should issue a lot of tokens',function(done){
          var params = {from: creator, gas: 2900000};

          var tenEth = 10000000000000000000;
          tokenContract.issueTokens(creator,tenEth,params,function(err){
               assert.equal(err,null);

               var am = tokenContract.balanceOf(creator);
               assert.equal(am.toString(10),10000000000000000000);

               done();
          });
     });

     it('should vote',function(done){
          var params = {from: creator, gas: 2900000};

          var totalVotes = voteContract.totalVotes();
          assert.equal(totalVotes,0);

          voteContract.vote(true,params,function(err){
               assert.equal(err,null);

               var res = voteContract.getVoteBy(creator);
               assert.equal(res,true);

               var totalVotes = voteContract.totalVotes();
               assert.equal(totalVotes,1);

               var votedYes = voteContract.votedYes();
               assert.equal(votedYes,1);

               done();
          });
     });

     it('should not vote again',function(done){
          var params = {from: creator, gas: 2900000};
          voteContract.vote(true,params,function(err){
               assert.notEqual(err,null);

               done();
          });
     });

});
