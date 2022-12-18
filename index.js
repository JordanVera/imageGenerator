const express = require('express');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5555;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/openai', require('./routes/openaiRoutes'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
