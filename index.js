const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const PORT = process.env.PORT || 5555;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan('dev'));
app.use(cors());

app.use('/openai', require('./api/routes/openaiRoutes'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
