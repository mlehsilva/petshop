/* importa o modulo do mysql2 para conexao com bancos relacionais */
const mysql = require('mysql2');

/* cria um pool de conexoes configurado para a porta padrao 3306 */
const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',          /* altere para o seu usuario se necessario */
  password: 'suasenha',   /* altere para a senha do seu banco de dados */
  database: 'oliva_co',   /* nome do banco de dados que criaremos */
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

/* exporta o pool usando o formato de promessas para permitir codigos assincronos mais limpos */
module.exports = pool.promise();
