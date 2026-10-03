# RF-12 - Bloqueio de veículos

## Comportamento Original
O sistema deve bloquear a alocação de um veículo em viagem se ele se enquadrar em qualquer uma das condições abaixo:
- Possuir defeito crítico.
- Estar com a documentação vencida.
- Possuir Ordem de Serviço (OS) pendente.

## Comportamento Alterado (Objetivo do TDD)
- além das regras anteriores, o sistema deve bloquear também veículos com apólice de seguro vencida, informando esse motivo na mensagem de bloqueio.
