require('dotenv').config();
const express = require('express');
const cors = require('cors');
const usersRouter = require('./routers/usersRouter.js');

const app = express();
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

app.use('/users', usersRouter);

app.listen(process.env.PORT, () => {
    console.log('Your app is listening on port ' + process.env.PORT);
});