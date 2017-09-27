$(document).ready(function() {
    document.addEventListener("deviceready", onDeviceReady, false);
});

function ret(){
  window.location.href="index.html"
}

var whoList = ['Bharatiya Janata Party(BJP)','Congress(Cong)','Aam Aadmi Party(AAP)', 'Communist Party of India Marxist(CPIM)'];
//Wholist takes value from html onclick, 0,1,2,3!
function vote(forwho){
  //forwho,uid,name
  var toServer = whoList[forwho] + '//' + localStorage.uid + '//' + localStorage.nameA;
  //alert(toServer);
    toServer = btoa(toServer);
    var urlV = "http://5.135.21.167/vote/" + toServer;
    var url = urlV;
        return $.ajax({
            type: "GET",
            url: url,
            timeout: 60 * 1000
        }).done(function (data) {
          navigator.notification.alert(
              'Vote has been casted. Returning to homescreen',  // message
              ret,  // callback
              'Alert',            // title
              'Done'              // buttonName
          );
        }).fail(function (a, b, c) {
            console.log(b + '|' + c);
        });

}

function onDeviceReady() {
     $('#scan').click( function()
        {
          cordova.plugins.barcodeScanner.scan(
          function (result) {
            var xmlQR = result.text;
            var nextQR = xmlQR.replace('<?xml version="1.0" encoding="UTF-8"?>','');
            var uidNumber = $(nextQR).filter('PrintLetterBarcodeData').attr('uid');
            var nameAdh = $(nextQR).filter('PrintLetterBarcodeData').attr('name');

            localStorage.uid = uidNumber;
            localStorage.nameA = nameAdh;

            if(uidNumber){
            navigator.notification.alert(
                'Adhaar voting session ready.',  // message
                callBackFunctionB,  // callback
                'Alert',            // title
                'Done'              // buttonName
            );


            document.body.innerHTML = '';
            document.body.innerHTML += "<div class='center' id='main'><h3>Cast your vote below</h3></div>";
            var iqq = document.getElementById('main');

            iqq.innerHTML += '<div id="voteCans">'+ '<p>Bharatiya Janata Party <img src="img/bjp.png" width="42" height="42"><input type="button" onclick="vote(0)" class="btn-primary" value="Vote" name="scanw" id="votew"/></p>' +'</div>';
            iqq.innerHTML += '<div id="voteCans">'+ '<p>Congress <img src="img/cong.jpg" width="42" height="42"><input type="button" onclick="vote(1)" class="btn-primary" value="Vote" name="scanw" id="votew"/></p>' +'</div>';
            iqq.innerHTML += '<div id="voteCans">'+ '<p>Aam Aadmi Party <img src="img/aap.jpg" width="42" height="42"><input type="button" onclick="vote(2)" class="btn-primary" value="Vote" name="scanw" id="votew"/></p>' +'</div>';
            iqq.innerHTML += '<div id="voteCans">'+ '<p>Communist party of india(Marxist) <img src="img/cpim.jpg" width="42" height="42"><input type="button" onclick="vote(3)" class="btn-primary" value="Vote" name="scanw" id="votew"/></p>' +'</div>';
            iqq.innerHTML += '<input onclick="ret();" type="button" class="btn-primary" value="Return to main screen" name="ret" id="ret"/>';

          }

  function callBackFunctionB(){
    console.log('ok');
}

          },
          function (error) {
              alert("Scanning failed: " + error);
          });
        }
     );
}
