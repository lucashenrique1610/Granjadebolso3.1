# Análise Completa do Sistema Granja de Bolso

## 1. Mapeamento Geral do Sistema

### Arquitetura Geral
O **Granja de Bolso** é um sistema monolítico frontend-first com arquitetura cliente-servidor:
- **Frontend**: Aplicativo React + Vite + TypeScript
- **Backend/Servidor**: Supabase (PaaS - Platform as a Service)
- **Banco de Dados**: PostgreSQL (via Supabase)
- **Armazenamento**: Supabase Database (JSONB para backups/snapshots)
- **Autenticação**: Supabase Auth
- **Serviços Externos**: API de Clima (Open-Meteo/OpenWeather, opcional)

---

## 2. Camadas do Sistema

### 2.1 Frontend (React + Vite)
**Responsabilidades**:
- Interface do usuário
- Gerenciamento de estado local (React useState)
- Cacheamento em localStorage (onboarding)
- Renderização de dashboards e gráficos (Chart.js)
- Exportação de relatórios (jsPDF, XLSX)

**Principais Componentes**:
| Componente/Arquivo | Responsabilidade |
|---|---|
| `main.tsx` | Ponto de entrada do React |
| `App.tsx` | Gerenciamento de estado global, onboarding, autenticação |
| `AppShell.tsx` | Shell principal, navegação, carregamento de dados do Supabase |
| `types.ts` | Interfaces TypeScript e tipos de dados |
| `lib/supabase.ts` | Cliente Supabase e funções de integração |
| `pages/*.tsx` | Páginas do sistema (Animais, Clientes, Compras, etc.) |
| `components/*.tsx` | Componentes reutilizáveis (Sidebar, formulários, etc.) |
| `data/knowledge/*.ts` | Base de conhecimento (conteúdo técnico offline-first) |

**Gerenciamento de Estado**:
- Estado do onboarding em `App.tsx` (salvo em localStorage)
- Estado dos dados do usuário em `AppShell.tsx` (carregados do Supabase)

### 2.2 Backend (Supabase)
**Responsabilidades**:
- Autenticação e autorização
- Persistência de dados
- Aplicação de regras de segurança (RLS - Row Level Security)
- Trigger de criação de usuário

**Tabelas Principais**:
| Tabela | Descrição |
|---|---|
| `auth.users` | Tabela padrão do Supabase para usuários autenticados |
| `public.users` | Perfil público do usuário (trigger sync) |
| `public.granjas` | Perfil da granja (configurações, paleta, preços, etc.) |
| `public.animais` | Lotes de aves |
| `public.clientes` | Clientes |
| `public.fornecedores` | Fornecedores |
| `public.compras` | Compras de insumos |
| `public.galpoes` | Galpões/instalações |
| `public.profissionais_saude` | Veterinários e técnicos |
| `public.saude_registros` | Registros de saúde/vacinas |
| `public.estoque_veterinario` | Estoque de medicamentos |
| `public.mortalidade_registros` | Registros de mortalidade |
| `public.manejo_registros` | Manejo diário (ovos, ração, etc.) |
| `public.disponibilidade_venda` | Disponibilidade de venda |
| `public.vendas` | Vendas realizadas |
| `public.ingredientes` | Ingredientes para formulação de ração |
| `public.formulacoes` | Formulações de ração |
| `public.estoque_racao_formulada` | Estoque de ração formulada |
| `public.backups` | Backups automáticos/manuais |

### 2.3 Integração Frontend ↔ Supabase
**Arquivo Central**: `src/lib/supabase.ts`
- Criação do cliente Supabase com `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`
- Mapeamento de dados (Supabase Row → Interface TypeScript)
- Funções CRUD padronizadas:
  - `listMy*()`: Lista registros do usuário autenticado
  - `upsertMy*()`: Cria/atualiza registros
  - `deleteMy*()`: Exclui registros

---

## 3. Fluxos de Dados e Comunicação

### 3.1 Fluxo de Autenticação e Onboarding
1. **Acesso Inicial**: Usuário abre app → `App.tsx` verifica estado via `supabase.auth.onAuthStateChange`
2. **Onboarding**:
   - Passo 1: Dados pessoais (salvo em state/localStorage)
   - Passo 2: Dados da granja (salvo em state/localStorage)
   - Passo 3: Escolha de paleta de cores (salvo em state/localStorage)
   - Passo 4: Fonte de marketing (salvo em state/localStorage)
3. **Criação de Conta**:
   - Chamada `signUpWithEmail()`
   - Trigger `handle_new_user()` no Supabase cria linha em `public.users`
   - Chamadas para `upsertMyUser()` e `createMyGranja()`
4. **Login**:
   - Chamada `signInWithEmail()`
   - Carrega dados do usuário e granja via `getMyUser()` e `getMyLatestGranja()`
5. **Navegação para App Shell**: `App.tsx` renderiza `AppShell.tsx`

