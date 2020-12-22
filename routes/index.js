var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

/* GET home page. */
router.post('/', function(req, res, next) {
  let fetchResponse;

  //Input text from chatBot
  const text = req.body.text;
  let data = {
    query: text
  }

  //Output response format for chatux
  const response = {
    output: []
  };

  //send inputtext to backend and get response from dialogflow
  fetch('http://ec2-18-219-239-180.us-east-2.compute.amazonaws.com/api/get-diag-res', { 
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json()) // expecting a json response
    .then(json => {

      fetchResponse = json.fulfillmentText || "Bot is in Learning Mode!";

      const msg = response.output;

      msg.push({
        type: 'text',
        value: fetchResponse || null
      });
      
      //send output
      res.json(response);

    });
});

module.exports = router;
