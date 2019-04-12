const dialogflow = require('dialogflow');
const uuid = require('uuid');
/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} 'testagent-161cb' The project to be used
 */
async function runSample(textMessage) {
  // A unique identifier for the given session
  const sessionId = uuid.v4();
 
  // Create a new session
  const sessionClient = new dialogflow.SessionsClient();
  const sessionPath = sessionClient.sessionPath('testagent-161cb', sessionId);
 
  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: textMessage,
        // The language used by the client (en-US)
        languageCode: 'en-US',
      },
    },
  };
 
  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log("Detected intent");
  const result = responses[0].queryResult;
  console.log(`Query: ${result.queryText}`);
  console.log(`Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`Intent: ${result.intent.displayName}`);
    return result.fulfillmentText;
  } else {
    console.log("No intent matched.");
    return "No intent matched";
  }
}

    // runSample("Hi").then(function(resp) {
    //     console.log("resp--->>",resp);
    // }).catch(function(errr) {
    //     console.log("errr---->>>", errr);
    // })

    exports.dialogChat = function(socket) {
      console.log("socket connected");
      socket.emit('reply-message', {name:"Agent", message:"Hi there, How may I help you?"});

        socket.on('new-message', (message) => {
            console.log(message);
            runSample(message).then(function(resp) {
                console.log("resp--->>", resp);
                let obj = {
                  name: "Agent",
                  message: resp
                }
                socket.emit('reply-message', obj);
            }).catch(function(errr) {
                console.log("errr---->>>", errr);
            })
            
        });
    }