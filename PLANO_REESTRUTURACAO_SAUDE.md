# Plano de Reestruturação Completa - Fluxo de Intervenções de Saúde

## 📋 Visão Geral

Reestruturar o sistema de intervenções de saúde para simplificar o fluxo operacional em **3 categorias funcionais** com campos e regras específicas.

---

## 🎯 Objetivos

1. **Simplificação**: Reduzir de 6 para 3 categorias de intervenções
2. **Clareza**: Cada categoria tem campos específicos e propósito bem definido
3. **Alertas Inteligentes**: Implementar sistema de notificações para próximas doses
4. **Compatibilidade**: Manter retrocompatibilidade com dados históricos
5. **Testabilidade**: Implementar e validar cada etapa separadamente

---

## 📦 Categorias de Intervenções

### 1. Consulta
- **Propósito**: Registro de visitas veterinárias
- **Campos Obrigatórios**:
  - Data/hora da visita
  - Lote de animais visitado
  - Veterinário responsável
  - Anotações detalhadas da visita
  - Valor monetário da consulta
- **Campos Opcionais**:
  - Data de retorno (se houver)
- **Regras**:
  - Quantidade de aves afetadas = população total do lote
  - Status de recuperação = não aplicável

### 2. Tratamento
- **Propósito**: Registro de aplicação de vacinas e medicamentos
- **Campos Obrigatórios**:
  - Data/hora da aplicação
  - Lote de animais que recebeu o tratamento
  - Veterinário responsável
  - Tipo de tratamento (vacina ou medicamento)
  - Nome do produto
  - Quantidade de aves afetadas
  - Método de aplicação
- **Campos Opcionais**:
  - Data da próxima dose
  - Detalhes do tratamento
  - Valor estimado
- **Regras**:
  - Alerta automático para data da próxima dose
  - Integração com estoque veterinário (verificar disponibilidade)

### 3. Monitoramento
- **Propósito**: Registro de observações específicas do usuário
- **Campos Obrigatórios**:
  - Data/hora da observação
  - Lote de animais
  - Anotações livres
- **Campos Opcionais**:
  - Galpão (se aplicável)
  - Quantidade de aves afetadas (se houver)
  - Veterinário responsável (se houver)
- **Regras**:
  - Sem validações rigorosas
  - Campo livre para anotações

---

## 🗓️ Cronograma de Implementação Modular

### Etapa 1: Atualização de Tipos e Modelos
**Objetivo**: Definir a estrutura de dados nova e compatibilizar com histórico
**Tempo Estimado**: 1-2 dias

#### Tarefas:
- [ ] Atualizar `HealthProcedureType` para apenas 3 valores: `consulta`, `tratamento`, `monitoramento`
- [ ] Definir interfaces específicas para cada tipo de intervenção (mantendo `HealthRecord` como base)
- [ ] Adicionar campo `nextDoseDate` (data próxima dose)
- [ ] Adicionar campo `returnDate` (data de retorno para consultas)
- [ ] Manter campos históricos opcionais para retrocompatibilidade
- [ ] Atualizar `VeterinaryStockRecord` para integração com tratamentos
- [ ] Definir tipo para alertas (`HealthAlert`)

