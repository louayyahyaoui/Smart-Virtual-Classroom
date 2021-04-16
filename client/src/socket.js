import io from "socket.io-client";

const ENDPOINT = "https://closer-server.herokuapp.com/";
// const sockets = io('http://localhost:3001', { autoConnect: true, forceNew: true });
const sockets = io(ENDPOINT);
export default sockets;
