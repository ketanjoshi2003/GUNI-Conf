import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_API_URL || undefined);

socket.on('connect', () => {
    console.log('Socket.IO connected:', socket.id);
    socket.emit('ping', { message: 'Is the server there?' });
});

socket.on('pong', (data) => {
    console.log('Received pong from server:', data);
});

socket.on('connect_error', (error) => {
    console.error('Socket.IO connection error:', error);
});

export default socket;
