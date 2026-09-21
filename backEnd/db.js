/* importa o modulo do mysql2 para conexao com bancos relacionais */
const mysql = require('mysql2');

/* cria um pool de conexoes configurado para a porta padrao 3306 */
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost', /* Usa 'db' no Docker ou 'localhost' na máquina */
  port: 3306,
  user: 'root',          
  password: 'suasenha',   
  database: 'oliva_co',   
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

/* exporta o pool usando o formato de promessas para permitir codigos assincronos mais limpos */
module.exports = pool.promise();
