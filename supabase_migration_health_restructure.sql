-- =====================================================================
-- MIGRAÇÃO: Reestruturação do Sistema de Saúde
-- Data: 2026-07-01
-- Objetivo: Adicionar campos para as novas categorias (Consulta, Tratamento, Monitoramento)
-- =====================================================================

-- 1. Adicionar novos campos à tabela saude_registros
ALTER TABLE saude_registros
ADD COLUMN IF NOT EXISTS consultation_cost NUMERIC,
ADD COLUMN IF NOT EXISTS return_date TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS treatment_type TEXT,
ADD COLUMN IF NOT EXISTS product_name TEXT,
ADD COLUMN IF NOT EXISTS next_dose_date TIMESTAMPTZ;

-- 2. Tornar campos opcionais que eram obrigatórios (para retrocompatibilidade)
-- Obs: No PostgreSQL, já são opcionais por padrão, mas vamos garantir

-- 3. Adicionar comentários aos novos campos
COMMENT ON COLUMN saude_registros.consultation_cost IS 'Valor monetário da consulta (apenas para procedure_type = consulta)';
COMMENT ON COLUMN saude_registros.return_date IS 'Data de retorno da consulta (apenas para procedure_type = consulta)';
COMMENT ON COLUMN saude_registros.treatment_type IS 'Tipo de tratamento: vacina ou medicamento (apenas para procedure_type = tratamento)';
COMMENT ON COLUMN saude_registros.product_name IS 'Nome do produto/vacina/medicamento (apenas para procedure_type = tratamento)';
COMMENT ON COLUMN saude_registros.next_dose_date IS 'Data da próxima dose (apenas para procedure_type = tratamento)';

-- 4. (Opcional) Criar índice para otimizar consultas de alertas de próximas doses
CREATE INDEX IF NOT EXISTS idx_saude_registros_next_dose_date
ON saude_registros(next_dose_date)
WHERE next_dose_date IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_saude_registros_return_date
ON saude_registros(return_date)
WHERE return_date IS NOT NULL;

-- =====================================================================
-- FIM DA MIGRAÇÃO
-- =====================================================================
