require('dotenv').config();
const express = require('express');

const app = express();

app.get('/', (request, response) => {
    response.json({ successfull: true });
});

app.listen(process.env.PORT, () => {
    console.log('Your app is listening on port ' + process.env.PORT);
});