import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

config();

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_ANON_KEY;
const email = process.env.TEST_EMAIL;
const password = process.env.TEST_PASSWORD;

const sb = createClient(url, key);

const { data: auth, error: signInError } = await sb.auth.signInWithPassword({
  email: email.trim().toLowerCase(),
  password,
});
if (signInError) {
  console.error('Login falhou:', signInError.message);
  process.exit(1);
}

const uid = auth.user.id;
console.log('Auth UID:', uid);
console.log('Auth email:', auth.user.email);

async function probe(label, fn) {
  try {
    const result = await fn();
    console.log(`\n[${label}]`);
    console.log(JSON.stringify(result, null, 2));
  } catch (e) {
    console.log(`\n[${label}] EXCEPTION:`, e.message);
  }
}

await probe('users select *', async () => {
  const { data, error } = await sb.from('users').select('*').eq('id', uid);
  return { error: error?.message ?? null, count: data?.length ?? 0, sample: data?.[0] ?? null };
});

await probe('users columns via select id,full_name,email', async () => {
  const { data, error } = await sb.from('users').select('id, full_name, email').eq('id', uid).maybeSingle();
  return { error: error?.message ?? null, data };
});

await probe('granjas select * by user_id', async () => {
  const { data, error } = await sb.from('granjas').select('*').eq('user_id', uid);
  return { error: error?.message ?? null, count: data?.length ?? 0, ids: data?.map((g) => g.id) ?? [] };
});

await probe('granjas without user filter (RLS should limit)', async () => {
  const { data, error } = await sb.from('granjas').select('id, user_id, farm_name');
  return { error: error?.message ?? null, count: data?.length ?? 0, rows: data ?? [] };
});

const tables = [
  'animais',
  'clientes',
  'fornecedores',
  'compras',
  'galpoes',
  'profissionais_saude',
  'saude_registros',
  'estoque_veterinario',
  'mortalidade_registros',
  'manejo_registros',
  'disponibilidade_venda',
  'vendas',
  'ingredientes',
  'formulacoes',
  'estoque_racao_formulada',
  'backups',
];

console.log('\n=== Contagens por user_id ===');
for (const table of tables) {
  const { count, error } = await sb.from(table).select('*', { count: 'exact', head: true }).eq('user_id', uid);
  console.log(`${table}: ${error ? `ERRO ${error.code} ${error.message}` : count ?? 0}`);
}

console.log('\n=== Contagens totais visiveis (sem filtro user_id) ===');
for (const table of tables) {
  const { count, error } = await sb.from(table).select('*', { count: 'exact', head: true });
  console.log(`${table}: ${error ? `ERRO ${error.code}` : count ?? 0}`);
}

await probe('animais sample rows', async () => {
  const { data, error } = await sb.from('animais').select('id, user_id, granja_id, tag, lot').limit(5);
  return { error: error?.message ?? null, rows: data ?? [] };
});

await probe('ingredientes select * limit 1 (schema probe)', async () => {
  const { data, error } = await sb.from('ingredientes').select('*').limit(1);
  if (error) return { error: error.message };
  return { columns: data?.[0] ? Object.keys(data[0]) : [], row: data?.[0] ?? null };
});

await probe('mortalidade_registros select * limit 1 (schema probe)', async () => {
  const { data, error } = await sb.from('mortalidade_registros').select('*').limit(1);
  if (error) return { error: error.message };
  return { columns: data?.[0] ? Object.keys(data[0]) : [], row: data?.[0] ?? null };
});

await probe('manejo_registros select * limit 1 (schema probe)', async () => {
  const { data, error } = await sb.from('manejo_registros').select('*').limit(1);
  if (error) return { error: error.message };
  return { columns: data?.[0] ? Object.keys(data[0]) : [], row: data?.[0] ?? null };
});

await sb.auth.signOut();
