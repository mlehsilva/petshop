# oliva & co. - haute couture pour animaux ✦

este é o ecossistema completo de uma aplicação de alto padrão para gerenciamento de banho, tosa e cuidados exclusivos de pets. o projeto possui um front-end moderno, elegante e sofisticado (com paleta em verde-oliva claro, bege e marrom couro) e um back-end integrado a um banco de dados relacional mysql rodando em um container docker.

---

## 📂 estrutura de pastas do projeto

o projeto está organizado de forma limpa e modular:

```text
├── docker-compose.yml       # configuracao do container mysql global
├── backEnd/                 # api rest em node.js e express
│   ├── db.js                # conexao e pool com o mysql2
│   ├── server.js            # rotas e logica de cadastro/login
│   ├── package.json         # dependencias do backend
│   └── usuarios.db          # (remova se existir o arquivo antigo do nedb)
└── frontEnd/                # interfaces visuais da boutique
    ├── index.html           # tela de entrada principal (landing page)
    ├── home-style.css       # estilo da tela de entrada
    ├── dashboard.html       # painel privado do tutor logado
    ├── dashboard-style.css  # estilo do painel privado
    ├── cadastro/            # modulo de novos membros
    │   ├── index.html       # formulario com ficha completa do pet
    │   └── style.css        # estilo do formulario
    └── login/               # modulo de acesso de clientes
        ├── index.html       # formulario de autenticacao
        └── style.css        # estilo do login
```

---

## 🚀 pré-requisitos essenciais

antes de iniciar, certifique-se de ter instalado em sua máquina:
1. **node.js** (versao lts recomendada)
2. **docker desktop** (com suporte a docker-compose)
3. **dbeaver** (ou qualquer gerenciador de banco de dados mysql)

---

## 🛠️ passo a passo para rodar a aplicação

### 1. subir o banco de dados no docker
abra o terminal na raiz do projeto (onde está o arquivo `docker-compose.yml`) e execute o comando:
```bash
docker-compose up -d
```
*abra o seu docker desktop para confirmar que o grupo de containers do mysql está ativo na porta 3306.*

### 2. estruturar a tabela no dbeaver
1. abra o **dbeaver** e crie uma nova conexao **mysql**.
2. insira as credenciais básicas do seu `docker-compose.yml`:
   - **host:** `localhost`
   - **port:** `3306`
   - **database:** `oliva_co`
   - **username:** `root`
   - **password:** `suasenha`
3. abra o console sql no dbeaver, cole e execute o script abaixo para criar a tabela de membros premium:

```sql
use oliva_co;

create table if not exists usuarios (
  id int auto_increment primary key,
  nomeTutor varchar(255) not null,
  nomePet varchar(255) not null,
  raca varchar(100) not null,
  genero char(1) not null,
  peso decimal(5,2) not null,
  idade int not null,
  email varchar(255) unique not null,
  senha varchar(255) not null
);
```

### 3. inicializar o servidor backend
1. no terminal, navegue até a pasta do servidor:
   ```bash
   cd backEnd
   ```
2. instale todas as dependências declaradas no `package.json`:
   ```bash
   npm install
   ```
3. inicie o servidor da boutique:
   ```bash
   npm start
   ```
*o terminal exibirá a confirmacao: `servidor rodando com sucesso em http://localhost:3000`.*

### 4. acessar a interface visual (front-end)
basta abrir o arquivo `frontEnd/index.html` diretamente em seu navegador web para navegar pela experiência da **oliva & co.** e testar os fluxos de cadastro e login.

---

## 🎨 identidade visual e conceitos utilizados
- **verde-oliva claro (#708264):** evoca tranquilidade, frescor, banho terapêutico e cuidado consciente.
- **marrom couro (#5C4033):** transmite tradição, solidez, segurança e o acabamento artesanal de alto padrão.
- **bege claro (#F9F6F0):** simula papéis acetinados e ambientes de spa limpos e minimalistas.
- **tipografia:** combinacao entre a clássica *playfair display* para títulos institucionais e a legível *plus jakarta sans* para dados de formulários.
