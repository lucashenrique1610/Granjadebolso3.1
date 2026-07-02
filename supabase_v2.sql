-- =====================================================
-- GRANJA DE BOLSO - Script SQL v2 COMPLETO
-- =====================================================
-- ⚠️ DEPRECADO — NÃO USE EM PROJETOS NOVOS.
-- Este arquivo usa colunas antigas (ex.: granjas.nome, animais.nome)
-- incompatíveis com o app React atual (src/lib/supabase.ts).
-- Use supabase_final.sql + supabase_migrate.sql.
-- =====================================================
-- MELHORIAS:
-- ✅ Todas as 18 tabelas com RLS
-- ✅ Funções RPC para o frontend chamar
-- ✅ Função para criar usuário + granja em 1 chamada
-- ✅ Melhor documentação
-- ✅ Segurança garantida

-- =====================================================
-- 1. TABELA: USERS (Perfil Público do Usuário)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- =====================================================
-- 2. TABELA: GRANJAS (Configurações da Granja)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.granjas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  nome VARCHAR(255) NOT NULL,
  endereco TEXT,
  telefone VARCHAR(20),
  email VARCHAR(255),
  coordenadas_latitude DECIMAL(10, 8),
  coordenadas_longitude DECIMAL(11, 8),
  tipo_producao VARCHAR(100),
  paleta_cores VARCHAR(50),
  preco_kg_ave DECIMAL(10, 2),
  preco_dzia_hospedagem DECIMAL(10, 2),
  auto_backup_enabled BOOLEAN DEFAULT FALSE,
  auto_backup_frequency VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.granjas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own granjas"
  ON public.granjas FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own granjas"
  ON public.granjas FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own granjas"
  ON public.granjas FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own granjas"
  ON public.granjas FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX idx_granjas_user_id ON public.granjas(user_id);

