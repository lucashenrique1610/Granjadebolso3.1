export const PASSWORD_MIN_LENGTH = 12;
export const BCRYPT_MIN_WORK_FACTOR = 10;
export const RECOMMENDED_PASSWORD_HASHING =
  'Argon2id preferred; bcrypt acceptable with work factor >= 10 and a unique random salt per password.';

export interface PasswordPolicyContext {
  email?: string;
  fullName?: string;
  phone?: string;
}

export interface PasswordPolicyCheck {
  id:
    | 'length'
    | 'uppercase'
    | 'lowercase'
    | 'number'
    | 'symbol'
    | 'notCommon'
    | 'notPersonal'
    | 'noWhitespaceEdges';
  label: string;
  passed: boolean;
}

export interface PasswordPolicyResult {
  checks: PasswordPolicyCheck[];
  isValid: boolean;
  messages: string[];
}

const COMMON_PASSWORDS = new Set([
  '123456',
  '12345678',
  '123456789',
  'password',
  'senha',
  'qwerty',
  'admin',
  'letmein',
  'welcome',
  'iloveyou',
  'granjadebolso',
]);

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function getPersonalTokens(context: PasswordPolicyContext) {
  const tokens = [
    context.email?.split('@')[0],
    ...(context.fullName?.split(/\s+/) ?? []),
    context.phone?.replace(/\D/g, '').slice(-4),
  ];

  return tokens
    .map((token) => normalizeText(token ?? '').replace(/[^a-z0-9]/g, ''))
    .filter((token) => token.length >= 4);
}

export function validatePasswordPolicy(
  password: string,
  context: PasswordPolicyContext = {},
): PasswordPolicyResult {
  const normalizedPassword = normalizeText(password);
  const compactPassword = normalizedPassword.replace(/\s+/g, '');
  const personalTokens = getPersonalTokens(context);
  const containsPersonalData = personalTokens.some((token) => compactPassword.includes(token));

  const checks: PasswordPolicyCheck[] = [
    {
      id: 'length',
      label: `No minimo ${PASSWORD_MIN_LENGTH} caracteres`,
      passed: password.length >= PASSWORD_MIN_LENGTH,
    },
    {
      id: 'uppercase',
      label: 'Uma letra maiuscula',
      passed: /[A-Z]/.test(password),
    },
    {
      id: 'lowercase',
      label: 'Uma letra minuscula',
      passed: /[a-z]/.test(password),
    },
    {
      id: 'number',
      label: 'Pelo menos um numero',
      passed: /[0-9]/.test(password),
    },
    {
      id: 'symbol',
      label: 'Pelo menos um simbolo',
      passed: /[^A-Za-z0-9\s]/.test(password),
    },
    {
      id: 'notCommon',
      label: 'Nao usar senha comum',
      passed: !COMMON_PASSWORDS.has(compactPassword),
    },
    {
      id: 'notPersonal',
      label: 'Nao conter nome, e-mail ou telefone',
      passed: !containsPersonalData,
    },
    {
      id: 'noWhitespaceEdges',
      label: 'Sem espacos no inicio ou fim',
      passed: password.length === password.trim().length,
    },
  ];

  const messages = checks.filter((check) => !check.passed).map((check) => check.label);

  return {
    checks,
    isValid: messages.length === 0,
    messages,
  };
}

export function assertPasswordPolicy(password: string, context?: PasswordPolicyContext) {
  const result = validatePasswordPolicy(password, context);

  if (!result.isValid) {
    throw new Error(`Senha fora da politica de seguranca: ${result.messages.join('; ')}.`);
  }
}