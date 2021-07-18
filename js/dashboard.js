function setCookie(key, value) {
            var expires = new Date();
            expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
            document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
        }

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
                    }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
                    }
                  }
                  return "";
}

function loaduser() {
  let ssid = sessionStorage.getItem('ssid');
  if (ssid == null) {
    document.getElementById("mySidebar").innerHTML = '';
    document.getElementById("pageC").innerHTML = 'Please Login';
  }
  else {
    console.log(ssid);
    var usernurl = 'http://detfladder.pythonanywhere.com/usern/' + ssid;
    fetch(usernurl)
    .then(response => response.json())
    .then(data => document.getElementById("username").innerHTML = data);

  }

}

function logout() {
  sessionStorage.removeItem('ssid');
  window.location.href = "login.html";

}

function doforecast() {
  var x = document.getElementById("vainaloca").value;


  url = 'https://ada-ai-forecast-sys.herokuapp.com/predict/'
  urlextfr = 'https://ada-ai-forecast-sys.herokuapp.com/extended/'
  basegetdiffurl = 'https://ada-ai-forecast-sys.herokuapp.com/getdiff/'
  basetrendurl = 'https://ada-ai-forecast-sys.herokuapp.com/trendcalc/'

  var res = url.concat(x);
  var urlextfrx = urlextfr.concat(x);
  var getdiffurl = basegetdiffurl.concat(x);
  var gettrendurl = basetrendurl.concat(x);


  var result = httpGet(res);



  document.getElementById("SymbolTitle").innerHTML = x;

  document.getElementById("results").innerHTML = 'You are at the first ' + result;
  document.getElementById("compa").style.opacity = "1.0";




  var datav2;
  var gt;

  fetch(urlextfrx)
  .then(response => response.json())
  .then(datav2 => dochart(datav2, gettrendurl));

  dodiffchart(getdiffurl)

  fetch(gettrendurl)
  .then(response => response.json())
  .then(datatrend => giveSignals(urlextfrx, datatrend));

  fetch(urlextfrx)
  .then(response => response.json())
  .then(datav2 => doeverychart(datav2, gettrendurl,'littleChart'));

}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function giveSignals(urldiff,datatrend) {

  fetch(urldiff)
    .then(response => response.json())
    .then(datadiff => {



      var table = document.createElement('table');
      document.getElementById('testBody').innerHTML = '';
      datatrend.forEach((item, i) => {
        var listContainer = document.getElementById('testBody');
        var tmptr;
      	var tmptd;
      	var tmplabel;
      	var tmpinput;
      	var tmptd2;
      	var tmptd3;
        var tmptd4;
        tmptr = document.createElement("tr");
	      tmptd = document.createElement("td");
        tmptd.setAttribute("class", "mdl-data-table__cell--non-numeric");
      	tmplabel = document.createElement("label");
      	tmplabel.setAttribute("class", "mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect mdl-data-table__select");
      	tmpinput = document.createElement("input");
      	tmpinput.setAttribute("class", "mdl-checkbox__input");
      	tmpinput.setAttribute("type", "checkbox");
      	tmptd2 = document.createElement("td");
      	tmptd2.setAttribute("class", "mdl-data-table__cell--non-numeric");
      	tmptd2.innerHTML = item;
      	tmptd3 = document.createElement("td");
      	tmptd3.setAttribute("class", "mdl-data-table__cell--non-numeric");
      	tmptd3.innerHTML = datadiff[i];
      	tmptd4 = document.createElement("td");
      	tmptd4.setAttribute("class", "mdl-data-table__cell--non-numeric");
      	tmptd4.innerHTML = datadiff[i+1];
        // connect new Elements into the "tr row" element
      	tmplabel.appendChild(tmpinput);
      	tmptd.appendChild(tmplabel);
      	tmptr.appendChild(tmptd);
      	tmptr.appendChild(tmptd2);
      	tmptr.appendChild(tmptd3);
        tmptr.appendChild(tmptd4);
      	// MDL promotions that re-attach events and styles
      	componentHandler.upgradeElement(tmpinput);
      	componentHandler.upgradeElement(tmplabel);
      	componentHandler.upgradeElement(tmptd);
      	componentHandler.upgradeElement(tmptd2);
      	componentHandler.upgradeElement(tmptd3);
        componentHandler.upgradeElement(tmptd4);
      	// Insert new elements into the DOM
      	listContainer.appendChild(tmptr);




      });






        // handle the response
    })
    .catch(error => {
        // handle the error
    });


}

function loadTableData(items) {
    const table = document.getElementById("testBody");
    items.forEach( item => {
      let row = table.insertRow();
      let date = row.insertCell(0);
      date.innerHTML = item.date;
      let name = row.insertCell(1);
      name.innerHTML = item.name;
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

function doeverychart(dataxx, url, shart) {

  var trends;

  fetch(url)
    .then(response => response.json())
    .then(trends => {
        // handle the response
        var ctx = document.getElementById(shart);
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: trends,
                datasets: [{
                    label: 'Signals',
                    data: dataxx,
                    backgroundColor: [
                        'rgba(52, 235, 164, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(52, 235, 164, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    pointStyle:'circle',
                    radius:6,
                    tension:0.1,
                    borderWidth: 3
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
