const express = require('express');
const app = express();
const cors = require('cors')

res.header("Access-Control-Allow-Origin", "*");
app.use(cors({origin: true, credentials: true}));

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//     next();
//   })