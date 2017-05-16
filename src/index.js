import Server from './server';
import SocketIo from 'socket.io';
import path from 'path';

const server = new Server();
const socket = SocketIo(server._server);

server.setSocket("io", socket);
server.setPort();

server.setScraper(path.join(__dirname, "../src/config/config.yml"));

server.getSocket().on("toto", () => console.log("toto is here"));

server.run();