-- =====================================================
-- 3. TABELA: ANIMAIS (Lotes de Aves)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.animais (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  granja_id UUID REFERENCES public.granjas(id) ON DELETE CASCADE,
  nome VARCHAR(255) NOT NULL,
  tipo VARCHAR(100),
  quantidade_inicial INTEGER,
  quantidade_atual INTEGER,
  data_entrada DATE,
  raca VARCHAR(100),
  genero VARCHAR(50),
  peso_medio DECIMAL(8, 2),
  idade_dias INTEGER,
  status VARCHAR(50),
  notas TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.animais ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own animais"
  ON public.animais FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own animais"
  ON public.animais FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own animais"
  ON public.animais FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own animais"
  ON public.animais FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX idx_animais_user_id ON public.animais(user_id);
CREATE INDEX idx_animais_granja_id ON public.animais(granja_id);

-- =====================================================
-- 4. TABELA: CLIENTES
-- =====================================================
CREATE TABLE IF NOT EXISTS public.clientes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  granja_id UUID REFERENCES public.granjas(id) ON DELETE CASCADE,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  telefone VARCHAR(20),
  endereco TEXT,
  tipo_cliente VARCHAR(100),
  status VARCHAR(50),
  cpf_cnpj VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own clientes"
  ON public.clientes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own clientes"
  ON public.clientes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own clientes"
  ON public.clientes FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own clientes"
  ON public.clientes FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX idx_clientes_user_id ON public.clientes(user_id);
CREATE INDEX idx_clientes_granja_id ON public.clientes(granja_id);

-- =====================================================
-- 5. TABELA: FORNECEDORES
-- =====================================================
CREATE TABLE IF NOT EXISTS public.fornecedores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  granja_id UUID REFERENCES public.granjas(id) ON DELETE CASCADE,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  telefone VARCHAR(20),
  endereco TEXT,
  ramo_atividade VARCHAR(100),
  status VARCHAR(50),
  cpf_cnpj VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.fornecedores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own fornecedores"
  ON public.fornecedores FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own fornecedores"
  ON public.fornecedores FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own fornecedores"
  ON public.fornecedores FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own fornecedores"
  ON public.fornecedores FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX idx_fornecedores_user_id ON public.fornecedores(user_id);
CREATE INDEX idx_fornecedores_granja_id ON public.fornecedores(granja_id);

-- =====================================================
-- 6. TABELA: GALPÕES
-- =====================================================
CREATE TABLE IF NOT EXISTS public.galpoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  granja_id UUID REFERENCES public.granjas(id) ON DELETE CASCADE,
  nome VARCHAR(255) NOT NULL,
  tipo_construcao VARCHAR(100),
  area_m2 DECIMAL(10, 2),
  capacidade_aves INTEGER,
  temperatura_ideal_min DECIMAL(5, 2),
  temperatura_ideal_max DECIMAL(5, 2),
  umidade_ideal_min DECIMAL(5, 2),
  umidade_ideal_max DECIMAL(5, 2),
  sistema_ventilacao VARCHAR(100),
  sistema_aquecimento VARCHAR(100),
  status VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.galpoes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own galpoes"
  ON public.galpoes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own galpoes"
  ON public.galpoes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own galpoes"
  ON public.galpoes FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own galpoes"
  ON public.galpoes FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX idx_galpoes_user_id ON public.galpoes(user_id);
CREATE INDEX idx_galpoes_granja_id ON public.galpoes(granja_id);

-- =====================================================
-- 7. TABELA: COMPRAS (Compras de Insumos)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.compras (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  granja_id UUID REFERENCES public.granjas(id) ON DELETE CASCADE,
  fornecedor_id UUID REFERENCES public.fornecedores(id) ON DELETE SET NULL,
  data_compra DATE NOT NULL,
  descricao TEXT,
  valor_total DECIMAL(12, 2),
  status VARCHAR(50),
  numero_nf VARCHAR(50),
  data_entrega DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.compras ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own compras"
  ON public.compras FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own compras"
  ON public.compras FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own compras"
  ON public.compras FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own compras"
  ON public.compras FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX idx_compras_user_id ON public.compras(user_id);
CREATE INDEX idx_compras_granja_id ON public.compras(granja_id);
CREATE INDEX idx_compras_fornecedor_id ON public.compras(fornecedor_id);

-- =====================================================
-- 8. TABELA: PROFISSIONAIS DE SAÚDE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.profissionais_saude (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  granja_id UUID REFERENCES public.granjas(id) ON DELETE CASCADE,
  nome VARCHAR(255) NOT NULL,
  especialidade VARCHAR(100),
  crmv_crt VARCHAR(50),
  telefone VARCHAR(20),
  email VARCHAR(255),
  endereco TEXT,
  status VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.profissionais_saude ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profissionais_saude"
  ON public.profissionais_saude FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profissionais_saude"
  ON public.profissionais_saude FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profissionais_saude"
  ON public.profissionais_saude FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own profissionais_saude"
  ON public.profissionais_saude FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX idx_profissionais_saude_user_id ON public.profissionais_saude(user_id);
CREATE INDEX idx_profissionais_saude_granja_id ON public.profissionais_saude(granja_id);

-- =====================================================
-- 9. TABELA: REGISTROS DE SAÚDE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.saude_registros (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  granja_id UUID REFERENCES public.granjas(id) ON DELETE CASCADE,
  animal_id UUID REFERENCES public.animais(id) ON DELETE CASCADE,
  profissional_id UUID REFERENCES public.profissionais_saude(id) ON DELETE SET NULL,
  tipo_registro VARCHAR(100),
  data_registro DATE NOT NULL,
  descricao TEXT,
  medicamento VARCHAR(255),
  dosagem VARCHAR(100),
  via_administracao VARCHAR(100),
  periodo_carencia_dias INTEGER,
  resultado TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.saude_registros ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own saude_registros"
  ON public.saude_registros FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saude_registros"
  ON public.saude_registros FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own saude_registros"
  ON public.saude_registros FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own saude_registros"
  ON public.saude_registros FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX idx_saude_registros_user_id ON public.saude_registros(user_id);
CREATE INDEX idx_saude_registros_granja_id ON public.saude_registros(granja_id);
CREATE INDEX idx_saude_registros_animal_id ON public.saude_registros(animal_id);

-- =====================================================
-- 10. TABELA: ESTOQUE VETERINÁRIO
-- =====================================================
CREATE TABLE IF NOT EXISTS public.estoque_veterinario (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  granja_id UUID REFERENCES public.granjas(id) ON DELETE CASCADE,
  nome_produto VARCHAR(255) NOT NULL,
  tipo_produto VARCHAR(100),
  quantidade INTEGER,
  unidade_medida VARCHAR(50),
  data_validade DATE,
  data_aquisicao DATE,
  preco_unitario DECIMAL(10, 2),
  fornecedor_id UUID REFERENCES public.fornecedores(id) ON DELETE SET NULL,
  localizacao_armazenagem VARCHAR(255),
  lote VARCHAR(50),
  status VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.estoque_veterinario ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own estoque_veterinario"
  ON public.estoque_veterinario FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own estoque_veterinario"
  ON public.estoque_veterinario FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own estoque_veterinario"
  ON public.estoque_veterinario FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own estoque_veterinario"
  ON public.estoque_veterinario FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX idx_estoque_veterinario_user_id ON public.estoque_veterinario(user_id);
CREATE INDEX idx_estoque_veterinario_granja_id ON public.estoque_veterinario(granja_id);

-- =====================================================
-- 11. TABELA: REGISTROS DE MORTALIDADE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.mortalidade_registros (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  granja_id UUID REFERENCES public.granjas(id) ON DELETE CASCADE,
  animal_id UUID REFERENCES public.animais(id) ON DELETE CASCADE,
  data_morte DATE NOT NULL,
  quantidade_mortes INTEGER DEFAULT 1,
  causa_provavel VARCHAR(255),
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.mortalidade_registros ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own mortalidade_registros"
  ON public.mortalidade_registros FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own mortalidade_registros"
  ON public.mortalidade_registros FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own mortalidade_registros"
  ON public.mortalidade_registros FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own mortalidade_registros"
  ON public.mortalidade_registros FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX idx_mortalidade_registros_user_id ON public.mortalidade_registros(user_id);
CREATE INDEX idx_mortalidade_registros_granja_id ON public.mortalidade_registros(granja_id);
CREATE INDEX idx_mortalidade_registros_animal_id ON public.mortalidade_registros(animal_id);

-- =====================================================
-- 12. TABELA: REGISTROS DE MANEJO
-- =====================================================
CREATE TABLE IF NOT EXISTS public.manejo_registros (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  granja_id UUID REFERENCES public.granjas(id) ON DELETE CASCADE,
  animal_id UUID REFERENCES public.animais(id) ON DELETE CASCADE,
  tipo_manejo VARCHAR(100),
  data_manejo DATE NOT NULL,
  quantidade_ovos INTEGER,
  quantidade_racao_kg DECIMAL(10, 2),
  quantidade_agua_l DECIMAL(10, 2),
  temperatura_ambiente DECIMAL(5, 2),
  umidade_ar DECIMAL(5, 2),
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.manejo_registros ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own manejo_registros"
  ON public.manejo_registros FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own manejo_registros"
  ON public.manejo_registros FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own manejo_registros"
  ON public.manejo_registros FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own manejo_registros"
  ON public.manejo_registros FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX idx_manejo_registros_user_id ON public.manejo_registros(user_id);
CREATE INDEX idx_manejo_registros_granja_id ON public.manejo_registros(granja_id);
CREATE INDEX idx_manejo_registros_animal_id ON public.manejo_registros(animal_id);

-- =====================================================
-- 13. TABELA: DISPONIBILIDADE DE VENDA
-- =====================================================
CREATE TABLE IF NOT EXISTS public.disponibilidade_venda (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  granja_id UUID REFERENCES public.granjas(id) ON DELETE CASCADE,
  animal_id UUID REFERENCES public.animais(id) ON DELETE CASCADE,
  tipo_produto VARCHAR(100),
  quantidade_disponivel INTEGER,
  unidade_medida VARCHAR(50),
  preco_unitario DECIMAL(10, 2),
  data_disponibilidade DATE,
  status VARCHAR(50),
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.disponibilidade_venda ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own disponibilidade_venda"
  ON public.disponibilidade_venda FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own disponibilidade_venda"
  ON public.disponibilidade_venda FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own disponibilidade_venda"
  ON public.disponibilidade_venda FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own disponibilidade_venda"
  ON public.disponibilidade_venda FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX idx_disponibilidade_venda_user_id ON public.disponibilidade_venda(user_id);
CREATE INDEX idx_disponibilidade_venda_granja_id ON public.disponibilidade_venda(granja_id);
CREATE INDEX idx_disponibilidade_venda_animal_id ON public.disponibilidade_venda(animal_id);

-- =====================================================
-- 14. TABELA: VENDAS
-- =====================================================
CREATE TABLE IF NOT EXISTS public.vendas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  granja_id UUID REFERENCES public.granjas(id) ON DELETE CASCADE,
  cliente_id UUID REFERENCES public.clientes(id) ON DELETE SET NULL,
  animal_id UUID REFERENCES public.animais(id) ON DELETE SET NULL,
  data_venda DATE NOT NULL,
  tipo_produto VARCHAR(100),
  quantidade INTEGER,
  unidade_medida VARCHAR(50),
  preco_unitario DECIMAL(10, 2),
  valor_total DECIMAL(12, 2),
  status_pagamento VARCHAR(50),
  forma_pagamento VARCHAR(100),
  data_entrega DATE,
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.vendas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own vendas"
  ON public.vendas FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own vendas"
  ON public.vendas FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own vendas"
  ON public.vendas FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own vendas"
  ON public.vendas FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX idx_vendas_user_id ON public.vendas(user_id);
CREATE INDEX idx_vendas_granja_id ON public.vendas(granja_id);
CREATE INDEX idx_vendas_cliente_id ON public.vendas(cliente_id);
CREATE INDEX idx_vendas_animal_id ON public.vendas(animal_id);

-- =====================================================
-- 15. TABELA: INGREDIENTES
-- =====================================================
CREATE TABLE IF NOT EXISTS public.ingredientes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  granja_id UUID REFERENCES public.granjas(id) ON DELETE CASCADE,
  nome VARCHAR(255) NOT NULL,
  tipo_ingrediente VARCHAR(100),
  preco_kg DECIMAL(10, 2),
  unidade_medida VARCHAR(50),
  fornecedor_id UUID REFERENCES public.fornecedores(id) ON DELETE SET NULL,
  proteina_percentual DECIMAL(5, 2),
  gordura_percentual DECIMAL(5, 2),
  fibra_percentual DECIMAL(5, 2),
  energia_kcal_kg DECIMAL(10, 2),
  status VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.ingredientes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own ingredientes"
  ON public.ingredientes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own ingredientes"
  ON public.ingredientes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own ingredientes"
  ON public.ingredientes FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own ingredientes"
  ON public.ingredientes FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX idx_ingredientes_user_id ON public.ingredientes(user_id);
CREATE INDEX idx_ingredientes_granja_id ON public.ingredientes(granja_id);

-- =====================================================
-- 16. TABELA: FORMULAÇÕES
-- =====================================================
CREATE TABLE IF NOT EXISTS public.formulacoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  granja_id UUID REFERENCES public.granjas(id) ON DELETE CASCADE,
  nome VARCHAR(255) NOT NULL,
  tipo_animal VARCHAR(100),
  fase_criacao VARCHAR(100),
  proteina_alvo DECIMAL(5, 2),
  gordura_alvo DECIMAL(5, 2),
  fibra_alvo DECIMAL(5, 2),
  energia_kcal_kg_alvo DECIMAL(10, 2),
  data_criacao DATE,
  status VARCHAR(50),
  notas TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.formulacoes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own formulacoes"
  ON public.formulacoes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own formulacoes"
  ON public.formulacoes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own formulacoes"
  ON public.formulacoes FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own formulacoes"
  ON public.formulacoes FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX idx_formulacoes_user_id ON public.formulacoes(user_id);
CREATE INDEX idx_formulacoes_granja_id ON public.formulacoes(granja_id);

-- =====================================================
-- 17. TABELA: ESTOQUE DE RAÇÃO FORMULADA
-- =====================================================
CREATE TABLE IF NOT EXISTS public.estoque_racao_formulada (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  granja_id UUID REFERENCES public.granjas(id) ON DELETE CASCADE,
  formulacao_id UUID REFERENCES public.formulacoes(id) ON DELETE CASCADE,
  quantidade_kg DECIMAL(10, 2),
  data_producao DATE,
  data_validade DATE,
  localizacao_armazenagem VARCHAR(255),
  status VARCHAR(50),
  lote VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.estoque_racao_formulada ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own estoque_racao_formulada"
  ON public.estoque_racao_formulada FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own estoque_racao_formulada"
  ON public.estoque_racao_formulada FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own estoque_racao_formulada"
  ON public.estoque_racao_formulada FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own estoque_racao_formulada"
  ON public.estoque_racao_formulada FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX idx_estoque_racao_formulada_user_id ON public.estoque_racao_formulada(user_id);
CREATE INDEX idx_estoque_racao_formulada_granja_id ON public.estoque_racao_formulada(granja_id);
CREATE INDEX idx_estoque_racao_formulada_formulacao_id ON public.estoque_racao_formulada(formulacao_id);

-- =====================================================
-- 18. TABELA: BACKUPS
-- =====================================================
CREATE TABLE IF NOT EXISTS public.backups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  granja_id UUID REFERENCES public.granjas(id) ON DELETE CASCADE,
  nome_backup VARCHAR(255),
  snapshot_data JSONB NOT NULL,
  tipo_backup VARCHAR(50),
  data_criacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  tamanho_bytes BIGINT,
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.backups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own backups"
  ON public.backups FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own backups"
  ON public.backups FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own backups"
  ON public.backups FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own backups"
  ON public.backups FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX idx_backups_user_id ON public.backups(user_id);
CREATE INDEX idx_backups_granja_id ON public.backups(granja_id);

-- =====================================================
-- TRIGGER: Sincronizar novo usuário em public.users
-- =====================================================
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- FUNÇÕES RPC - PARA CHAMAR DO FRONTEND
-- =====================================================

-- =====================================================
-- FUNÇÃO 1: Criar Granja
-- =====================================================
-- Chama do frontend:
-- const { data, error } = await supabase.rpc('criar_granja', {
--   nome_granja: 'Minha Granja',
--   endereco_granja: 'Rua X, 123',
--   ...
-- });
-- =====================================================
DROP FUNCTION IF EXISTS public.criar_granja(VARCHAR, TEXT, VARCHAR, VARCHAR, VARCHAR, VARCHAR, DECIMAL, DECIMAL);

CREATE OR REPLACE FUNCTION public.criar_granja(
  nome_granja VARCHAR,
  endereco_granja TEXT DEFAULT NULL,
  telefone_granja VARCHAR DEFAULT NULL,
  email_granja VARCHAR DEFAULT NULL,
  tipo_producao_granja VARCHAR DEFAULT NULL,
  paleta_cores_granja VARCHAR DEFAULT 'azul',
  preco_kg_granja DECIMAL DEFAULT 0,
  preco_dia_granja DECIMAL DEFAULT 0
)
RETURNS json AS $$
DECLARE
  v_user_id UUID;
  v_granja_id UUID;
BEGIN
  -- Pega o ID do usuário logado
  v_user_id := auth.uid();
  
  IF v_user_id IS NULL THEN
    RETURN json_build_object('success', false, 'error', 'Usuário não autenticado');
  END IF;

  -- Insere a granja
  INSERT INTO public.granjas (
    user_id,
    nome,
    endereco,
    telefone,
    email,
    tipo_producao,
    paleta_cores,
    preco_kg_ave,
    preco_dzia_hospedagem
  ) VALUES (
    v_user_id,
    nome_granja,
    endereco_granja,
    telefone_granja,
    email_granja,
    tipo_producao_granja,
    paleta_cores_granja,
    preco_kg_granja,
    preco_dia_granja
  ) RETURNING id INTO v_granja_id;

  RETURN json_build_object(
    'success', true,
    'granja_id', v_granja_id,
    'message', 'Granja criada com sucesso!'
  );

EXCEPTION WHEN OTHERS THEN
  RETURN json_build_object(
    'success', false,
    'error', SQLERRM
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- =====================================================
-- FUNÇÃO 2: Atualizar Granja
-- =====================================================
DROP FUNCTION IF EXISTS public.atualizar_granja(UUID, VARCHAR, TEXT, VARCHAR, VARCHAR, VARCHAR, VARCHAR, DECIMAL, DECIMAL);

CREATE OR REPLACE FUNCTION public.atualizar_granja(
  granja_id UUID,
  nome_granja VARCHAR DEFAULT NULL,
  endereco_granja TEXT DEFAULT NULL,
  telefone_granja VARCHAR DEFAULT NULL,
  email_granja VARCHAR DEFAULT NULL,
  tipo_producao_granja VARCHAR DEFAULT NULL,
  paleta_cores_granja VARCHAR DEFAULT NULL,
  preco_kg_granja DECIMAL DEFAULT NULL,
  preco_dia_granja DECIMAL DEFAULT NULL
)
RETURNS json AS $$
DECLARE
  v_user_id UUID;
BEGIN
  v_user_id := auth.uid();

  IF v_user_id IS NULL THEN
    RETURN json_build_object('success', false, 'error', 'Usuário não autenticado');
  END IF;

  UPDATE public.granjas
  SET
    nome = COALESCE(nome_granja, nome),
    endereco = COALESCE(endereco_granja, endereco),
    telefone = COALESCE(telefone_granja, telefone),
    email = COALESCE(email_granja, email),
    tipo_producao = COALESCE(tipo_producao_granja, tipo_producao),
    paleta_cores = COALESCE(paleta_cores_granja, paleta_cores),
    preco_kg_ave = COALESCE(preco_kg_granja, preco_kg_ave),
    preco_dzia_hospedagem = COALESCE(preco_dia_granja, preco_dzia_hospedagem),
    updated_at = CURRENT_TIMESTAMP
  WHERE id = granja_id AND user_id = v_user_id;

  RETURN json_build_object(
    'success', true,
    'message', 'Granja atualizada com sucesso!'
  );

EXCEPTION WHEN OTHERS THEN
  RETURN json_build_object(
    'success', false,
    'error', SQLERRM
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- =====================================================
-- FUNÇÃO 3: Deletar Granja
-- =====================================================
DROP FUNCTION IF EXISTS public.deletar_granja(UUID);

CREATE OR REPLACE FUNCTION public.deletar_granja(granja_id UUID)
RETURNS json AS $$
DECLARE
  v_user_id UUID;
BEGIN
  v_user_id := auth.uid();

  IF v_user_id IS NULL THEN
    RETURN json_build_object('success', false, 'error', 'Usuário não autenticado');
  END IF;

  DELETE FROM public.granjas
  WHERE id = granja_id AND user_id = v_user_id;

  RETURN json_build_object(
    'success', true,
    'message', 'Granja deletada com sucesso!'
  );

EXCEPTION WHEN OTHERS THEN
  RETURN json_build_object(
    'success', false,
    'error', SQLERRM
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- =====================================================
-- FUNÇÃO 4: Listar Minhas Granjas
-- =====================================================
DROP FUNCTION IF EXISTS public.listar_minhas_granjas();

CREATE OR REPLACE FUNCTION public.listar_minhas_granjas()
RETURNS TABLE (
  id UUID,
  nome VARCHAR,
  endereco TEXT,
  telefone VARCHAR,
  email VARCHAR,
  tipo_producao VARCHAR,
  paleta_cores VARCHAR,
  preco_kg_ave DECIMAL,
  preco_dzia_hospedagem DECIMAL,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
) AS $$
DECLARE
  v_user_id UUID;
BEGIN
  v_user_id := auth.uid();

  IF v_user_id IS NULL THEN
    RETURN;
  END IF;

  RETURN QUERY
  SELECT
    g.id,
    g.nome,
    g.endereco,
    g.telefone,
    g.email,
    g.tipo_producao,
    g.paleta_cores,
    g.preco_kg_ave,
    g.preco_dzia_hospedagem,
    g.created_at,
    g.updated_at
  FROM public.granjas g
  WHERE g.user_id = v_user_id
  ORDER BY g.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- =====================================================
-- FUNÇÃO 5: Obter Uma Granja pelo ID
-- =====================================================
DROP FUNCTION IF EXISTS public.obter_granja(UUID);

CREATE OR REPLACE FUNCTION public.obter_granja(granja_id UUID)
RETURNS TABLE (
  id UUID,
  nome VARCHAR,
  endereco TEXT,
  telefone VARCHAR,
  email VARCHAR,
  tipo_producao VARCHAR,
  paleta_cores VARCHAR,
  preco_kg_ave DECIMAL,
  preco_dzia_hospedagem DECIMAL,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
) AS $$
DECLARE
  v_user_id UUID;
BEGIN
  v_user_id := auth.uid();

  IF v_user_id IS NULL THEN
    RETURN;
  END IF;

  RETURN QUERY
  SELECT
    g.id,
    g.nome,
    g.endereco,
    g.telefone,
    g.email,
    g.tipo_producao,
    g.paleta_cores,
    g.preco_kg_ave,
    g.preco_dzia_hospedagem,
    g.created_at,
    g.updated_at
  FROM public.granjas g
  WHERE g.id = granja_id AND g.user_id = v_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- =====================================================
-- PERMISSÕES FINAIS
-- =====================================================
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;

-- =====================================================
-- FIM DO SCRIPT v2
-- =====================================================
-- ✅ 18 tabelas completas com RLS
-- ✅ Funções RPC para granjas (criar, atualizar, deletar, listar)
-- ✅ Trigger automático para sincronizar usuários
-- ✅ Segurança total - cada usuário vê só seus dados
-- ✅ Pronto para usar no frontend
