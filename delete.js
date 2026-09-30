function exibirMensagem(texto, tipo) {
    var box = document.getElementById('mensagem');
    if (!box) { return; }
    box.textContent = texto;
    box.className = 'mensagem visivel ' + tipo;
}

// Remove parênteses, espaços e traços para comparar telefones de forma confiável
function somenteNumeros(valor) {
    return (valor || '').replace(/\D/g, '');
}

function deletarDados() {
    var telefone = somenteNumeros(document.getElementById('identificadorTelefone').value);

    if (!telefone) {
        exibirMensagem('Informe um telefone para buscar.', 'erro');
        return;
    }

    fetch('http://localhost:3000/consultas')
        .then(response => response.json())
        .then(data => {

            const consulta = data.find(item => somenteNumeros(item.telefone) === telefone);

            if (consulta) {

                fetch(`http://localhost:3000/consultas/${consulta.id}`, {
                    method: 'DELETE'
                })
                .then(() => exibirMensagem('Consulta cancelada com sucesso.', 'sucesso'))
                .catch(() => exibirMensagem('Erro ao cancelar a consulta.', 'erro'));
            } else {
                exibirMensagem('Telefone não encontrado. Confira se digitou o mesmo número usado no agendamento.', 'erro');
            }
        })
        .catch(() => exibirMensagem('Erro ao buscar os dados. Verifique se o json-server está rodando.', 'erro'));
}