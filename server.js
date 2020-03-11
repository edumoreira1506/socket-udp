const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('message', (message, rinfo) => {
  console.log(`server got: ${message} from ${rinfo.address}:${rinfo.port}`);

  const randomNumber = getRandomNumber();
  const messageToClient = Buffer.from(`Your number is ${randomNumber}`);

  server.send(messageToClient, rinfo.port, 'localhost', error => {
    if (error) {
      console.log(error);
      server.close();
    } else {
      console.log(`${randomNumber} sent!`)
    }
  });
});

const getRandomNumber = () => {
  const numbers = [ 1,2,3,4,5,6 ];
  const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];

  return randomNumber;
}

server.on('listening', () => {
  const { address, port } = server.address();

  console.log(`server listening ${address}:${port}`);
});

server.bind(41234);