### 3.2 Fluxo de Sincronização de Dados
1. `AppShell.tsx` monta → dispara `loadCadastros()`
2. `loadCadastros()` executa em paralelo:
   ```javascript
   Promise.all([
     listMyAnimals(), listMyClients(), listMySuppliers(),
     listMyPurchases(), listMyGalpoes(), listMyHealthProfessionals(),
     listMyHealthRecords(), listMyVeterinaryStock(), listMyMortalityRecords(),
     listMyManejoRecords(), listMyDisponibilidadeVenda(), listMyVendas(),
     listMyIngredients(), listMyFormulacoes(), listMyFormulatedFeedStock()
   ])
   ```
3. Dados são salvos em hooks useState do React
4. Operações de CRUD disparam:
   - `upsertMy*()`: Envia dados para o Supabase
   - Chamada subsequente para `loadCadastros()` para refresh

### 3.3 Fluxo de Backups
1. **Criação de Backup**:
   - Chamada `buildMyBackupSnapshot()` cria objeto `BackupSnapshot` com todos os dados
   - `saveMyBackupToSupabase()` salva JSONB na tabela `backups`
2. **Automação**:
   - Configurações em `granjas.auto_backup_enabled`, `granjas.auto_backup_frequency`, etc.
   - (Aviso: Não há código de cron job no frontend; backup automático exigiria função Edge Supabase)
3. **Restauração**:
   - `restoreMyBackupSnapshot()` lê snapshot e recria todos os registros no Supabase

---

## 4. Pontos de Falha e Riscos Identificados

### 4.1 Problemas Críticos
| Problema | Risco | Mitigação |
|---|---|---|
| **Colunas `owner_id` e `granja_id` NULL em tabelas existentes** | ERRO: `column "owner_id" of relation "clientes" contains null values` ao tentar adicionar coluna como NOT NULL | Use o script `supabase_final.sql` (colunas adicionadas como NULLABLE, políticas RLS permitem NULL) |
| **Políticas RLS quebradas (não existiam ou dão erro)** | Acesso negado aos dados | O `supabase_final.sql` recria todas as políticas com suporte a `owner_id IS NULL` para compatibilidade |
| **Tabelas com colunas faltantes** | Erros de runtime no frontend | `supabase_final.sql` verifica e adiciona colunas com segurança usando `DO $$ BEGIN ... END $$` |

### 4.2 Problemas de Desempenho e UX
| Problema | Impacto |
|---|---|
| **Todas as tabelas são carregadas de uma vez no `AppShell.tsx`** | Pode causar lentidão em granjas com muitos dados; nenhum mecanismo de paginação |
| **Nenhum cache offline além do localStorage (apenas onboarding)** | Sem funcionalidade offline-first para dados principais |
| **Nenhum mecanismo de optimistic updates** | UX pode parecer "travada" ao esperar resposta do Supabase |
| **Nenhum mecanismo de retry/reconect** | Falha transiente de rede → erro para o usuário |

### 4.3 Problemas de Segurança
| Problema | Impacto |
|---|---|
| **Secrets em `.env` (anão é problema aqui pois é anon key, mas cuidado!)** | Sem problema; a anon key é segura para frontend |
| **Nenhuma validação de entrada no backend/Supabase** | Risco de dados inconsistentes; validação apenas no frontend |
| **Nenhuma auditoria de logs no banco** | Não há histórico de alterações de dados |

---

## 5. Guia Prático para Integração Frontend ↔ Supabase

### 5.1 Passo 1: Configurar Supabase
1. **Crie uma conta no Supabase**: https://supabase.com/
2. **Crie um novo projeto**
3. **Obtenha credenciais**:
   - Vá para `Settings` → `API`
   - Copie `Project URL` para `VITE_SUPABASE_URL`
   - Copie `anon public` para `VITE_SUPABASE_ANON_KEY`
   - **Não use a service_role key no frontend!**

### 5.2 Passo 2: Executar Script SQL
1. No painel do Supabase, vá para `SQL Editor`
2. Crie uma nova query
3. **Copie todo o conteúdo do arquivo `supabase_final.sql`**
4. Execute!

Este script é **idempotente** (você pode executar várias vezes sem problema).

