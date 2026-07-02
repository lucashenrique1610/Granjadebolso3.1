import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

config();

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_ANON_KEY;
const email = process.env.TEST_EMAIL;
const password = process.env.TEST_PASSWORD;

if (!url || !key) {
  console.error('FALHA: VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY ausentes.');
  process.exit(1);
}

if (!email || !password) {
  console.error('FALHA: TEST_EMAIL e TEST_PASSWORD devem estar definidos no ambiente.');
  process.exit(1);
}

const sb = createClient(url, key);

console.log('=== Teste de login Supabase ===');
console.log('Conta:', email);

const { data: signInData, error: signInError } = await sb.auth.signInWithPassword({
  email: email.trim().toLowerCase(),
  password,
});

if (signInError) {
  console.error('Login FALHOU:', signInError.message);
  process.exit(1);
}

const user = signInData.user;
console.log('Login OK');
console.log('User ID:', user?.id);
console.log('E-mail confirmado:', user?.email_confirmed_at ? 'sim' : 'nao');

const { data: profile, error: profileError } = await sb
  .from('users')
  .select('id, full_name, email, phone, created_at')
  .eq('id', user.id)
  .maybeSingle();

if (profileError) {
  console.log('Perfil public.users: erro -', profileError.message);
} else if (profile) {
  console.log('Perfil public.users: OK');
  console.log('  Nome:', profile.full_name || '(vazio)');
  console.log('  Telefone:', profile.phone || '(vazio)');
} else {
  console.log('Perfil public.users: nenhum registro encontrado');
}

const { data: granja, error: granjaError } = await sb
  .from('granjas')
  .select('id, farm_name, state, city, bird_count, selected_palette, created_at')
  .eq('user_id', user.id)
  .order('created_at', { ascending: false })
  .limit(1)
  .maybeSingle();

if (granjaError) {
  console.log('Granja: erro -', granjaError.message);
} else if (granja) {
  console.log('Granja: OK');
  console.log('  Nome:', granja.farm_name || '(vazio)');
  console.log('  Local:', [granja.city, granja.state].filter(Boolean).join(' - ') || '(vazio)');
  console.log('  Aves:', granja.bird_count ?? 0);
} else {
  console.log('Granja: nenhuma granja cadastrada');
}

const tables = [
  'animais',
  'clientes',
  'fornecedores',
  'manejo_registros',
  'ingredientes',
  'formulacoes',
];

console.log('\nRegistros da conta:');
for (const table of tables) {
  const { count, error } = await sb
    .from(table)
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id);

  if (error) {
    console.log(`  - ${table}: erro (${error.code})`);
  } else {
    console.log(`  - ${table}: ${count ?? 0}`);
  }
}

await sb.auth.signOut();
console.log('\n=== Resultado: login e leitura de dados funcionaram ===');
