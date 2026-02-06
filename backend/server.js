const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');

const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

dotenv.config();

const app = express();
const server = http.createServer(app);

// Relaxed CORS for development to prevent connection issues
const allowedOrigins = [
    process.env.CLIENT_URL || 'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:5174', // Sometimes Vite uses next available port
];

const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        methods: ['GET', 'POST'],
        credentials: true
    }
});

console.log('Socket.IO initialized');

const PORT = process.env.PORT || 5000;

// Attach io to app to use in routes
app.set('io', io);

// Security Middleware
app.use(helmet());
app.use(compression());

// CORS Configuration
const corsOptions = {
    origin: allowedOrigins,
    optionsSuccessStatus: 200,
    credentials: true
};
app.use(cors(corsOptions));

// Rate Limiting - Increased for development/testing
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 1000, // 1000 requests per minute
    message: 'Too many requests from this IP, please try again after a minute'
});
app.use(limiter);

app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/guni_conf')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Routes
const conferenceRoutes = require('./routes/conferenceRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/api/conference', conferenceRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Socket.io Connection
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('ping', (data) => {
        console.log('Received ping from client:', socket.id, data);
        socket.emit('pong', { reply: 'Server is alive', time: new Date() });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

