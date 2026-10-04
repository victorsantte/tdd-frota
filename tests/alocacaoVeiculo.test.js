const { verificarBloqueio, alocarVeiculoEmViagem } = require('../src/alocacaoVeiculo');

const HOJE = new Date('2026-10-03');

const veiculoOk = {
  placa: 'ABC1D23',
  defeitoCritico: false,
  osPendentes: 0,
  vencimentoDocumentacao: '2027-01-01',
  vencimentoApolice: '2027-01-01',
};

describe('RF-12 - Bloqueio de veículos (comportamento original)', () => {
  test('não bloqueia veículo regular', () => {
    expect(verificarBloqueio(veiculoOk, HOJE).bloqueado).toBe(false);
  });

  test('bloqueia veículo com defeito crítico', () => {
    const r = verificarBloqueio({ ...veiculoOk, defeitoCritico: true }, HOJE);
    expect(r.bloqueado).toBe(true);
    expect(r.motivos).toContain('Defeito crítico');
  });

  test('bloqueia veículo com documentação vencida', () => {
    const r = verificarBloqueio({ ...veiculoOk, vencimentoDocumentacao: '2026-01-01' }, HOJE);
    expect(r.motivos).toContain('Documentação vencida');
  });

  test('bloqueia veículo com OS pendente', () => {
    const r = verificarBloqueio({ ...veiculoOk, osPendentes: 1 }, HOJE);
    expect(r.motivos).toContain('Ordem de serviço pendente');
  });

  test('impede alocação de veículo bloqueado em viagem', () => {
    expect(() => alocarVeiculoEmViagem({ ...veiculoOk, osPendentes: 2 }, { id: 1 }, HOJE))
      .toThrow('Veículo bloqueado');
  });
});
describe('RF-12-A - Bloqueio por apólice de seguro vencida (novo comportamento)', () => {
  test('bloqueia veículo com apólice de seguro vencida', () => {
    const r = verificarBloqueio({ ...veiculoOk, vencimentoApolice: '2026-01-01' }, HOJE);
    expect(r.bloqueado).toBe(true);
    expect(r.motivos).toContain('Apólice de seguro vencida');
  });
});