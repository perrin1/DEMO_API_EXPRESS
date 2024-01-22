const mongoose = require('mongoose');

const conectDb = async ()=>{
    try {
        const connect = await mongoose.connect(process.env.CONECTION_STRING);
        console.log("connection établis ", connect.connection.host, connect.connection.name  );
    } catch (err) {
        console.log(err);
        process.exit(1);
        
    }
};

module.exports = conectDb;

