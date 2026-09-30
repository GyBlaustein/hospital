function exibirMensagem(texto, tipo) {
    var box = document.getElementById('mensagem');
    if (!box) { return; }
    box.textContent = texto;
    box.className = 'mensagem visivel ' + tipo;
}

// Remove parênteses, espaços e traços para manter o telefone salvo sempre no mesmo formato
function somenteNumeros(valor) {
    return (valor || '').replace(/\D/g, '');
}

function enviarDados() {
    const consulta = {
        nomePaciente: document.getElementById('nomePaciente').value,
        dataNascimento: document.getElementById('dataNascimento').value,
        cartaoPlano: document.getElementById('cartaoPlano').value,
        telefone: somenteNumeros(document.getElementById('telefone').value),
        motivoConsulta: document.getElementById('motivoConsulta').value,
        dataDesejada: document.getElementById('dataDesejada').value,
        horarioDesejado: document.getElementById('horarioDesejado').value,
        informacoesAdicionais: document.getElementById('informacoesAdicionais').value
    };

    fetch('http://localhost:3000/consultas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(consulta)
    })
    .then(resposta => resposta.json())
    .then(() => {
        exibirMensagem('Consulta agendada com sucesso! Em breve entraremos em contato para confirmar.', 'sucesso');
        document.getElementById('form-post').reset();
    })
    .catch(() => exibirMensagem('Não foi possível agendar a consulta. Verifique se o json-server está rodando.', 'erro'));
}