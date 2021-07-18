function loadto(value) {
  txt = txt + value + "<br>";
}

function giveSignals(urldiff,datatrend) {

  fetch(urldiff)
    .then(response => response.json())
    .then(datadiff => {

      console.log(datatrend);
      console.log(datadiff);

      var divfrom1 = document.getElementById('dfromzz');
      var divto1 = document.getElementById('dto');


      divfrom1.innerHTML = ' ';
      divto1.innerHTML = ' ';



      datatrend.forEach((item, i) => {

        var divfrom = document.getElementById('dfromzz');



        divfrom.innerHTML += '<p>' + '<p1>' + item + ' </p1> ' + datadiff[i] + '</p>';

        var divto = document.getElementById('dto');

        divto.innerHTML += '<p>'+ datadiff[i+1] + '</p>';


      });






        // handle the response
    })
    .catch(error => {
        // handle the error
    });


}

function dodiffchart(url) {

  var trends;

  fetch(url)
    .then(response => response.json())
    .then(data => {
        // handle the response
        var ctx = document.getElementById('diffChart');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data,
                datasets: [{
                    label: 'Points of Revenue',
                    data: data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: false
                        }
                    }]
                }
            }
        });

    })
    .catch(error => {
        // handle the error
    });


}

function dochart(dataxx, url) {

  var trends;

  fetch(url)
    .then(response => response.json())
    .then(trends => {
        // handle the response
        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: trends,
                datasets: [{
                    label: 'Changes',
                    data: dataxx,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: false
                        }
                    }]
                }
            }
        });

    })
    .catch(error => {
        // handle the error
    });


}

function getextendedfr(url) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         // Typical action to be performed when the document is ready:
         // document.getElementById("demo").innerHTML = xhttp.responseText;
         extfr = JSON.parse(this.responseText);

      }
  };
  xhttp.open("GET", url, true);

  xhttp.send();
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

function doforecast() {
  var x = document.getElementById("nforecast").value;
  console.log(x);

  url = 'http://933842bc0d65.ngrok.io/predict/'
  urlextfr = 'http://933842bc0d65.ngrok.io/extended/'
  basegetdiffurl = 'http://933842bc0d65.ngrok.io/getdiff/'
  basetrendurl = 'http://933842bc0d65.ngrok.io/trendcalc/'

  var res = url.concat(x);
  var urlextfrx = urlextfr.concat(x);
  var getdiffurl = basegetdiffurl.concat(x);
  var gettrendurl = basetrendurl.concat(x);

  console.log(res);

  var result = httpGet(res);

  console.log(result);


  document.getElementById("SymbolTitle").innerHTML = x;

  document.getElementById("results").innerHTML = 'You are at the first ' + result;




  var datav2;
  var gt;

  fetch(urlextfrx)
  .then(response => response.json())
  .then(datav2 => dochart(datav2, gettrendurl));

  dodiffchart(getdiffurl)

  fetch(gettrendurl)
  .then(response => response.json())
  .then(datatrend => giveSignals(urlextfrx, datatrend));






}
