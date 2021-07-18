function login() {
    var x , y;

    // Get the value of the input field with id="numb"
    x = document.getElementById("user").value;
    y = document.getElementById("pass").value;

    var token = "user=%&pass=$"
    var credentialx = token.replace('%',x);
    var credential = credentialx.replace('$',y);


    //document.getElementById("demo").innerHTML = credential;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {

      var res = JSON.parse(this.responseText);
      console.log(res);


      if (res == 'fail'){
        document.getElementById("demo").innerHTML = 'Wrong password or username';

      } else {
        document.getElementById("demo").innerHTML = 'Succesfully Logged in';
        var cookiephrase = 'ssid=';
        var ssidcookie = cookiephrase + res;
        sessionStorage.setItem('ssid',res);
        window.location.href = "dashboard.html";
      }

      }
    };
    xhttp.open("POST", "http://detfladder.pythonanywhere.com/auth", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send(credential);

}

function setCookie(key, value) {
            var expires = new Date();
            expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
            document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
        }
