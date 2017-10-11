# Goldmint Vote1 smart contracts/DApp
This is a voting contract/DApp. It allows Goldmint token holders to vote.

The approach is opposite to **CarbonVote**. We do not require any token transfers.
Just own some MNTP tokens and call **vote** method.


# To run tests:

```
npm install
npm install -g mocha

# In one window
node_modules/.bin/testrpc --port 8989 --gasLimit 10000000

# In another window
./run_tests.sh
```
