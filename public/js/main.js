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