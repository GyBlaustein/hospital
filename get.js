function exibirMensagem(texto, tipo) {
    var box = document.getElementById('mensagem');
    if (!box) { return; }
    box.textContent = texto;
    box.className = 'mensagem visivel ' + tipo;
}

function somenteNumeros(valor) {
    return (valor || '').replace(/\D/g, '');
}

function buscarAgendamentos() {
    var telefone = somenteNumeros(document.getElementById('identificadorBusca').value);
    var tabelaContainer = document.getElementById('tabela-container');
    var tabelaCorpo = document.getElementById('tabela-corpo');

    if (!telefone) {
        exibirMensagem('Informe um telefone para buscar.', 'erro');
        return;
    }

    fetch('http://localhost:3000/consultas')
        .then(resposta => resposta.json())
        .then(dados => {
            tabelaCorpo.innerHTML = '';

            var encontrados = dados.filter(item => somenteNumeros(item.telefone) === telefone);

            if (encontrados.length === 0) {
                exibirMensagem('Nenhum agendamento encontrado para esse telefone.', 'erro');
                tabelaContainer.style.display = 'none';
                return;
            }

            encontrados.forEach(objeto => {
                var tr = document.createElement('tr');

                var tdNome = document.createElement('td');
                var tdNascimento = document.createElement('td');
                var tdCartao = document.createElement('td');
                var tdTelefone = document.createElement('td');
                var tdMotivo = document.createElement('td');
                var tdDataDesejada = document.createElement('td');
                var tdHorario = document.createElement('td');
                var tdInfo = document.createElement('td');

                tdNome.innerText = objeto.nomePaciente || '-';
                tdNascimento.innerText = objeto.dataNascimento || '-';
                tdCartao.innerText = objeto.cartaoPlano || '-';
                tdTelefone.innerText = objeto.telefone || '-';
                tdMotivo.innerText = objeto.motivoConsulta || '-';
                tdDataDesejada.innerText = objeto.dataDesejada || '-';
                tdHorario.innerText = objeto.horarioDesejado || '-';
                tdInfo.innerText = objeto.informacoesAdicionais || '-';

                tr.appendChild(tdNome);
                tr.appendChild(tdNascimento);
                tr.appendChild(tdCartao);
                tr.appendChild(tdTelefone);
                tr.appendChild(tdMotivo);
                tr.appendChild(tdDataDesejada);
                tr.appendChild(tdHorario);
                tr.appendChild(tdInfo);

                tabelaCorpo.appendChild(tr);
            });

            tabelaContainer.style.display = 'block';
            exibirMensagem(encontrados.length + ' agendamento(s) encontrado(s).', 'sucesso');
        })
        .catch(() => exibirMensagem('Erro ao buscar os dados. Verifique se o json-server está rodando.', 'erro'));
}