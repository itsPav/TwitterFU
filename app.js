const T = require('./js/config');
const fs = require('fs');
const json2csv = require('json2csv').Parser;

const fields = ['date', 'accountName', 'follows', 'unfollows', 'totalFollowers', 'totalFollowing'];

var accountData;

var myData = {};

// Get the user data
T.get('account/verify_credentials', { skip_status: true })
  .catch(function (err) {
    // console.log('caught error', err.stack)
  })
  .then(function (result) {
 
    accountData = result.data;
    console.log(accountData.screen_name);

    // // GET friends/ids
    // T.get('friends/ids', { screen_name: `${accountData.screen_name}` },  function (err, data, response) {
    //     // console.log('Followers');
    //     // console.log(data.ids)

    //     var toUnfollow = [];
    //     (data.ids).forEach(element => {
    //       if(toUnfollow.length < 10 && element != "") {
    //         toUnfollow.push(element);
    //       }
    //     });

    //     // Unfollow
    //     // https://developer.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/post-friendships-destroy
    //     toUnfollow.forEach(element => {
    //       T.post('friendships/destroy', { user_id: element }, function (err, data, response) {
    //           console.log('Unfollowed: ' + element)
    //       })
    //     })
    // })

    // var followCount = 0;

    // var stream = T.stream('statuses/sample')
    // // get real time sample tweet ids
    // stream.on('tweet', function (tweet) {
    // // console.log(tweet.user.id)
    // // Follow
    // // https://developer.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/post-friendships-create.html
    //   T.post('friendships/create', { user_id: tweet.user.id }, function (err, data, response) {
    //     console.log('Followed: ' + tweet.user.id);
    //     followCount++;
    //   });
    // });


    myData.date = Date();
    myData.accountName = 'Hello';
    myData.follows = 5;
    myData.unfollows = 2;

    try {

      const parser = new json2csv({ fields });
      const csv = parser.parse(myData);

      console.log(csv);

      if(fs.existsSync('followerStats.csv')){
        console.log('Exists');
        fs.appendFile('followerStats.csv', `"${myData.date}","${myData.accountName}",${myData.follows},${myData.unfollows},"",""` + "\n", (err) => {
          if (err) throw err;
          console.log('The file has been saved!');
        });
      } else {
        console.log('Does not exist');
        fs.writeFile('followerStats.csv', csv + "\n", (err) => {
          if (err) throw err;
          console.log('The file has been saved!');
        });
      }
    } catch (err) {
      console.error(err);
    }

});