const indexHtml = (isEmitter) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <script src="/socket.io/socket.io.js"></script>
    <style>
      body,
      html {
        background-color: black;
        color: wheat;
      }
    </style>
  </head>
  <body>
    <h1>Hello world</h1>
    <script>
      const socket = io();
      window.socket = socket;
      const id = Math.random();
      const event = 'open-tureng';

      ${isEmitter?`
      function emitt() {
        socket.emit('emit', { event, arg: { rn: Math.random() } });
      }
      `:`
      socket.on(event, (arg) => {
        console.log({ arg });
      });
      `}
    </script>
  </body>
</html>
`;

module.exports = indexHtml;
