/* escuta o momento exato em que o usuario tenta enviar o formulario */
document.getElementById('formCadastro').addEventListener('submit', async function(event) {
    event.preventDefault(); /* impede o recarregamento automatico da pagina */

    /* captura de todas as informacoes inseridas dentro dos inputs atualizados */
    const nomeTutor = document.getElementById('nomeTutor');
    const nomePet = document.getElementById('nomePet');
    const raca = document.getElementById('raca');
    const genero = document.getElementById('genero');
    const peso = document.getElementById('peso');
    const idade = document.getElementById('idade');
    const email = document.getElementById('email');
    const senha = document.getElementById('senha');

    /* variavel de controle para descobrir se o formulario inteiro esta correto */
    let isValid = true;

    /* funcao inteligente que adiciona ou remove os alertas visuais de erro */
    function verificarCampo(campo, condicao) {
        const group = campo.parentElement; /* pega o bloco pai do input atual */
        if (condicao) {
            group.classList.remove('invalid'); /* se estiver correto remove o visual de erro */
        } else {
            group.classList.add('invalid'); /* se estiver errado injeta a classe css de erro */
            isValid = false; /* desmarca a aprovacao geral do formulario */
        }
    }

    /* blocos de testes logicos para validacao dos novos dados fornecidos */
    verificarCampo(nomeTutor, nomeTutor.value.trim().length >= 3);
    verificarCampo(nomePet, nomePet.value.trim().length >= 1);
    verificarCampo(raca, raca.value.trim().length >= 2);
    verificarCampo(genero, genero.value !== "");
    verificarCampo(peso, peso.value > 0);
    verificarCampo(idade, idade.value.trim() !== "" && idade.value >= 0);
    verificarCampo(email, email.value.includes('@') && email.value.includes('.'));
    verificarCampo(senha, senha.value.length >= 6);

    /* se todas as verificacoes acima passarem com sucesso inicia a comunicacao com o servidor */
    if (isValid) {
        const btn = document.querySelector('.btn-submit');
        btn.textContent = "Processando Convite...";
        btn.style.opacity = "0.7";
        btn.disabled = true; /* desativa cliques repetidos */

        try {
            /* faz o envio real dos dados estruturados para a api do seu backend */
            const response = await fetch('http://localhost:3000/api/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nomeTutor: nomeTutor.value.trim(),
                    nomePet: nomePet.value.trim(),
                    raca: raca.value.trim(),
                    genero: genero.value,
                    peso: parseFloat(peso.value),
                    idade: parseInt(idade.value),
                    email: email.value.trim(),
                    senha: senha.value
                }),
            });

            const data = await response.json();

            /* verifica se o servidor processou e salvou o cadastro com sucesso */
            if (response.ok) {
                alert(data.message);
                document.getElementById('formCadastro').reset(); /* limpa o formulario */
                window.location.href = '../login/index.html'; /* envia o cliente para a tela de login */
            } else {
                alert(data.message); /* mostra o erro tratado vindo da api do servidor */
            }
        } catch (error) {
            console.error('erro na conexao:', error);
            alert('nao foi possivel conectar ao servidor da boutique.');
        } finally {
            /* restaura o estado inicial do botao em caso de falha */
            btn.textContent = "Enviar";
            btn.style.opacity = "1";
            btn.disabled = false;
        }
    }
});
