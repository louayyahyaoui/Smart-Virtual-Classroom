import io from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:5000";
// const sockets = io('http://localhost:3001', { autoConnect: true, forceNew: true });
const sockets = io(ENDPOINT);
export default sockets;
