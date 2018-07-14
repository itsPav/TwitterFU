const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs');
const accounts = require('./js/config');
const csv = require('csvtojson');
const path = require('path');
const json2csv = require('json2csv').Parser;
const fields = ['date', 'accountName', 'totalFollowers', 'totalFollowing'];
const PORT = process.env.PORT || 5000;

var minutes = 120;
var the_interval = minutes * 60 * 1000;

app.use(express.static('public'))

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(`${PORT}`, function(){
    console.log(`listening on ${PORT}`);
});

io.on('connection', function(socket){

    var csvData = [];
    var csvFiles = 0;

    fs.readdir('./', (err, files) => {
        files.forEach(file => {
            if(file.includes('.csv')){
                csvFiles++;
                // console.log(file);
                csv()
                    .fromFile(file)
                    .then((jsonObj)=>{
                        csvData.push(jsonObj);
                        if(csvData.length == csvFiles) {
                            // console.log(csvData)
                            io.emit('csvData', csvData);
                        }
                    })
            }
        });
    })
});  

followUnfollow();

setInterval(followUnfollow, the_interval);

setInterval(function() {
    http.get("http://protected-brushlands-74783.herokuapp.com");
}, 300000); // every 5 minutes (300000)

function followUnfollow() {
    console.log("I am doing my 120 minute task");
    
    var accountData;
    var myData = {};
    
    console.log(accounts);
    
    accounts.forEach(twitAccount => {
        // Get the user data
        twitAccount.get('account/verify_credentials', { skip_status: true })
        .catch(function (err) {
            // console.log('caught error', err.stack)
        })
        .then(function (result) {
        
            accountData = result.data;
    
            // // GET friends/ids
            twitAccount.get('friends/ids', { screen_name: `${accountData.screen_name}` },  function (err, data, response) {
    
                var toUnfollow = [];
                (data.ids).forEach(element => {
                if(toUnfollow.length < 20 && element != "") {
                    toUnfollow.push(element);
                }
                });
    
                // Unfollow
                // https://developer.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/post-friendships-destroy
                toUnfollow.forEach(element => {
                    twitAccount.post('friendships/destroy', { user_id: element }, function (err, data, response) {
                    console.log('Unfollowed: ' + element)
                })
                })
            })
    
            var followCount = 0;
    
            var stream = twitAccount.stream('statuses/sample')
            // get real time sample tweet ids
            stream.on('tweet', function (tweet) {
            // Follow
            // https://developer.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/post-friendships-create.html
            if(followCount<20) {
                twitAccount.post('friendships/create', { user_id: tweet.user.id }, function (err, data, response) {
                console.log('Followed: ' + tweet.user.id);
                followCount++;
                });
            }
            else {
                stream.stop();
                console.log('Done following');
            }
            });
    
            var actualDate = new Date();
            myData.date = `${actualDate.toLocaleDateString("en-US")} ${actualDate.getHours()}`;
            myData.accountName = accountData.screen_name;
            myData.totalFollowers = accountData.followers_count;
            myData.totalFollowing = accountData.friends_count;
    
            try {
                var fileName = `${accountData.screen_name}Stats.csv`;
                const parser = new json2csv({ fields });
                const csv = parser.parse(myData);
                if(fs.existsSync(fileName)){
                console.log('Exists');
                fs.appendFile(fileName, csv + "\n", (err) => {
                    if (err) throw err;
                    console.log('The file has been saved!');
                });
                } else {
                console.log('Does not exist');
                fs.writeFile(fileName, csv + "\n", (err) => {
                    if (err) throw err;
                    console.log('The file has been saved!');
                });
                }
            } catch (err) {
            console.error(err);
            }
    
        });
    });
}