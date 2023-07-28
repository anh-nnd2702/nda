const fs = require('fs');

const dbconfig = {
    host: 'datn.mysql.database.azure.com',
    dialect: 'mysql',
    port: 3306,
    user: 'nda',
    password: 'cnoGJC76',
    database:'ndajobv2',
    ssl: {
        ca: fs.readFileSync('./DigiCertGlobalRootCA.crt.pem')
    }
};

/*
const dbconfig = {
    host:"localhost",
    user:"root",
    port: 3306,
    password:"1234",
    database:"ndajobv2"
}*/
module.exports = dbconfig;
