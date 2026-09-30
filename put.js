let idConsultaAtual = null;

function exibirMensagem(texto, tipo) {
    var box = document.getElementById('mensagem');
    if (!box) { return; }
    box.textContent = texto;
    box.className = 'mensagem visivel ' + tipo;
}

function somenteNumeros(valor) {
    return (valor || '').replace(/\D/g, '');
}

function buscarDados() {
    const telefone = somenteNumeros(document.getElementById('identificador').value);

    if (!telefone) {
        exibirMensagem('Informe um telefone para buscar.', 'erro');
        return;
    }

    fetch('http://localhost:3000/consultas')
        .then(res => res.json())
        .then(lista => {
            const consulta = lista.find(item => somenteNumeros(item.telefone) === telefone);

            if (!consulta) {
                idConsultaAtual = null;
                exibirMensagem('Nenhum agendamento encontrado para esse telefone.', 'erro');
                return;
            }

            idConsultaAtual = consulta.id;

            document.getElementById('nomePaciente').value = consulta.nomePaciente || '';
            document.getElementById('dataNascimento').value = consulta.dataNascimento || '';
            document.getElementById('telefoneNovo').value = consulta.telefone || '';
            document.getElementById('cartaoPlano').value = consulta.cartaoPlano || '';
            document.getElementById('motivoConsulta').value = consulta.motivoConsulta || '';
            document.getElementById('dataDesejada').value = consulta.dataDesejada || '';
            document.getElementById('horarioDesejado').value = consulta.horarioDesejado || '';
            document.getElementById('informacoesAdicionais').value = consulta.informacoesAdicionais || '';

            exibirMensagem('Agendamento encontrado. Você já pode editar os dados abaixo.', 'sucesso');
        })
        .catch(() => exibirMensagem('Erro ao buscar os dados. Verifique se o json-server está rodando.', 'erro'));
}

function atualizarDados() {
    if (!idConsultaAtual) {
        exibirMensagem('Busque um agendamento pelo telefone antes de atualizar.', 'erro');
        return;
    }

    const consultaAtualizada = {
        nomePaciente: document.getElementById('nomePaciente').value,
        dataNascimento: document.getElementById('dataNascimento').value,
        telefone: somenteNumeros(document.getElementById('telefoneNovo').value),
        cartaoPlano: document.getElementById('cartaoPlano').value,
        motivoConsulta: document.getElementById('motivoConsulta').value,
        dataDesejada: document.getElementById('dataDesejada').value,
        horarioDesejado: document.getElementById('horarioDesejado').value,
        informacoesAdicionais: document.getElementById('informacoesAdicionais').value
    };

    fetch(`http://localhost:3000/consultas/${idConsultaAtual}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(consultaAtualizada)
    })
        .then(res => {
            if (!res.ok) throw new Error('Erro ao atualizar');
            return res.json();
        })
        .then(() => exibirMensagem('Consulta atualizada com sucesso!', 'sucesso'))
        .catch(() => exibirMensagem('Erro ao atualizar a consulta.', 'erro'));
}