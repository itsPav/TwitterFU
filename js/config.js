var Twit = require('twit')
 
var accounts = [];

var T1 = new Twit({
  consumer_key:         '...',
  consumer_secret:      '...',
  access_token:         '...',
  access_token_secret:  '...',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})

// var T2 = new Twit({
//   consumer_key:         '...',
//   consumer_secret:      '...',
//   access_token:         '...',
//   access_token_secret:  '...',
//   timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
//   strictSSL:            true,     // optional - requires SSL certificates to be valid.
// })

accounts.push(T1);
// accounts.push(T2);

module.exports = accounts;