function verificarBloqueio(veiculo, hoje = new Date()) {
  const motivos = [];

  if (veiculo.defeitoCritico) {
    motivos.push('Defeito crítico');
  }
  if (new Date(veiculo.vencimentoDocumentacao) < hoje) {
    motivos.push('Documentação vencida');
  }
  if (veiculo.osPendentes > 0) {
    motivos.push('Ordem de serviço pendente');
  }
  if (new Date(veiculo.vencimentoApolice) < hoje) {
    motivos.push('Apólice de seguro vencida');
  }

  return { bloqueado: motivos.length > 0, motivos };
}

function alocarVeiculoEmViagem(veiculo, viagem, hoje = new Date()) {
  const resultado = verificarBloqueio(veiculo, hoje);
  if (resultado.bloqueado) {
    throw new Error(`Veículo bloqueado: ${resultado.motivos.join(', ')}`);
  }
  return { ...viagem, placa: veiculo.placa };
}

module.exports = { verificarBloqueio, alocarVeiculoEmViagem };