#### Arquivos a Modificar:
- [`src/types.ts`](file:///d:/TRABALHOS%20DE%20PROGRAMA%C3%87%C3%83O/GRANJA%20DE%20BOLSO%203.1/src/types.ts)

#### Testes:
- [ ] Compilação TypeScript sem erros
- [ ] Tipagem correta de campos novos
- [ ] Dados históricos ainda são compatíveis

#### Critérios de Sucesso:
- ✅ Código compila sem erros de tipo
- ✅ Novos campos são definidos
- ✅ Dados antigos podem ser mapeados para o novo formato

---

### Etapa 2: Lógica de Negócio - Core
**Objetivo**: Implementar funções de validação, relatórios e integração
**Tempo Estimado**: 2-3 dias

#### Tarefas:
- [ ] Atualizar função `buildHealthReport()` para trabalhar com as 3 categorias
- [ ] Implementar função `validateHealthRecord()` com regras específicas por tipo
- [ ] Criar função `getNextDoseAlerts()` para gerar alertas de próximas doses
- [ ] Criar função `syncTreatmentWithStock()` para integrar com estoque veterinário
- [ ] Atualizar função `canProfessionalManageHealth()` se necessário
- [ ] Adicionar função `convertLegacyRecord()` para migrar dados históricos
- [ ] Implementar lógica de cálculo de custos para consultas

#### Arquivos a Modificar:
- [`src/lib/manejo.ts`](file:///d:/TRABALHOS%20DE%20PROGRAMA%C3%87%C3%83O/GRANJA%20DE%20BOLSO%203.1/src/lib/manejo.ts)

#### Testes:
- [ ] Validação de campos obrigatórios por tipo de intervenção
- [ ] Relatórios gerados corretamente
- [ ] Alertas de próximas doses são criados
- [ ] Integração com estoque funciona
- [ ] Dados históricos são convertidos corretamente

#### Critérios de Sucesso:
- ✅ Todas as validações passam
- ✅ Relatórios refletem corretamente as 3 categorias
- ✅ Alertas são gerados para tratamentos com próxima dose
- ✅ Integração com estoque é funcional

---

### Etapa 3: Integração com o Banco de Dados
**Objetivo**: Atualizar integração com Supabase
**Tempo Estimado**: 1-2 dias

#### Tarefas:
- [ ] Adicionar novos campos à tabela `saude_registros`
- [ ] Criar tabela `saude_alertas` (opcional, para histórico de alertas)
- [ ] Atualizar funções `upsertMyHealthRecord()` e `listMyHealthRecords()`
- [ ] Garantir que campos antigos ainda funcionem para dados históricos
- [ ] Criar índice para `next_dose_date` para otimizar consultas de alertas

#### Arquivos a Modificar:
- [`src/lib/supabase.ts`](file:///d:/TRABALHOS%20DE%20PROGRAMA%C3%87%C3%83O/GRANJA%20DE%20BOLSO%203.1/src/lib/supabase.ts)
- [`supabase_final.sql`](file:///d:/TRABALHOS%20DE%20PROGRAMA%C3%87%C3%83O/GRANJA%20DE%20BOLSO%203.1/supabase_final.sql) (para migrations)

#### Testes:
- [ ] Registros são salvos com sucesso
- [ ] Dados históricos são carregados corretamente
- [ ] Campos novos são persistidos no banco
- [ ] Consultas de alertas são rápidas

#### Critérios de Sucesso:
- ✅ CRUD completo funcional
- ✅ Dados históricos permanecem acessíveis
- ✅ Desempenho das consultas é mantido

---

### Etapa 4: Interface do Usuário - Formulário
**Objetivo**: Reestruturar o formulário de registro com campos dinâmicos por tipo
**Tempo Estimado**: 2-3 dias

#### Tarefas:
- [ ] Redesenhar o seletor de tipo de intervenção (apenas 3 opções)
- [ ] Criar componentes condicionais que exibem campos específicos por tipo
- [ ] Implementar formulário para Consulta (com valor monetário e data de retorno)
- [ ] Implementar formulário para Tratamento (com data de próxima dose e integração com estoque)
- [ ] Implementar formulário para Monitoramento (campo livre)
- [ ] Manter retrocompatibilidade para edição de registros antigos
- [ ] Adicionar feedback visual para campos obrigatórios

#### Arquivos a Modificar:
- [`src/pages/ManejoPage.tsx`](file:///d:/TRABALHOS%20DE%20PROGRAMA%C3%87%C3%83O/GRANJA%20DE%20BOLSO%203.1/src/pages/ManejoPage.tsx)

#### Testes:
- [ ] Seletor de tipo funciona
- [ ] Campos dinâmicos aparecem/desaparecem corretamente
- [ ] Validação client-side funciona
- [ ] Edição de registros antigos funciona
- [ ] Usabilidade intuitiva

#### Critérios de Sucesso:
- ✅ Formulário responde corretamente à seleção do tipo
- ✅ Todas as validações são aplicadas
- ✅ Experiência de usuário fluida

---

### Etapa 5: Interface do Usuário - Listagem e Relatórios
**Objetivo**: Atualizar listagem, filtros e relatórios
**Tempo Estimado**: 1-2 dias

#### Tarefas:
- [ ] Atualizar filtros para as 3 novas categorias
- [ ] Atualizar a exibição dos registros na listagem
- [ ] Modificar o relatório de saúde para agrupar pelas 3 categorias
- [ ] Adicionar badges/icones específicos para cada tipo de intervenção
- [ ] Manter busca e filtros existentes

#### Arquivos a Modificar:
- [`src/pages/ManejoPage.tsx`](file:///d:/TRABALHOS%20DE%20PROGRAMA%C3%87%C3%83O/GRANJA%20DE%20BOLSO%203.1/src/pages/ManejoPage.tsx)

#### Testes:
- [ ] Filtros funcionam com as novas categorias
- [ ] Listagem exibe todos os registros corretamente
- [ ] Relatórios são gerados com precisão
- [ ] Busca funciona para campos novos e antigos

#### Critérios de Sucesso:
- ✅ Listagem é clara e organizada
- ✅ Filtros são intuitivos
- ✅ Relatórios refletem as novas categorias

---

### Etapa 6: Sistema de Alertas
**Objetivo**: Implementar sistema completo de notificações
**Tempo Estimado**: 2-3 dias

#### Tarefas:
- [ ] Criar componente `HealthAlerts` para exibir alertas de próximas doses
- [ ] Integrar alertas na seção "Recomendações"
- [ ] Implementar lógica de dismiss (marcar como lido)
- [ ] Adicionar configuração de antecedência do alerta (ex: 7 dias antes)
- [ ] Criar página/modal para visualização de todos os alertas
- [ ] Implementar armazenamento local de alertas lidos

#### Arquivos a Modificar:
- [`src/pages/ManejoPage.tsx`](file:///d:/TRABALHOS%20DE%20PROGRAMA%C3%87%C3%83O/GRANJA%20DE%20BOLSO%203.1/src/pages/ManejoPage.tsx)
- [ ] Criar componente `src/components/HealthAlerts.tsx` (opcional)

#### Testes:
- [ ] Alertas aparecem para tratamentos com próxima dose
- [ ] Alertas são ordenados por data
- [ ] Alertas podem ser marcados como lidos
- [ ] Alertas não aparecem após serem lidos
- [ ] Configuração de antecedência funciona

#### Critérios de Sucesso:
- ✅ Alertas são visíveis e acionáveis
- ✅ Sistema é resiliente e não mostra alertas falsos
- ✅ Usuário pode gerenciar os alertas

---

### Etapa 7: Exportação e Relatórios Avançados
**Objetivo**: Atualizar exportações para o novo formato
**Tempo Estimado**: 1 dia

#### Tarefas:
- [ ] Atualizar `healthExportRows` para as novas categorias
- [ ] Adicionar campos novos às exportações Excel/PDF
- [ ] Garantir que dados históricos ainda sejam exportados corretamente

#### Arquivos a Modificar:
- [`src/pages/ManejoPage.tsx`](file:///d:/TRABALHOS%20DE%20PROGRAMA%C3%87%C3%83O/GRANJA%20DE%20BOLSO%203.1/src/pages/ManejoPage.tsx)

#### Testes:
- [ ] Exportação Excel funciona
- [ ] Exportação PDF funciona
- [ ] Todos os campos estão presentes
- [ ] Dados históricos são exportados

#### Critérios de Sucesso:
- ✅ Exportações completas e precisas

---

### Etapa 8: Testes Finais e Validação
**Objetivo**: Validação completa do sistema
**Tempo Estimado**: 1-2 dias

#### Tarefas:
- [ ] Testes de integração end-to-end
- [ ] Testes de retrocompatibilidade com dados históricos
- [ ] Testes de usabilidade
- [ ] Performance e otimizações
- [ ] Correção de bugs

#### Critérios de Sucesso:
- ✅ Todo o fluxo funciona sem erros
- ✅ Dados históricos são mantidos
- ✅ Usabilidade é satisfatória
- ✅ Performance não é degradada

---

## 🔗 Integração com Módulos Existentes

### Módulo de Gestão de Lotes
- **Integração**: Seleção de lote obrigatória para todas as intervenções
- **Comunicação**: `AnimalRecord` já está integrado
- **Regras**: 
  - Quantidade de aves afetadas ≤ população atual do lote
  - Consultas sempre afetam toda a população do lote

### Módulo de Cadastro de Veterinários
- **Integração**: Seleção de profissional obrigatória para Consultas e Tratamentos
- **Comunicação**: `HealthProfessionalRecord` já está integrado
- **Regras**:
  - Apenas profissionais ativos podem ser selecionados
  - Nível de acesso adequado para registrar intervenções

### Módulo de Estoque Veterinário
- **Integração**: Tratamentos verificam disponibilidade no estoque
- **Comunicação**: `VeterinaryStockRecord`
- **Regras**:
  - Verificar se produto existe no estoque
  - Verificar se há quantidade suficiente
  - Alertar se produto está vencido ou com estoque baixo

### Módulo de Clima e Recomendações
- **Integração**: Alertas de próximas doses aparecem nas recomendações
- **Comunicação**: Integração via `recommendations` no `ManejoPage`

---

## 💾 Armazenamento de Dados

### Estrutura da Tabela `saude_registros`
Campos já existentes (manter):
- `id`, `user_id`, `granja_id`, `created_at`
- `occurred_at`, `procedure_type`
- `animal_id`, `galpao_id`, `professional_id`
- `title`, `notes`
- `disease_name`, `affected_bird_count`
- `estimated_cost`, `recovery_status`
- `vaccine_name`, `medication_name`, `application_method`, `treatment_details`

Campos novos a adicionar:
- `next_dose_date` (timestamp, opcional) - para Tratamento
- `return_date` (timestamp, opcional) - para Consulta
- `consultation_cost` (numeric, opcional) - para Consulta

### Estrutura da Tabela `saude_alertas` (opcional)
Se for necessário histórico de alertas:
- `id`, `user_id`, `granja_id`, `created_at`
- `health_record_id` (FK para saude_registros)
- `type` (next_dose, return_visit)
- `is_read` (boolean)
- `read_at` (timestamp)
- `scheduled_date` (timestamp)

---

## 🚨 Lógica de Alertas para Próximas Doses

### Funcionamento Geral
1. Ao salvar um Tratamento com `nextDoseDate`, o sistema automaticamente agenda um alerta
2. Alertas aparecem na seção "Recomendações"
3. Alertas são classificados por:
   - **Urgente**: Data já passou ou é hoje
   - **Próximo**: Data nos próximos 3 dias
   - **Aviso**: Data nos próximos 7-14 dias

### Regras de Negócio
- Alertas são gerados apenas para Tratamentos
- Alertas são mostrados até que:
  - O tratamento seja atualizado (adicionada nova dose)
  - O alerta seja marcado como lido
- Antecedência padrão: 7 dias antes da data

### Localização dos Alertas
1. **Banner principal na página Saúde** (alerta destacado)
2. **Seção Recomendações** (junto com outros alertas)
3. **Badge no menu de navegação** (quantidade de alertas pendentes)

---

## 🧪 Estratégias de Testes

### Testes Unitários
- Validação de tipos
- Lógica de negócio (validações, relatórios)
- Funções de conversão de dados históricos

### Testes de Integração
- Fluxo completo: criar → editar → visualizar → deletar
- Integração com Supabase
- Integração com estoque veterinário

### Testes de Usabilidade
- Formulário intuitivo
- Navegação fluida
- Feedback visual adequado

### Testes de Retrocompatibilidade
- Dados antigos são carregados
- Dados antigos podem ser editados
- Exportações mantêm formato consistente

---

## 📊 Critérios de Sucesso Por Etapa

### Geral
- [ ] Nenhum erro crítico em produção
- [ ] Performance não degradada
- [ ] Dados históricos mantidos
- [ ] Usabilidade aprovada

### Específicos por Etapa
- Ver cada etapa acima para detalhes

---

## ⚠️ Riscos e Mitigações

### Risco 1: Quebra de dados históricos
- **Mitigação**: Manter campos antigos opcionais, implementar função de conversão

### Risco 2: Regressão em funcionalidades existentes
- **Mitigação**: Testes rigorosos, validação etapa por etapa

### Risco 3: Complexidade excessiva do formulário
- **Mitigação**: Campos dinâmicos, feedback visual claro, validação passo a passo

### Risco 4: Alertas falsos positivos
- **Mitigação**: Lógica rigorosa, datas validadas, opção de dismiss

---

## 🚀 Deploy e Rollout

### Estratégia de Deploy
1. Deploy em ambiente de staging
2. Testes completos em staging
3. Deploy gradual em produção
4. Monitoramento contínuo

### Rollback
- Se houver problemas críticos, rollback para versão anterior
- Estratégia de backup de dados antes do deploy

---

## 📝 Checklist Final de Implementação

- [ ] Tipos atualizados
- [ ] Lógica de negócio implementada
- [ ] Integração com Supabase
- [ ] Formulário reestruturado
- [ ] Listagem e relatórios atualizados
- [ ] Sistema de alertas funcional
- [ ] Exportações atualizadas
- [ ] Todos os testes passando
- [ ] Documentação atualizada
- [ ] Deploy em staging
- [ ] Deploy em produção

---

## 📚 Referências
- Arquivos existentes:
  - [`src/types.ts`](file:///d:/TRABALHOS%20DE%20PROGRAMA%C3%87%C3%83O/GRANJA%20DE%20BOLSO%203.1/src/types.ts)
  - [`src/lib/manejo.ts`](file:///d:/TRABALHOS%20DE%20PROGRAMA%C3%87%C3%83O/GRANJA%20DE%20BOLSO%203.1/src/lib/manejo.ts)
  - [`src/pages/ManejoPage.tsx`](file:///d:/TRABALHOS%20DE%20PROGRAMA%C3%87%C3%83O/GRANJA%20DE%20BOLSO%203.1/src/pages/ManejoPage.tsx)
  - [`src/lib/supabase.ts`](file:///d:/TRABALHOS%20DE%20PROGRAMA%C3%87%C3%83O/GRANJA%20DE%20BOLSO%203.1/src/lib/supabase.ts)
