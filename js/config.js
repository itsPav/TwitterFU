const Twit = require('twit')
const fs = require('fs');
const csv = require('csvtojson');

var accounts = [];

fs.readdir('./', (err, files) => {
  files.forEach(file => {
      if(file == 'accounts.csv'){
        console.log(file);
        csv()
            .fromFile(file)
            .then((jsonObj)=>{
               
                var i = 0;
                jsonObj.forEach(element => {
                   
                  var T = new Twit({
                    consumer_key: element.consumer_key,
                    consumer_secret: element.consumer_secret,
                    access_token: element.access_token,
                    access_token_secret: element.access_token_secret,
                    timeout_ms: 60*1000,  // optional HTTP request timeout to apply to all requests.
                    strictSSL: true,     // optional - requires SSL certificates to be valid.
                  })

                  accounts.push(T);
                });
                console.log(accounts);
                module.exports = accounts;
            })
          }
    })
})