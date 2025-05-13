// utils/socket.ts
import { io, Socket } from "socket.io-client";

const URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:7000"; // Replace as needed

let socket: Socket;

export const getSocket = (): Socket => {
    if (!socket) {
        socket = io(URL);
    }
    return socket;
};