### 5.3 Passo 3: Configurar o Frontend
1. Crie o arquivo `.env` na raiz do projeto com as credenciais:
   ```env
   VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
   VITE_SUPABASE_ANON_KEY=SEU-ANON-KEY
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute o app:
   ```bash
   npm run dev
   ```

### 5.4 Passo 4: Testar Fluxo
1. Abra http://localhost:3001
2. Crie uma nova conta
3. Complete o onboarding
4. Adicione alguns dados (cliente, fornecedor, animal, etc.)
5. Verifique no painel do Supabase (`Table Editor`) se os dados foram salvos corretamente

---

## 6. Padrões de Comunicação Segura e Robusta (Guia de Melhorias)

### 6.1 Protocolos e Padrões
✅ **HTTPS**: Já fornecido pelo Supabase  
✅ **JSON**: Formato padrão para dados  
✅ **JWT**: Usado pelo Supabase Auth

### 6.2 Validação de Dados
#### Frontend
- Adicione bibliotecas como **Zod** ou **Yup** para validação de schemas antes de enviar para o Supabase
- Exemplo com Zod:
  ```typescript
  import { z } from 'zod';

  const ClienteSchema = z.object({
    name: z.string().min(2, 'Nome muito curto'),
    email: z.string().email('E-mail inválido'),
    phone: z.string().min(10, 'Telefone inválido'),
  });
  ```
#### Backend (Supabase)
Use políticas RLS e triggers para validação adicional:
```sql
-- Exemplo de trigger para validação de e-mail
CREATE OR REPLACE FUNCTION validate_client_email()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.email !~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$' THEN
    RAISE EXCEPTION 'E-mail inválido: %', NEW.email;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_client_email_trigger
BEFORE INSERT OR UPDATE ON public.clientes
FOR EACH ROW EXECUTE FUNCTION validate_client_email();
```

### 6.3 Tratamento de Erros
#### Padrão de Erro Unificado
```typescript
interface AppError {
  code: string; // ex: 'NETWORK_ERROR', 'VALIDATION_ERROR', 'AUTH_ERROR'
  message: string;
  friendlyMessage: string;
  details?: any;
  timestamp: string;
}
```
#### Exemplo de Uso
```typescript
async function safeUpsertClient(data: ClientRecord) {
  try {
    // Validação frontend
    const validated = ClienteSchema.parse(data);
    // Requisição
    return await upsertMyClient(validated);
  } catch (error) {
    const appError: AppError = {
      code: error instanceof z.ZodError ? 'VALIDATION_ERROR' : 'UNKNOWN_ERROR',
      message: error instanceof Error ? error.message : 'Erro desconhecido',
      friendlyMessage: error instanceof z.ZodError
        ? 'Verifique os dados preenchidos'
        : 'Não foi possível salvar o cliente. Tente novamente.',
      details: error,
      timestamp: new Date().toISOString(),
    };
    console.error(appError);
    throw appError;
  }
}
```

### 6.4 Resiliência e Retries
Adicione **retries exponenciais** para requisições transitórias:
```typescript
async function fetchWithRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  delayMs = 1000
): Promise<T> {
  let lastError: Error | null = null;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (i < maxRetries - 1) {
        await new Promise(res => setTimeout(res, delayMs * (2 ** i)));
      }
    }
  }
  throw lastError;
}
```

### 6.5 Gerenciamento de Estado
- Para apps maiores, considere **TanStack Query (React Query)** para:
  - Cache automático
  - Refetching inteligente
  - Paginação
  - Mutations otimistas
- Para estado global, use **Zustand** ou **Jotai** em vez de useState+useRef

### 6.6 Segurança
1. **Habilite RLS (Row Level Security) para TODAS as tabelas**: (feito pelo script)
2. **Habilite SSL enforcado**: No painel do Supabase → `Authentication` → `Providers`
3. **Valide emails**: No painel do Supabase → `Authentication` → `Emails`
4. **CORS**: Configure origens permitidas no painel do Supabase
5. **Nunca exponha a service_role key no frontend**

### 6.7 Testes
1. **Testes Unitários**: Já há setup do Vitest no projeto
2. **Testes de Integração**:
   ```bash
   npm test
   ```
3. **Testes E2E**: Adicione Playwright ou Cypress
4. **Testes de Carga**: Use k6 ou ferramentas do Supabase

---

## 7. Checklist de Validação Final
- [ ] Arquivo `.env` criado com `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`
- [ ] Script `supabase_final.sql` executado no SQL Editor do Supabase
- [ ] Projeto executa com `npm run dev` sem erros no console
- [ ] Criação de conta funciona (signup)
- [ ] Login funciona (signin)
- [ ] Onboarding completo salva dados no Supabase
- [ ] Adição de cliente funciona e aparece na tabela `clientes`
- [ ] Adição de animal funciona e aparece na tabela `animais`
- [ ] Backup manual é criado e aparece na tabela `backups`

---

## 8. Arquivos Importantes
| Arquivo | Descrição |
|---|---|
| `.env` | Credenciais do Supabase (criado agora) |
| `supabase_final.sql` | Script completo de banco de dados seguro |
| `src/lib/supabase.ts` | Integração frontend ↔ Supabase |
| `src/types.ts` | Interfaces TypeScript |
| `src/App.tsx` | Estado global e onboarding |
| `src/components/AppShell.tsx` | Shell principal e carregamento de dados |

## Conclusão
O sistema Granja de Bolso está **pronto para uso** com as correções aplicadas! O script `supabase_final.sql` resolve os problemas de integração com tabelas existentes. Para projetos em produção, recomendamos implementar as melhorias de resiliência, validação e estado sugeridas.
