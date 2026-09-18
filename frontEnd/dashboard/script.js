/* script simples embutido para gerenciar a sessao do cliente premium */
        document.addEventListener('DOMContentLoaded', () => {
            /* recupera a string de dados do usuario logado */
            const usuarioDados = localStorage.getItem('usuarioLogado');

            /* se nao houver nenhum registro na memoria volta o cliente para a tela de login */
            if (!usuarioDados) {
                window.location.href = 'login/index.html';
                return;
            }

            /* decodifica o texto em formato de objeto javascript */
            const usuario = JSON.parse(usuarioDados);

            /* injeta os valores salvos dinamicamente nas tags da pagina */
            document.getElementById('txtNomeTutor').textContent = usuario.nomeTutor;
            document.getElementById('txtNomePet').textContent = usuario.nomePet;
            document.getElementById('txtRaca').textContent = usuario.raca;
            document.getElementById('txtGenero').textContent = usuario.genero === 'm' ? 'macho' : 'fêmea';
            document.getElementById('txtPeso').textContent = `${usuario.peso} kg`;
            document.getElementById('txtIdade').textContent = `${usuario.idade} ${usuario.idade === 1 ? 'ano' : 'anos'}`;
        });

        /* limpa a memoria do navegador e desloga o usuario ao clicar no botao */
        document.getElementById('btnSair').addEventListener('click', () => {
            localStorage.removeItem('usuarioLogado');
            window.location.href = '../index.html';
        });