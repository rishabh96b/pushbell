var express = require("express");
var admin = require("firebase-admin");

var serviceAccount = "tester-xxxxx-firebase-adminsdk-xxxx-xxxxxxxx.json";
//initializing the firebase admin instance with provided credentials.
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "YOUR_DB_URL"
  });

var app = express();
//Creating the route to get the registration token value from the client.
app.get('/:token', function(req, resp){
    var token = req.params.token.token
    console.debug(token)
    
    var payload = {
        notification: {
          title: "FIREBASE POC",
          body: "An awesome firebase project!"
        }
      };
    
    //Setting the notification priority to be high and the ttl 24hrs.
    var options = {
        priority: "high",
        timeToLive: 60 * 60 *24
      };
    
    //Waiting for some time to send the push notification to the client.
    setTimeout (()=>{},4000)
    //Sending the push notification to the client.
    admin.messaging().sendToDevice(registrationToken, payload, options)
      .then(function(response) {
        console.log("Successfully sent message:", response);
      })
      .catch(function(error) {
        console.log("Error sending message:", error);
      });
})


//Listening to the request at port 8000.
app.listen(8800, () => console.log(`Example app listening on port 8800!`))
