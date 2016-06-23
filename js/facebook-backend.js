var moment = require('moment');
var appid = require('./../.env').appid;
var writeUserData = require("./../js/firebase.js").writeUserData;
var checkUser = require("./../js/firebase.js").checkUser;
function statusChangeCallback(response, display, displaypic) {
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        getinfo(response, display, displaypic);
    } else if (response.status === 'not_authorized') {

    } else {

    }

  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  exports.checkLoginState = function(display, displaypic) {
    FB.getLoginStatus(function(response) {
      console.log(response);
      if(response.status === "unknown") {
        location.reload();
      }
      statusChangeCallback(response, display, displaypic);
    });
  };
  function getpic(response, accessToken, displaypic){
    console.log(response.id);
    FB.api(
      '/' + response.id + '/picture',
      'GET',
      {"type":"large"},
      function(response) {
        displaypic(response);
      }
  );
  }

  function getinfo(response, display, displaypic){
    var accessToken = response.authResponse.accessToken;
    FB.api(
      '/me',
      'GET',
      {"fields":"id,name,birthday,email,first_name,last_name"},
      function(response) {
          $("#id").val(response.id);
          checkUser(response, display, accessToken, displaypic, getpic, writeUserData);
      }
    );
  }
  window.fbAsyncInit = function() {
  FB.init({
    appId      : appid,
    cookie     : true,  // enable cookies to allow the server to access
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.6' // use graph api version 2.5
  });

}
