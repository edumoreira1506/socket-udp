const dgram = require('dgram');
const client = dgram.createSocket('udp4');

const message = Buffer.from('Send me a random number!');

client.connect(41234, 'localhost', () => client.send(message));

client.on('message', (message, remote) => {
  console.log(remote.address + ':' + remote.port +' - ' + message);
});
