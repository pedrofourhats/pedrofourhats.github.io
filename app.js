$(document).ready(function() {
	var rulesToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ0VXE3cTZNNEp6S2R1a2h5eTVUbU0zRTZ2cVRVN3NBMCIsInNjb3BlcyI6eyJydWxlcyI6eyJhY3Rpb25zIjpbInJlYWQiXX0sInVzZXJzIjp7ImFjdGlvbnMiOlsicmVhZCJdfX0sImlhdCI6MTQ1MTM1NTIxNSwianRpIjoiZTdhYmQyNzFiNGE3MjY0OGJlNDNhMWQ1YzBjNmY3YTkifQ.UIS1SA57mf_FN85cmVMMjC4Lgh9sQq6UxCDLubsWOyg";
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
		  }, function(error) {
			alert("You need to download the server seed and start it to call this API");
		  });
        }
      });
    });

    $.ajaxSetup({
      'beforeSend': function(xhr) {
        if (localStorage.getItem('userToken')) {
          xhr.setRequestHeader('Authorization',
                'Bearer ' + rulesToken);
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
			dataContent.innerHTML = dataContent.innerHTML + "<p>" + application + "</p>"
		});
		});
	};




});
