/* captura os elementos do formulario criados no html pelo id correto */
const form = document.getElementById('formLogin');
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');

/* escuta o evento de envio do formulario para fazer a conexao assincrona com a api */
form.addEventListener('submit', async (e) => {
  e.preventDefault(); /* impede o recarregamento automatico da pagina */

  /* limpa os espacos em branco do email e captura o valor digitado da senha */
  const email = emailInput.value.trim();
  const senha = senhaInput.value;

  /* validacao simples de seguranca para garantir que nenhum campo chegue vazio no servidor */
  if (!email || !senha) {
    alert('por favor, preencha todos os campos.');
    return;
  }

  try {
    /* inicia a tentativa de comunicacao com a api local de login via post */
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }),
    });

    /* transforma a resposta vinda do servidor em formato json legivel */
    const data = await response.json();

    /* se o servidor responder com status de sucesso (entre 200 e 299) */
    if (response.ok) {
      /* guarda os dados do tutor logado na memoria local do navegador */
      localStorage.setItem('usuarioLogado', JSON.stringify(data.usuario));
      alert(data.message);
      /* redireciona o cliente para o painel exclusivo da pet boutique */
      window.location.href = '../dashboard/index.html';
    } else {
      /* exibe a mensagem de erro customizada enviada pela api */
      alert(data.message);
    }
  } catch (error) {
    /* registra o erro detalhado no painel de desenvolvedor do navegador */
    console.error('erro na requisicao:', error);
    alert('nao foi possivel conectar ao servidor de alto padrao.');
  }
});
