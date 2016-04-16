import { _ } from 'lodash';
import { Router } from 'express';

import secrets from '../../secrets.json'

export default () => {
  const router = Router();
  const accessToken = secrets.accessToken;
  const verifyToken = secrets.verifyToken;

  router.get('/webhook', (req, res) => {
    // Check if facebook passes us the correct verify token.
    if (req.query['hub.verify_token'] === verifyToken) {
      res.send(req.query['hub.challenge']);
    } else {
      res.send('Error, wrong validation token!');
    }
  });

  router.post('/webhook', (req, res) => {
    // If facebook sends us an empty body, we just ignore it.
    if (!req.body || _.isEmpty(req.body)) {
      return res.sendStatus(204);
    }

    const events = req.body.entry;
    _.forEach(events, (event) => {
      const pageId = event.id;
      const timestamp = event.time;

      const messages = event.messaging;
      _.forEach(messages, (message) => {
        const senderId = message.sender.id;

        const contents = message.message;
        if (contents && contents.text) {
          console.log(contents.text);
        }
      });
    });
  });

  return router;
}