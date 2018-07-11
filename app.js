var T = require('./js/config');

var accountData;

// Get the user data of the api
T.get('account/verify_credentials', { skip_status: true })
  .catch(function (err) {
    // console.log('caught error', err.stack)
  })
  .then(function (result) {
 
    accountData = result.data;
    console.log(accountData.screen_name);

    // GET friends/ids
    T.get('friends/ids', { screen_name: `${accountData.screen_name}` },  function (err, data, response) {
        // console.log('Followers');
        // console.log(data.ids)

        var toUnfollow = [];
        (data.ids).forEach(element => {
          if(toUnfollow.length < 10 && element != "") {
            toUnfollow.push(element);
          }
        });

        // Unfollow
        // https://developer.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/post-friendships-destroy
        toUnfollow.forEach(element => {
          T.post('friendships/destroy', { user_id: element }, function (err, data, response) {
              console.log('Unfollowed: ' + element)
          })
        })
    })

    var followCount = 0;

    setTimeout(function(){
      var stream = T.stream('statuses/sample')
      // get real time sample tweet ids
      while(followCount <= 20) {
        stream.on('tweet', function (tweet) {
        // console.log(tweet.user.id)
        // Follow
        // https://developer.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/post-friendships-create.html
          T.post('friendships/create', { user_id: tweet.user.id }, function (err, data, response) {
            console.log('Followed: ' + tweet.user.id);
            followCount++;
          });
        });
      }
    }, 2000);
});