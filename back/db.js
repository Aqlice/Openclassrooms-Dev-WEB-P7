require('dotenv').config()

    const mysql = require('mysql2');

    const db = mysql.createConnection({
        host     : `${process.env.DB_HOST}`,
        user     : `${process.env.USERTY}`,
        password : `${process.env.PASSWORD}`,  
        database: `${process.env.DATABASE}`
        
    }
    );
    
    db.connect((err) => {
        
        if (err) {
            console.log(err);
            return console.error('error connecting: ' + err.stack);
        }
        console.log('Mysql connected');  
    });
    
    module.exports.getDB = () => {
        return db
    }