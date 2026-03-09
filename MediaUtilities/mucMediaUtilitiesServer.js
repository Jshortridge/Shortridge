const express = require('express');
const cors = require('cors');

const mucParseTitleInput = require('./Common/mucParseTitleInput');
const mucParseTitleInputURL = '/mucParseTitleInput';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Media Utilities service is running' });
});

// Parse title endpoint
app.post(mucParseTitleInputURL, (req, res) => {
    try {
        const { inputString } = req.body;

        if (!inputString) {
            return res.status(400).json({
                error: 'Input string is required',
                status: 400
            });
        }

        const result = mucParseTitleInput(inputString);
        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        // Handle the specific error codes from our function
        if (error.ErrorCode) {
            res.status(error.status || 400).json({
                error: error.message,
                errorCode: error.ErrorCode,
                status: error.status || 400
            });
        } else {
            // Handle unexpected errors
            res.status(500).json({
                error: 'Internal server error',
                status: 500
            });
        }
    }
});

// Parse title endpoint with GET method for testing
app.get(mucParseTitleInputURL, (req, res) => {
    try {
        const { inputString } = req.query;

        if (!inputString) {
            return res.status(400).json({
                error: 'Input string is required',
                status: 400
            });
        }

        const result = mucParseTitleInput(inputString);
        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        // Handle the specific error codes from our function
        if (error.ErrorCode) {
            res.status(error.status || 400).json({
                error: error.message,
                errorCode: error.ErrorCode,
                status: error.status || 400
            });
        } else {
            // Handle unexpected errors
            res.status(500).json({
                error: 'Internal server error',
                status: 500
            });
        }
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Media Utilities service running on port ${PORT}`);
});

module.exports = app;