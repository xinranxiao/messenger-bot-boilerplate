import request from 'request';

import secrets from '../../secrets.json'

export function sendTextMessage(recipient, text) {
  const messageData = {
    text: text
  };

  request.post({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: secrets.accessToken },
    json: {
      recipient: { id: recipient },
      message: messageData
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
}
