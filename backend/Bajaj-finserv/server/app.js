const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

const USER_ID = "john_doe_17091999";
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";

app.post('/bfhl', (req, res) => {
    console.log("Received data:", req.body);  // Logging received data for debugging
    const data = req.body.data;
    if (!data) {
        return res.status(400).json({ is_success: false, message: "No data provided" });
    }
    if (!Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: "Data is not an array" });
    }

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const lowerCaseAlphabets = alphabets.filter(char => char === char.toLowerCase());
    const highestLowerCase = lowerCaseAlphabets.sort().reverse()[0] || null;

    return res.status(200).json({
        is_success: true,
        user_id: USER_ID,
        email: EMAIL,
        roll_number: ROLL_NUMBER,
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowerCase ? [highestLowerCase] : []
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
