const estaVencida = (data, hoje) => new Date(data) < hoje;

const REGRAS_DE_BLOQUEIO = [
  { motivo: 'Defeito crítico', aplica: (v) => v.defeitoCritico },
  { motivo: 'Documentação vencida', aplica: (v, hoje) => estaVencida(v.vencimentoDocumentacao, hoje) },
  { motivo: 'Apólice de seguro vencida', aplica: (v, hoje) => estaVencida(v.vencimentoApolice, hoje) },
  { motivo: 'Ordem de serviço pendente', aplica: (v) => v.osPendentes > 0 },
];

function verificarBloqueio(veiculo, hoje = new Date()) {
  const motivos = REGRAS_DE_BLOQUEIO
    .filter((regra) => regra.aplica(veiculo, hoje))
    .map((regra) => regra.motivo);

  return { bloqueado: motivos.length > 0, motivos };
}

function alocarVeiculoEmViagem(veiculo, viagem, hoje = new Date()) {
  const { bloqueado, motivos } = verificarBloqueio(veiculo, hoje);
  if (bloqueado) {
    throw new Error(`Veículo bloqueado: ${motivos.join(', ')}`);
  }
  return { ...viagem, placa: veiculo.placa };
}

module.exports = { verificarBloqueio, alocarVeiculoEmViagem };