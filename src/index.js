import Server from './server';
import SocketIo from 'socket.io';

const server = new Server();
const socket = SocketIo(server._server);

server.set("io", socket);

server.setPort();

server.run();