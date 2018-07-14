var Twit = require('twit')
 
var accounts = [];

var T1 = new Twit({
  consumer_key:         '2SDXEdM92vSCZznM91JncFbN4',
  consumer_secret:      'c82L26u0Nnjm0SJQW6HEyC4kuOCFvA95DOR6bQ5XHx0K5uDacC',
  access_token:         '883308196689051648-E537MdqaZzbMlYAxSkZiepeKLwmCLHQ',
  access_token_secret:  '5G9XX1feYt0RzBFUHHdq4nBRpDSbz3BjwIplPMlsbztuR',
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