const vetForm = document.getElementById("cadastro-vet");

vetForm.addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const vetData = {
        nome: document.getElementById("nome").value.trim(),
        cfmv: parseInt(document.getElementById("cfmv").value),
        especialidade: document.getElementById("especialidade").value.trim()
    }

    // Validação de segurança
    if(!vetData.nome || !vetData.cfmv || !vetData.especialidade){
        alert("Preencha todos os campos");
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/vets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(vetData)
        });

        const data = await response.json();

        if(response.ok){
            alert(data.message);
            vetForm.reset(); 
        } else {
            alert(data.message);
        }

    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao conectar com o servidor.');
    }
});
