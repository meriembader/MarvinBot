const chatbot=require('../chatbot/chatbot');

module.exports = app => {


    app.get('/', (req, res) => {
        res.send({ "name": "Hello Biswa" });
    });

    app.post('/api/df_text_query', async (req, res) => {
        /*const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    // The query to send to the dialogflow agent
                    text: req.body.text,
                    // The language used by the client (en-US)
                    languageCode: config.dialogFlowSessionLanguageCode,
                },
            },
        };*/
        /*sessionClient.
            detectIntent(request)
            .then(responses => {
                console.log('Detected intent');
                const result = responses[0].queryResult;
                console.log(`  Query: ${result.queryText}`);
                console.log(`  Response: ${result.fulfillmentText}`);
                if (result.intent) {
                    console.log(`  Intent: ${result.intent.displayName}`);
                } else {
                    console.log(`  No intent matched.`);
                }
            })
            .catch(error=>{
                console.log("Error:",error);
            })*/
        let responses=await chatbot.textQuery(req.body.text,req.body.userID,req.body.parameters);
        res.send(responses[0].queryResult);
    });

    app.post('/api/df_event_query',  async (req, res) => {
        let responses=await chatbot.eventQuery(req.body.event,req.body.userID,req.body.parameters);
        res.send(responses[0].queryResult);
    });
}