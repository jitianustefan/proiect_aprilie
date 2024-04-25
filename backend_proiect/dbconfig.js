const config = {
    user : 'stefan',
    password: '0000',
    server: 'localhost',
    database: 'service_auto_js',
    options: {
        trustedconnection: true,
        trustServerCertificate: true,
        //enableArithAort: true,
        instancename: 'SQLEXPRESS',
        
    },
    port : 1433
}

module.exports = config;