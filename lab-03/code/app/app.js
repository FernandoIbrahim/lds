const express = require('express')
const PORT = 3000;

const app = express();

app.use('/', (req, res) => {
    res.status(200).json('oi');
})


app.listen(PORT);