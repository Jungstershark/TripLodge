import { validateEmail, validatePassword } from '../../UserAuth/validation';

describe('Validation Functions', () => {
  describe('validateEmail', () => {
    test('TC_VE_001: Validates correct email format', () => {
      expect(validateEmail('test@example.com')).toBe(true);
    });

    test('TC_VE_002: Validates incorrect email format (missing @)', () => {
      expect(validateEmail('testexample.com')).toBe(false);
    });

    test('TC_VE_003: Validates incorrect email format (missing domain)', () => {
      expect(validateEmail('test@')).toBe(false);
    });

    test('TC_VE_004: Validates incorrect email format (missing local part)', () => {
      expect(validateEmail('@example.com')).toBe(false);
    });

    test('TC_VE_005: Validates incorrect email format (extra spaces)', () => {
      expect(validateEmail(' test@example.com ')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    test('TC_VP_001: Validates correct password format', () => {
      expect(validatePassword('Password123!')).toBe(true);
    });

    test('TC_VP_002: Validates incorrect password format (too short)', () => {
      expect(validatePassword('Pass1!')).toBe(false);
    });

    test('TC_VP_003: Validates incorrect password format (missing uppercase)', () => {
      expect(validatePassword('password123!')).toBe(false);
    });

    test('TC_VP_004: Validates incorrect password format (missing lowercase)', () => {
      expect(validatePassword('PASSWORD123!')).toBe(false);
    });

    test('TC_VP_005: Validates incorrect password format (missing digit)', () => {
      expect(validatePassword('Password!')).toBe(false);
    });

    test('TC_VP_006: Validates incorrect password format (missing special character)', () => {
      expect(validatePassword('Password123')).toBe(false);
    });
  });
});
