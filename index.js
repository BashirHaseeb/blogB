const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDB = require("./config/db");
const userR = require('./Routes/User')


const app = express();
const PORT = 5000;

// Middleware to parse JSON requests

const corsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = [
            'https://bashirblogs.vercel.app',
            'http://localhost:3000'
        ]; // List of allowed origins
        if (!origin || allowedOrigins.includes(origin)) {
            // Allow requests with a valid origin or no origin (e.g., server-side requests)
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
    credentials: true, // Allow cookies and credentials
};


app.use(cors(corsOptions));

app.use(express.json());

connectDB();

app.use('/user', userR)
app.get("/", (req, res) => {
    res.status(200).json({ message: "Done" });
});

app.options('*', cors(corsOptions));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
