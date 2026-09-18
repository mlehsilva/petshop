/* importa os modulos necessarios para construir a api */
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

/* permite que o seu html acesse esta api de forma segura */
app.use(cors());

/* configura o express para ler e entender dados enviados em formato json */
app.use(express.json());

/* rota criada para receber as solicitacoes de cadastro exclusivo */
app.post('/api/cadastro', async (req, res) => {
    const { nomeTutor, nomePet, raca, genero, peso, idade, email, senha } = req.body;

    /* validacao completa para garantir que nenhum campo chegue vazio */
    if (!nomeTutor || !nomePet || !raca || !genero || peso === undefined || idade === undefined || !email || !senha) {
        return res.status(400).json({ message: 'todos os campos sao obrigatorios.' });
    }

    try {
        /* verifica usando sql se o e-mail do tutor ja existe na tabela */
        const [usuariosExistentes] = await db.query('SELECT id FROM usuarios WHERE email = ?', [email]);
        
        if (usuariosExistentes.length > 0) {
            return res.status(400).json({ message: 'este e-mail ja esta cadastrado em nossa boutique.' });
        }

        /* insere o novo perfil premium de cliente com a ficha do pet usando insert do sql */
        const queryInsert = `
            INSERT INTO usuarios (nomeTutor, nomePet, raca, genero, peso, idade, email, senha) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        await db.query(queryInsert, [nomeTutor, nomePet, raca, genero, peso, idade, email, senha]);

        return res.status(201).json({ message: 'cadastro realizado com sucesso! o perfil do seu pet foi salvo.' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'erro interno no banco de dados do servidor.' });
    }
});

/* rota de login adaptada para consultas relacionais do mysql */
app.post('/api/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        /* busca um usuario que tenha exatamente o e-mail e a senha enviados */
        const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ? AND senha = ?', [email, senha]);

        /* se a busca nao retornar nenhuma linha valida */
        if (rows.length === 0) {
            return res.status(401).json({ message: 'e-mail ou senha incorretos para este espaço exclusivo.' });
        }

        const usuario = rows[0];

        /* se der certo, responde enviando a ficha cadastral completa do mysql */
        return res.status(200).json({
            message: `bem-vindo de volta à oliva & co., ${usuario.nomeTutor}!`,
            usuario: {
                id: usuario.id,
                nomeTutor: usuario.nomeTutor,
                nomePet: usuario.nomePet,
                raca: usuario.raca,
                genero: usuario.genero,
                peso: usuario.peso,
                idade: usuario.idade,
                email: usuario.email
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'erro interno no servidor.' });
    }
});

/* inicia o servidor de alto padrao na porta de rede 3000 */
const porta = 3000;
app.listen(porta, () => {
    console.log(`servidor rodando com sucesso em http://localhost:${porta}`);
});
