$(document).ready(function() {
	var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ0VXE3cTZNNEp6S2R1a2h5eTVUbU0zRTZ2cVRVN3NBMCIsInNjb3BlcyI6eyJjbGllbnRzIjp7ImFjdGlvbnMiOlsicmVhZCJdfSwicnVsZXMiOnsiYWN0aW9ucyI6WyJyZWFkIl19fSwiaWF0IjoxNDUxMzUwODIwLCJqdGkiOiJiNWE4YTI3ZjA1ZjQyYjg3ODk0OGU5NDA4MzkwOTNjNiJ9.j6xZc0VbfXa_VIkBjbbhJgSX_ApEVm6CQA19o4i7ppY";
    var lock = new Auth0Lock(
      // All these properties are set in auth0-variables.js
      AUTH0_CLIENT_ID,
      AUTH0_DOMAIN
    );

    var userProfile;

    $('.btn-login').click(function(e) {
      e.preventDefault();
      lock.showSignin(function(err, profile, token) {
        if (err) {
          // Error callback
          console.log("There was an error");
          alert("There was an error logging in");
        } else {
          // Success calback
		  $('.login-box').hide();
		  $('.logged-in-box').show();
		  $.ajax({
			url: 'https://pedroalessandri.auth0.com/api/v2/rules',
			method: 'GET'
		  }).then(function(data, textStatus, jqXHR) {
			writeRules(data);
		  }, function() {
			alert("You need to download the server seed and start it to call this API");
		  });
        }
      });
    });

    $.ajaxSetup({
      'beforeSend': function(xhr) {
        if (localStorage.getItem('userToken')) {
          xhr.setRequestHeader('Authorization',
                'Bearer ' + token);
        }
      }
    });
	
	function writeRules(allRules) {
		allRules.forEach(function(rule) {
		applications = rule.script.substring(rule.script.search("Applications") + 13, rule.script.search(";"));
		var applications = applications.split(',');
  	    var dataContent = document.getElementById('dataContent');
		dataContent.innerHTML = dataContent.innerHTML + "<h4>Rule name: " + rule.name + "<h4><br>";
		applications.forEach(function(application) {
			dataContent.innerHTML = dataContent.innerHTML + "<p>" + application + "</p><br>"
		});
		});
};




});
