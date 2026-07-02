-- Script SQL para configuração completa do banco de dados no Supabase
-- Este script é idempotente (pode ser executado várias vezes sem problemas)
--
-- Após executar este arquivo, rode também supabase_migrate.sql para colunas
-- adicionais usadas pelo app (phone, formulation_id, ingredientes extras, etc.).
-- NÃO use supabase_v2.sql — schema antigo incompatível com o frontend.

-- =====================================================
-- PASSO 1: DROP TABELAS EM ORDEM REVERSA DE DEPENDÊNCIA
-- =====================================================
DROP TABLE IF EXISTS public.backups CASCADE;
DROP TABLE IF EXISTS public.estoque_racao_formulada CASCADE;
DROP TABLE IF EXISTS public.formulacoes CASCADE;
DROP TABLE IF EXISTS public.ingredientes CASCADE;
DROP TABLE IF EXISTS public.vendas CASCADE;
DROP TABLE IF EXISTS public.disponibilidade_venda CASCADE;
DROP TABLE IF EXISTS public.manejo_registros CASCADE;
DROP TABLE IF EXISTS public.mortalidade_registros CASCADE;
DROP TABLE IF EXISTS public.saude_registros CASCADE;
DROP TABLE IF EXISTS public.estoque_veterinario CASCADE;
DROP TABLE IF EXISTS public.compras CASCADE;
DROP TABLE IF EXISTS public.profissionais_saude CASCADE;
DROP TABLE IF EXISTS public.galpoes CASCADE;
DROP TABLE IF EXISTS public.clientes CASCADE;
DROP TABLE IF EXISTS public.animais CASCADE;
DROP TABLE IF EXISTS public.fornecedores CASCADE;
DROP TABLE IF EXISTS public.granjas CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

-- =====================================================
-- PASSO 2: CRIAR TABELAS NA ORDEM CORRETA DE DEPENDÊNCIA
-- =====================================================

-- 1. Tabela public.users (perfil de usuário)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL
);

-- 2. Tabela public.granjas (configuração da granja)
CREATE TABLE IF NOT EXISTS public.granjas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  farm_name TEXT NOT NULL,
  state TEXT NOT NULL,
  city TEXT NOT NULL,
  bird_count INTEGER NOT NULL DEFAULT 0,
  selected_palette TEXT NOT NULL DEFAULT 'blue',
  marketing_source TEXT NOT NULL DEFAULT '',
  egg_sale_price NUMERIC NOT NULL DEFAULT 0,
  bird_sale_price NUMERIC NOT NULL DEFAULT 0,
  litter_sale_price NUMERIC NOT NULL DEFAULT 0,
  auto_backup_enabled BOOLEAN NOT NULL DEFAULT false,
  auto_backup_frequency TEXT NOT NULL DEFAULT 'weekly',
  auto_backup_last_run_at TIMESTAMPTZ,
  auto_backup_keep_count INTEGER NOT NULL DEFAULT 10
);

-- 3. Tabela public.fornecedores (dependência para animais e compras)
CREATE TABLE IF NOT EXISTS public.fornecedores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  granja_id UUID REFERENCES public.granjas(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  category TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  status TEXT NOT NULL,
  notes TEXT NOT NULL DEFAULT ''
);

-- 4. Tabela public.clientes
CREATE TABLE IF NOT EXISTS public.clientes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  granja_id UUID REFERENCES public.granjas(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  document TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  status TEXT NOT NULL,
  notes TEXT NOT NULL DEFAULT ''
);

-- 5. Tabela public.galpoes
CREATE TABLE IF NOT EXISTS public.galpoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  granja_id UUID REFERENCES public.granjas(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  code TEXT NOT NULL,
  capacity NUMERIC NOT NULL,
  current_bird_count NUMERIC NOT NULL,
  mortality_threshold_percent NUMERIC NOT NULL,
  location TEXT NOT NULL,
  notes TEXT NOT NULL DEFAULT ''
);

