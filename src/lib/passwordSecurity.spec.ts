import { describe, expect, it } from 'vitest';
import {
  BCRYPT_MIN_WORK_FACTOR,
  PASSWORD_MIN_LENGTH,
  RECOMMENDED_PASSWORD_HASHING,
  validatePasswordPolicy,
} from '@/lib/passwordSecurity';

describe('password security policy', () => {
  it('requires a modern strong password profile', () => {
    const result = validatePasswordPolicy('SenhaForte!2026', {
      email: 'produtor@example.com',
      fullName: 'Maria Silva',
      phone: '(11) 99999-1234',
    });

    expect(result.isValid).toBe(true);
  });

  it('rejects weak, common, and personal passwords', () => {
    const result = validatePasswordPolicy('Maria123!', {
      email: 'maria@example.com',
      fullName: 'Maria Silva',
      phone: '(11) 99999-1234',
    });

    expect(result.isValid).toBe(false);
    expect(result.messages).toContain(`No minimo ${PASSWORD_MIN_LENGTH} caracteres`);
    expect(result.messages).toContain('Nao conter nome, e-mail ou telefone');
  });

  it('documents accepted server-side hash requirements', () => {
    expect(BCRYPT_MIN_WORK_FACTOR).toBeGreaterThanOrEqual(10);
    expect(RECOMMENDED_PASSWORD_HASHING).toContain('Argon2id');
    expect(RECOMMENDED_PASSWORD_HASHING).toContain('bcrypt');
  });
});