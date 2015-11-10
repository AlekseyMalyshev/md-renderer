'use strict';

let marked = require('marked');

module.exports = (req, res) => {
  if (!req.body || !req.body.string) {
    res.status(200);
  }

  marked(req.body.string, (err, content) => {
    if (err) {
      res.status(400);
    }
    else {
      res.send(content);
    }
  });
}
