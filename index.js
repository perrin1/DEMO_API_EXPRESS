const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const conectDb = require('./config/db');
const dotenv = require('dotenv').config();

const app = express();
const port = process.env.PORT|| 5000;


conectDb()

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/contacts", require("./routes/contactRoutes") );
app.use("/api/users", require("./routes/userRoutes") );
app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`ecoute sur le port sur le port ${port}`);
});
