-- =====================================================
-- GRANJA DE BOLSO - Migração incremental (idempotente)
-- =====================================================
-- Execute no SQL Editor do Supabase APÓS supabase_final.sql.
-- Alinha o banco com src/lib/supabase.ts sem apagar dados existentes.
--
-- NÃO use supabase_v2.sql: ele define outro schema (colunas em português
-- como granjas.nome, animais.nome) incompatível com o app atual.

-- =====================================================
-- 1. COLUNAS AUSENTES EM public.users
-- =====================================================
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS phone TEXT;

-- Backfill de perfis para contas auth já existentes sem linha em public.users
INSERT INTO public.users (id, full_name, email, phone)
SELECT
  au.id,
  COALESCE(au.raw_user_meta_data->>'full_name', ''),
  au.email,
  COALESCE(au.raw_user_meta_data->>'phone', NULL)
FROM auth.users au
LEFT JOIN public.users pu ON pu.id = au.id
WHERE pu.id IS NULL;

-- =====================================================
-- 2. SAÚDE - campos extras usados pelo app
-- =====================================================
ALTER TABLE public.saude_registros ADD COLUMN IF NOT EXISTS vaccine_name TEXT;
ALTER TABLE public.saude_registros ADD COLUMN IF NOT EXISTS medication_name TEXT;
ALTER TABLE public.saude_registros ADD COLUMN IF NOT EXISTS application_method TEXT;
ALTER TABLE public.saude_registros ADD COLUMN IF NOT EXISTS treatment_details TEXT;

-- =====================================================
-- 3. MANEJO - vínculo com formulação de ração
-- =====================================================
ALTER TABLE public.manejo_registros ADD COLUMN IF NOT EXISTS formulation_id UUID;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'manejo_registros_formulation_id_fkey'
  ) THEN
    ALTER TABLE public.manejo_registros
      ADD CONSTRAINT manejo_registros_formulation_id_fkey
      FOREIGN KEY (formulation_id) REFERENCES public.formulacoes(id) ON DELETE SET NULL;
  END IF;
END $$;

-- =====================================================
-- 4. FORMULAÇÕES - vínculo com lote/animal
-- =====================================================
ALTER TABLE public.formulacoes ADD COLUMN IF NOT EXISTS animal_id UUID;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'formulacoes_animal_id_fkey'
  ) THEN
    ALTER TABLE public.formulacoes
      ADD CONSTRAINT formulacoes_animal_id_fkey
      FOREIGN KEY (animal_id) REFERENCES public.animais(id) ON DELETE SET NULL;
  END IF;
END $$;

-- =====================================================
-- 5. INGREDIENTES - campos nutricionais/comerciais extras
-- =====================================================
ALTER TABLE public.ingredientes ADD COLUMN IF NOT EXISTS phosphorus_total NUMERIC;
ALTER TABLE public.ingredientes ADD COLUMN IF NOT EXISTS phosphorus_available NUMERIC;
ALTER TABLE public.ingredientes ADD COLUMN IF NOT EXISTS sodium NUMERIC;
ALTER TABLE public.ingredientes ADD COLUMN IF NOT EXISTS potassium NUMERIC;
ALTER TABLE public.ingredientes ADD COLUMN IF NOT EXISTS threonine NUMERIC;
ALTER TABLE public.ingredientes ADD COLUMN IF NOT EXISTS tryptophan NUMERIC;
ALTER TABLE public.ingredientes ADD COLUMN IF NOT EXISTS ether_extract NUMERIC;
ALTER TABLE public.ingredientes ADD COLUMN IF NOT EXISTS data_source TEXT DEFAULT '';
ALTER TABLE public.ingredientes ADD COLUMN IF NOT EXISTS reference_year INTEGER;
ALTER TABLE public.ingredientes ADD COLUMN IF NOT EXISTS last_updated TIMESTAMPTZ;
ALTER TABLE public.ingredientes ADD COLUMN IF NOT EXISTS technical_notes TEXT DEFAULT '';
ALTER TABLE public.ingredientes ADD COLUMN IF NOT EXISTS user_editable BOOLEAN DEFAULT true;

-- Copia valores legados de phosphorus quando existirem
UPDATE public.ingredientes
SET
  phosphorus_available = COALESCE(phosphorus_available, phosphorus),
  phosphorus_total = COALESCE(phosphorus_total, phosphorus)
WHERE phosphorus IS NOT NULL
  AND (phosphorus_available IS NULL OR phosphorus_total IS NULL);

-- =====================================================
-- 6. TRIGGER auth.users -> public.users (com phone)
-- =====================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, full_name, email, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'phone', NULL)
  )
  ON CONFLICT (id) DO UPDATE
  SET
    full_name = COALESCE(EXCLUDED.full_name, public.users.full_name),
    email = EXCLUDED.email,
    phone = COALESCE(EXCLUDED.phone, public.users.phone);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- 7. POLÍTICA RLS de INSERT em public.users (caso ausente)
-- =====================================================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'users'
      AND policyname = 'Usuários podem inserir seu próprio perfil'
  ) THEN
    CREATE POLICY "Usuários podem inserir seu próprio perfil"
      ON public.users
      FOR INSERT
      WITH CHECK (auth.uid() = id);
  END IF;
END $$;
