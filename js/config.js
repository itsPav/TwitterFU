const Twit = require('twit')
const fs = require('fs');
 
var accounts = [];

var T1 = new Twit({
  consumer_key:         '7D6E7Vec9ow6gA18QCb0G98Z5',
  consumer_secret:      'udVkdq6YO3SM33AsNani9f5tHYLvVUWWwYYwLljSb4nE1XfcwD',
  access_token:         '886725235986362368-bPPParTYKlBx91wfz3FV018aJfJQbTF',
  access_token_secret:  'LhfY8OdcQxwXH8zX5Ykr7rStMVWmdVqFqBVGBcTOWenle',
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