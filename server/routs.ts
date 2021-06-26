import * as express from 'express';

const app = express.Router();

export {app as routes};

app.get('/score', function(req, res) {
  res.json({score: 0, id: 'VET'})
});