-- 6. Tabela public.profissionais_saude
CREATE TABLE IF NOT EXISTS public.profissionais_saude (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  granja_id UUID REFERENCES public.granjas(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  council_number TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  access_level TEXT NOT NULL,
  is_active BOOLEAN NOT NULL,
  notes TEXT NOT NULL DEFAULT ''
);

-- 7. Tabela public.animais (agora depois de fornecedores)
CREATE TABLE IF NOT EXISTS public.animais (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  granja_id UUID REFERENCES public.granjas(id) ON DELETE CASCADE,
  supplier_id UUID REFERENCES public.fornecedores(id) ON DELETE SET NULL,
  tag TEXT NOT NULL,
  lot TEXT NOT NULL,
  species TEXT NOT NULL,
  purpose TEXT NOT NULL,
  breed TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  current_quantity INTEGER,
  total_purchase_price NUMERIC NOT NULL,
  average_weight_kg NUMERIC NOT NULL,
  birth_date TEXT NOT NULL,
  status TEXT NOT NULL,
  notes TEXT NOT NULL DEFAULT ''
);

-- 8. Tabela public.compras
CREATE TABLE IF NOT EXISTS public.compras (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  granja_id UUID REFERENCES public.granjas(id) ON DELETE CASCADE,
  supplier_id UUID REFERENCES public.fornecedores(id) ON DELETE SET NULL,
  linked_animal_id UUID REFERENCES public.animais(id) ON DELETE SET NULL,
  category TEXT NOT NULL,
  item_name TEXT NOT NULL,
  purchase_date TEXT NOT NULL,
  quantity NUMERIC NOT NULL,
  unit TEXT NOT NULL,
  unit_price NUMERIC NOT NULL,
  total_price NUMERIC NOT NULL,
  invoice_number TEXT NOT NULL,
  payment_status TEXT NOT NULL,
  notes TEXT NOT NULL DEFAULT '',
  feed_classification TEXT,
  veterinary_purpose TEXT,
  expiration_date TEXT,
  service_type TEXT,
  operational_area TEXT
);

-- 9. Tabela public.saude_registros
CREATE TABLE IF NOT EXISTS public.saude_registros (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  granja_id UUID REFERENCES public.granjas(id) ON DELETE CASCADE,
  occurred_at TEXT NOT NULL,
  procedure_type TEXT NOT NULL,
  animal_id UUID REFERENCES public.animais(id) ON DELETE CASCADE NOT NULL,
  galpao_id UUID REFERENCES public.galpoes(id) ON DELETE CASCADE NOT NULL,
  professional_id UUID REFERENCES public.profissionais_saude(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  disease_name TEXT NOT NULL,
  affected_bird_count NUMERIC NOT NULL,
  estimated_cost NUMERIC NOT NULL,
  recovery_status TEXT NOT NULL,
  notes TEXT NOT NULL DEFAULT ''
);

-- 10. Tabela public.estoque_veterinario
CREATE TABLE IF NOT EXISTS public.estoque_veterinario (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  granja_id UUID REFERENCES public.granjas(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  supplier_id UUID REFERENCES public.fornecedores(id) ON DELETE SET NULL,
  batch_number TEXT NOT NULL,
  quantity NUMERIC NOT NULL,
  unit TEXT NOT NULL,
  minimum_stock NUMERIC NOT NULL,
  expiration_date TEXT,
  storage_location TEXT NOT NULL,
  cost_per_unit NUMERIC NOT NULL,
  notes TEXT NOT NULL DEFAULT ''
);

-- 11. Tabela public.mortalidade_registros
CREATE TABLE IF NOT EXISTS public.mortalidade_registros (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  granja_id UUID REFERENCES public.granjas(id) ON DELETE CASCADE,
  date TEXT NOT NULL,
  animal_id UUID REFERENCES public.animais(id) ON DELETE CASCADE NOT NULL,
  galpao_id UUID REFERENCES public.galpoes(id) ON DELETE SET NULL,
  responsible_professional_id UUID REFERENCES public.profissionais_saude(id) ON DELETE SET NULL,
  dead_count NUMERIC NOT NULL,
  cause TEXT NOT NULL,
  notes TEXT NOT NULL DEFAULT '',
  cause_status TEXT
);

-- 12. Tabela public.manejo_registros
CREATE TABLE IF NOT EXISTS public.manejo_registros (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  granja_id UUID REFERENCES public.granjas(id) ON DELETE CASCADE,
  date TEXT NOT NULL,
  animal_id UUID REFERENCES public.animais(id) ON DELETE CASCADE NOT NULL,
  turno TEXT NOT NULL,
  ovos_coletados NUMERIC NOT NULL,
  ovos_danificados NUMERIC NOT NULL,
  racao_kg NUMERIC NOT NULL,
  porta_aberta BOOLEAN NOT NULL,
  peso_medio_ovos NUMERIC NOT NULL,
  tamanho_ovos TEXT NOT NULL
);

-- 13. Tabela public.disponibilidade_venda
CREATE TABLE IF NOT EXISTS public.disponibilidade_venda (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  granja_id UUID REFERENCES public.granjas(id) ON DELETE CASCADE,
  date TEXT NOT NULL,
  galinhas_vivas NUMERIC NOT NULL,
  galinhas_limpas NUMERIC NOT NULL,
  cama_aviario_unidades NUMERIC NOT NULL
);

-- 14. Tabela public.vendas
CREATE TABLE IF NOT EXISTS public.vendas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  granja_id UUID REFERENCES public.granjas(id) ON DELETE CASCADE,
  date TEXT NOT NULL,
  client_id UUID REFERENCES public.clientes(id) ON DELETE CASCADE NOT NULL,
  produto TEXT NOT NULL,
  quantidade NUMERIC NOT NULL,
  lote TEXT NOT NULL,
  forma_pagamento TEXT NOT NULL,
  valor_unitario NUMERIC NOT NULL,
  valor_total NUMERIC NOT NULL,
  notes TEXT NOT NULL DEFAULT ''
);

-- 15. Tabela public.ingredientes
CREATE TABLE IF NOT EXISTS public.ingredientes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  granja_id UUID REFERENCES public.granjas(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  dry_matter NUMERIC,
  protein NUMERIC NOT NULL,
  energy NUMERIC NOT NULL,
  calcium NUMERIC NOT NULL,
  phosphorus NUMERIC NOT NULL,
  methionine NUMERIC NOT NULL,
  met_cis NUMERIC,
  lysine NUMERIC NOT NULL,
  fiber NUMERIC NOT NULL,
  price NUMERIC NOT NULL,
  stock NUMERIC NOT NULL
);

-- 16. Tabela public.formulacoes
CREATE TABLE IF NOT EXISTS public.formulacoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  granja_id UUID REFERENCES public.granjas(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phase TEXT NOT NULL,
  ingredients JSONB NOT NULL,
  is_active BOOLEAN NOT NULL
);

-- 17. Tabela public.estoque_racao_formulada
CREATE TABLE IF NOT EXISTS public.estoque_racao_formulada (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  granja_id UUID REFERENCES public.granjas(id) ON DELETE CASCADE,
  formulation_id UUID REFERENCES public.formulacoes(id) ON DELETE CASCADE NOT NULL,
  quantity_kg NUMERIC NOT NULL,
  produced_at TEXT NOT NULL
);

-- 18. Tabela public.backups
CREATE TABLE IF NOT EXISTS public.backups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  granja_id UUID REFERENCES public.granjas(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  snapshot JSONB NOT NULL
);

-- =====================================================
-- PASSO 3: HABILITAR RLS (Row Level Security)
-- =====================================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.granjas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fornecedores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.galpoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profissionais_saude ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.animais ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compras ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saude_registros ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.estoque_veterinario ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mortalidade_registros ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.manejo_registros ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disponibilidade_venda ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ingredientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.formulacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.estoque_racao_formulada ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.backups ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- PASSO 4: CRIAR POLÍTICAS RLS
-- =====================================================

-- Políticas para public.users
DROP POLICY IF EXISTS "Usuários podem acessar seu próprio perfil" ON public.users;
CREATE POLICY "Usuários podem acessar seu próprio perfil" ON public.users FOR ALL USING (auth.uid() = id);

-- Políticas para public.granjas
DROP POLICY IF EXISTS "Usuários podem acessar suas próprias granjas" ON public.granjas;
CREATE POLICY "Usuários podem acessar suas próprias granjas" ON public.granjas FOR ALL USING (auth.uid() = user_id);

-- Políticas para public.fornecedores
DROP POLICY IF EXISTS "Usuários podem acessar seus próprios fornecedores" ON public.fornecedores;
CREATE POLICY "Usuários podem acessar seus próprios fornecedores" ON public.fornecedores FOR ALL USING (auth.uid() = user_id);

-- Políticas para public.clientes
DROP POLICY IF EXISTS "Usuários podem acessar seus próprios clientes" ON public.clientes;
CREATE POLICY "Usuários podem acessar seus próprios clientes" ON public.clientes FOR ALL USING (auth.uid() = user_id);

-- Políticas para public.galpoes
DROP POLICY IF EXISTS "Usuários podem acessar seus próprios galpões" ON public.galpoes;
CREATE POLICY "Usuários podem acessar seus próprios galpões" ON public.galpoes FOR ALL USING (auth.uid() = user_id);

-- Políticas para public.profissionais_saude
DROP POLICY IF EXISTS "Usuários podem acessar seus próprios profissionais" ON public.profissionais_saude;
CREATE POLICY "Usuários podem acessar seus próprios profissionais" ON public.profissionais_saude FOR ALL USING (auth.uid() = user_id);

-- Políticas para public.animais
DROP POLICY IF EXISTS "Usuários podem acessar seus próprios animais" ON public.animais;
CREATE POLICY "Usuários podem acessar seus próprios animais" ON public.animais FOR ALL USING (auth.uid() = user_id);

-- Políticas para public.compras
DROP POLICY IF EXISTS "Usuários podem acessar suas próprias compras" ON public.compras;
CREATE POLICY "Usuários podem acessar suas próprias compras" ON public.compras FOR ALL USING (auth.uid() = user_id);

-- Políticas para public.saude_registros
DROP POLICY IF EXISTS "Usuários podem acessar seus próprios registros de saúde" ON public.saude_registros;
CREATE POLICY "Usuários podem acessar seus próprios registros de saúde" ON public.saude_registros FOR ALL USING (auth.uid() = user_id);

-- Políticas para public.estoque_veterinario
DROP POLICY IF EXISTS "Usuários podem acessar seu próprio estoque veterinário" ON public.estoque_veterinario;
CREATE POLICY "Usuários podem acessar seu próprio estoque veterinário" ON public.estoque_veterinario FOR ALL USING (auth.uid() = user_id);

-- Políticas para public.mortalidade_registros
DROP POLICY IF EXISTS "Usuários podem acessar seus próprios registros de mortalidade" ON public.mortalidade_registros;
CREATE POLICY "Usuários podem acessar seus próprios registros de mortalidade" ON public.mortalidade_registros FOR ALL USING (auth.uid() = user_id);

-- Políticas para public.manejo_registros
DROP POLICY IF EXISTS "Usuários podem acessar seus próprios registros de manejo" ON public.manejo_registros;
CREATE POLICY "Usuários podem acessar seus próprios registros de manejo" ON public.manejo_registros FOR ALL USING (auth.uid() = user_id);

-- Políticas para public.disponibilidade_venda
DROP POLICY IF EXISTS "Usuários podem acessar sua própria disponibilidade de venda" ON public.disponibilidade_venda;
CREATE POLICY "Usuários podem acessar sua própria disponibilidade de venda" ON public.disponibilidade_venda FOR ALL USING (auth.uid() = user_id);

-- Políticas para public.vendas
DROP POLICY IF EXISTS "Usuários podem acessar suas próprias vendas" ON public.vendas;
CREATE POLICY "Usuários podem acessar suas próprias vendas" ON public.vendas FOR ALL USING (auth.uid() = user_id);

-- Políticas para public.ingredientes
DROP POLICY IF EXISTS "Usuários podem acessar seus próprios ingredientes" ON public.ingredientes;
CREATE POLICY "Usuários podem acessar seus próprios ingredientes" ON public.ingredientes FOR ALL USING (auth.uid() = user_id);

-- Políticas para public.formulacoes
DROP POLICY IF EXISTS "Usuários podem acessar suas próprias formulações" ON public.formulacoes;
CREATE POLICY "Usuários podem acessar suas próprias formulações" ON public.formulacoes FOR ALL USING (auth.uid() = user_id);

-- Políticas para public.estoque_racao_formulada
DROP POLICY IF EXISTS "Usuários podem acessar seu próprio estoque de ração formulada" ON public.estoque_racao_formulada;
CREATE POLICY "Usuários podem acessar seu próprio estoque de ração formulada" ON public.estoque_racao_formulada FOR ALL USING (auth.uid() = user_id);

-- Políticas para public.backups
DROP POLICY IF EXISTS "Usuários podem acessar seus próprios backups" ON public.backups;
CREATE POLICY "Usuários podem acessar seus próprios backups" ON public.backups FOR ALL USING (auth.uid() = user_id);

-- =====================================================
-- PASSO 5: TRIGGER PARA SINCRONIZAR auth.users COM public.users
-- =====================================================
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- PASSO 6: CRIAR FUNÇÕES RPC
-- =====================================================

-- FUNÇÃO 1: Criar Granja
DROP FUNCTION IF EXISTS public.create_granja(VARCHAR, VARCHAR, VARCHAR, INTEGER, VARCHAR, VARCHAR, NUMERIC, NUMERIC, NUMERIC);

CREATE OR REPLACE FUNCTION public.create_granja(
  farm_name_granja VARCHAR,
  state_granja VARCHAR,
  city_granja VARCHAR,
  bird_count_granja INTEGER DEFAULT 0,
  selected_palette_granja VARCHAR DEFAULT 'blue',
  marketing_source_granja VARCHAR DEFAULT '',
  egg_sale_price_granja NUMERIC DEFAULT 0,
  bird_sale_price_granja NUMERIC DEFAULT 0,
  litter_sale_price_granja NUMERIC DEFAULT 0
)
RETURNS json AS $$
DECLARE
  v_user_id UUID;
  v_granja_id UUID;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RETURN json_build_object('success', false, 'error', 'Usuário não autenticado');
  END IF;

  INSERT INTO public.granjas (
    user_id, farm_name, state, city, bird_count, selected_palette, marketing_source,
    egg_sale_price, bird_sale_price, litter_sale_price
  ) VALUES (
    v_user_id, farm_name_granja, state_granja, city_granja, bird_count_granja,
    selected_palette_granja, marketing_source_granja, egg_sale_price_granja,
    bird_sale_price_granja, litter_sale_price_granja
  ) RETURNING id INTO v_granja_id;

  RETURN json_build_object('success', true, 'granja_id', v_granja_id, 'message', 'Granja criada com sucesso!');

EXCEPTION WHEN OTHERS THEN
  RETURN json_build_object('success', false, 'error', SQLERRM);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- FUNÇÃO 2: Atualizar Granja
DROP FUNCTION IF EXISTS public.update_granja(UUID, VARCHAR, VARCHAR, VARCHAR, INTEGER, VARCHAR, VARCHAR, NUMERIC, NUMERIC, NUMERIC, BOOLEAN, VARCHAR, TIMESTAMPTZ, INTEGER);

CREATE OR REPLACE FUNCTION public.update_granja(
  granja_id UUID,
  farm_name_granja VARCHAR DEFAULT NULL,
  state_granja VARCHAR DEFAULT NULL,
  city_granja VARCHAR DEFAULT NULL,
  bird_count_granja INTEGER DEFAULT NULL,
  selected_palette_granja VARCHAR DEFAULT NULL,
  marketing_source_granja VARCHAR DEFAULT NULL,
  egg_sale_price_granja NUMERIC DEFAULT NULL,
  bird_sale_price_granja NUMERIC DEFAULT NULL,
  litter_sale_price_granja NUMERIC DEFAULT NULL,
  auto_backup_enabled_granja BOOLEAN DEFAULT NULL,
  auto_backup_frequency_granja VARCHAR DEFAULT NULL,
  auto_backup_last_run_at_granja TIMESTAMPTZ DEFAULT NULL,
  auto_backup_keep_count_granja INTEGER DEFAULT NULL
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
    farm_name = COALESCE(farm_name_granja, farm_name),
    state = COALESCE(state_granja, state),
    city = COALESCE(city_granja, city),
    bird_count = COALESCE(bird_count_granja, bird_count),
    selected_palette = COALESCE(selected_palette_granja, selected_palette),
    marketing_source = COALESCE(marketing_source_granja, marketing_source),
    egg_sale_price = COALESCE(egg_sale_price_granja, egg_sale_price),
    bird_sale_price = COALESCE(bird_sale_price_granja, bird_sale_price),
    litter_sale_price = COALESCE(litter_sale_price_granja, litter_sale_price),
    auto_backup_enabled = COALESCE(auto_backup_enabled_granja, auto_backup_enabled),
    auto_backup_frequency = COALESCE(auto_backup_frequency_granja, auto_backup_frequency),
    auto_backup_last_run_at = COALESCE(auto_backup_last_run_at_granja, auto_backup_last_run_at),
    auto_backup_keep_count = COALESCE(auto_backup_keep_count_granja, auto_backup_keep_count)
  WHERE id = granja_id AND user_id = v_user_id;

  RETURN json_build_object(
    'success', true,
    'message', 'Granja atualizada com sucesso!'
  );

EXCEPTION WHEN OTHERS THEN
  RETURN json_build_object('success', false, 'error', SQLERRM);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- FUNÇÃO 3: Deletar Granja
DROP FUNCTION IF EXISTS public.delete_granja(UUID);

CREATE OR REPLACE FUNCTION public.delete_granja(granja_id UUID)
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
  RETURN json_build_object('success', false, 'error', SQLERRM);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- FUNÇÃO 4: Listar Minhas Granjas
DROP FUNCTION IF EXISTS public.list_my_granjas();

CREATE OR REPLACE FUNCTION public.list_my_granjas()
RETURNS TABLE (
  id UUID,
  farm_name VARCHAR,
  state VARCHAR,
  city VARCHAR,
  bird_count INTEGER,
  selected_palette VARCHAR,
  marketing_source VARCHAR,
  egg_sale_price NUMERIC,
  bird_sale_price NUMERIC,
  litter_sale_price NUMERIC,
  auto_backup_enabled BOOLEAN,
  auto_backup_frequency VARCHAR,
  auto_backup_last_run_at TIMESTAMPTZ,
  auto_backup_keep_count INTEGER,
  created_at TIMESTAMPTZ
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
    g.farm_name,
    g.state,
    g.city,
    g.bird_count,
    g.selected_palette,
    g.marketing_source,
    g.egg_sale_price,
    g.bird_sale_price,
    g.litter_sale_price,
    g.auto_backup_enabled,
    g.auto_backup_frequency,
    g.auto_backup_last_run_at,
    g.auto_backup_keep_count,
    g.created_at
  FROM public.granjas g
  WHERE g.user_id = v_user_id
  ORDER BY g.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- FUNÇÃO 5: Obter Uma Granja pelo ID
DROP FUNCTION IF EXISTS public.get_granja(UUID);

CREATE OR REPLACE FUNCTION public.get_granja(granja_id UUID)
RETURNS TABLE (
  id UUID,
  farm_name VARCHAR,
  state VARCHAR,
  city VARCHAR,
  bird_count INTEGER,
  selected_palette VARCHAR,
  marketing_source VARCHAR,
  egg_sale_price NUMERIC,
  bird_sale_price NUMERIC,
  litter_sale_price NUMERIC,
  auto_backup_enabled BOOLEAN,
  auto_backup_frequency VARCHAR,
  auto_backup_last_run_at TIMESTAMPTZ,
  auto_backup_keep_count INTEGER,
  created_at TIMESTAMPTZ
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
    g.farm_name,
    g.state,
    g.city,
    g.bird_count,
    g.selected_palette,
    g.marketing_source,
    g.egg_sale_price,
    g.bird_sale_price,
    g.litter_sale_price,
    g.auto_backup_enabled,
    g.auto_backup_frequency,
    g.auto_backup_last_run_at,
    g.auto_backup_keep_count,
    g.created_at
  FROM public.granjas g
  WHERE g.id = granja_id AND g.user_id = v_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- =====================================================
-- PASSO 7: PERMISSÕES
-- =====================================================
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;

-- =====================================================
-- FIM DO SCRIPT!
-- =====================================================
