const express = require('express');
const fs = require('fs');
const app = express();
const port = 4000;

app.use(express.json());



// Welcome message
app.get('/', (req, res) => {
    res.send('Welcome to the Express server!');
});

// GET API
app.get('/api/:id', (req, res) => {
    const pathParam = req.params.id; // Path parameter
    const queryParam = req.query.value; // Query parameter

    res.json({
        message: "GET request received successfully!",
        details: {
            description: "You have accessed the GET API.",
            pathParameter: pathParam,
            queryParameter: queryParam
        },
        note: "Use the path parameter to identify the resource, and the query parameter for additional filtering."
    });
});


// POST API
app.post('/api/data', (req, res) => {
    const data = req.body; // Incoming data
    fs.readFile('data.json', (err, fileData) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ message: 'Error reading data file' });
        }
        // Parse the existing data or initialize an empty array
        let jsonData;
        try {
            jsonData = fileData.length > 0 ? JSON.parse(fileData) : [];
        } catch (parseError) {
            console.error('Error parsing JSON data:', parseError);
            return res.status(500).json({ message: 'Error parsing existing data' });
        }
        // Add the new data
        jsonData.push(data);
        fs.writeFile('data.json', JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).json({ message: 'Error saving data' });
            }
            console.log('Data successfully saved:', jsonData);
            res.json({
                message: 'POST request successful, data saved to file',
                data: jsonData,
            });
        });
    });
});
    


// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
