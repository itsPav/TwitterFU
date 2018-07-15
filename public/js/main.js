function render(csvData) {

  var xAxis = [];

  var colors = ["#3e95cd","#8e5ea2","#3cba9f","#e8c3b9","#c45850"];

  for(var i = 0; i < csvData[0].length; i+=2) {
    xAxis.push(csvData[0][i].date);
  }

  var datasets = [];
  // create a dataset object for each account
  csvData.forEach(element => {
    var accountData = {};
    var followerdata = [];

    var accountName = element[0].accountName;
    for(var i = 0; i < element.length; i+=2){
      followerdata.push(element[i].totalFollowers)
    }
    accountData.data = followerdata;
    accountData.label = accountName;
    accountData.borderColor = colors[Math.floor(Math.random()*Math.floor(colors.length))];
    accountData.fill = false;

    datasets.push(accountData);
  })

  var chart_data = {
  labels: xAxis,
  datasets: datasets
  }

  new Chart(document.getElementById("line-chart"), {
    type: 'line',
    data: chart_data,
    options: {
      title: {
        display: true,
        text: 'Twitter Followers'
      }
    }
  });
}

var socket = io();

socket.on('csvData', function(csvData){
  render(csvData);
});

socket.on('followNum', function(followNum){
  document.getElementById('followNum').innerHTML = `Number of People to Follow: ${followNum}`;
});

socket.on('unfollowNum', function(unfollowNum){
  document.getElementById('unfollowNum').innerHTML = `Number of People to Unfollow: ${unfollowNum}`;
});

socket.on('minutes', function(minutes){
  document.getElementById('minutes').innerHTML = `Interval: ${minutes} minutes`;
});

// Change the Twitter Config
var followConfig = document.getElementById('followConfig');
var unfollowConfig = document.getElementById('unfollowConfig');
var minuteConfig = document.getElementById('minuteConfig');

followConfig.addEventListener("click", function() {
  socket.emit('followNum', document.getElementsByClassName('followNum')[0].value);
  return false;
})

unfollowConfig.addEventListener("click", function() {
  socket.emit('unfollowNum', document.getElementsByClassName('unfollowNum')[0].value);
  return false;
})

minuteConfig.addEventListener("click", function() {
  socket.emit('minutes', document.getElementsByClassName('minutes')[0].value);
  return false;
})

// Add account
var addAccount = document.getElementById('newAccount');

addAccount.addEventListener("click", function() {
  socket.emit('twitterAccount', getTwitterData());
  return false;
})

function getTwitterData() {
  twitterData = [];
  twitterData.push(`"${document.getElementsByClassName('consumer_key')[0].value}"`)
  twitterData.push(`"${document.getElementsByClassName('consumer_secret')[0].value}"`)
  twitterData.push(`"${document.getElementsByClassName('access_token')[0].value}"`)
  twitterData.push(`"${document.getElementsByClassName('access_token_secret')[0].value}"`)
  console.log(twitterData);
  return twitterData;
}