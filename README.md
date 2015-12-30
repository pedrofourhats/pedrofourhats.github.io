# Auth0 Rules Application

This application gathers all your rules through an API call (see https://auth0.com/docs/api/v2) and identifies which rule is validated in which application. 
For this to work you will have to add at the very top of each of your rules script a line like this: "//Applications:appname1,appname2,appname3;" where appname1, appname2 and appname3 are the names of the applications which that rule applies. Your rule code should look something like this:
'''''
function (user, context, callback) {
  //Applications:app1,app2,app3,app4;

  if (context.clientName === 'TheAppToCheckAccessTo') {
    var d = new Date().getDay();

    if (d === 0 || d === 6) {
      return callback(new UnauthorizedError('This app is available during the week'));
    }
  }

  callback(null, user, context);
}
''


You will also need to update the auth0-variables.js variables for this to work. 

## Running the example

In order to run the example you need to just start a server. What we suggest is doing the following:

1. Install node
2. run `npm install -g serve`
3. run `serve` in the directory of this project.

Go to `http://localhost:3000` and you'll see the app running :).
