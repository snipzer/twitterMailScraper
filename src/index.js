import Server from './server';
import SocketIo from 'socket.io';

const server = new Server();
const socket = new SocketIo(server);

server.setPort();



server.run();