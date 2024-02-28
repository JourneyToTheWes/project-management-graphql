const express = require('express');
require('dotenv').config();
const port = process.env.port || 5000;

const app = express();

app.listen(port, console.log(`Server running on port: ${port}`));