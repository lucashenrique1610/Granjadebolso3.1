import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

config();

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_ANON_KEY;

console.log('=== Teste de Conexão Supabase ===');
console.log('URL configurada:', url ? `${url.substring(0, 40)}...` : 'AUSENTE');
console.log('Anon key configurada:', key ? `Sim (${key.length} chars)` : 'AUSENTE');

if (!url || !key) {
  console.error('FALHA: Variáveis de ambiente ausentes');
  process.exit(1);
}

function isServiceRoleKey(keyValue) {
  try {
    const parts = keyValue.split('.');
    if (parts.length < 2) return false;
    const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = payload + '='.repeat((4 - (payload.length % 4)) % 4);
    const decoded = Buffer.from(padded, 'base64').toString('utf8');
    const parsed = JSON.parse(decoded);
    return parsed?.role === 'service_role';
  } catch {
    return false;
  }
}

if (isServiceRoleKey(key)) {
  console.warn('AVISO: A chave parece ser service_role — use a anon public key no front-end.');
}

const sb = createClient(url, key);

const healthRes = await fetch(`${url}/auth/v1/health`, {
  headers: { apikey: key },
});
console.log(`\n1. Auth health: ${healthRes.status} ${healthRes.statusText}`);

const { error: sessionError } = await sb.auth.getSession();
console.log(
  '2. Auth service:',
  sessionError ? `ERRO - ${sessionError.message}` : 'OK (sem sessão ativa)',
);

const tables = ['users', 'granjas', 'animais', 'manejo_registros', 'ingredientes'];
console.log('\n3. Teste de tabelas (conexão + schema):');
for (const table of tables) {
  const { error, count } = await sb.from(table).select('*', { count: 'exact', head: true });
  if (error) {
    console.log(`   - ${table}: erro ${error.code} — ${error.message}`);
  } else {
    console.log(`   - ${table}: OK (registros visíveis: ${count ?? 0})`);
  }
}

if (healthRes.ok && !sessionError) {
  console.log('\n=== Resultado: Conexão com Supabase estabelecida com sucesso ===');
} else {
  console.error('\n=== Resultado: Falha parcial na conexão ===');
  process.exit(1);
}
