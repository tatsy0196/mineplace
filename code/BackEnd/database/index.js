const { Pool } = require('pg');
const config = require('../config');

const pool = new Pool(config.db_connexion);

module.exports = {
    query: (text, params = []) => {
        return new Promise(function(resolve, reject) {
            pool.query(text, params, (err, result) => {
                if(err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    },

}