// Simple test script to verify the service works
const http = require('http');
const { exec } = require('child_process');

console.log('Testing Media Utilities Service...');

// Test with a valid input
const testInput = '2023a test file S01E02(2022) ';

console.log('\n1. Testing with valid input:');
console.log(`Input: ${testInput}`);

// Start the server and test it
exec('npm start', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error starting server: ${error}`);
        return;
    }

    console.log('Server started successfully');
    console.log('Server output:', stdout);

    // Test the endpoint with a simple HTTP request
    const postData = JSON.stringify({
        inputString: testInput
    });

    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/mucParseTitleInput',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    const req = http.request(options, (res) => {
        console.log(`Status: ${res.statusCode}`);
        res.on('data', (chunk) => {
            console.log(`Response: ${chunk}`);
        });
    });

    req.on('error', (e) => {
        console.error(`Problem with request: ${e.message}`);
    });

    req.write(postData);
    req.end();
});