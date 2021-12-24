import { validateCardNumber, validateCVV2, validateExpMonth, validateExpYear, determineCardType, checkIfExpDateValid} from './utils';

describe('card number validation 1', () => {
    test('card 1', () => {
        expect(validateCardNumber('7')).toBe('');
    });
});

describe('card number validation 2', () => {
    test('card 2', () => {
        expect(validateCardNumber('3')).toBe('3');
    });
});

describe('card number validation 3', () => {
    test('card 3', () => {
        expect(validateCardNumber('37')).toBe('37');
    });
});

describe('card number validation 4', () => {
    test('card 4', () => {
        expect(validateCardNumber('39')).toBe('3');
    });
});

describe('card number validation 5', () => {
    test('card 5', () => {
        expect(validateCardNumber('4242-4242-4242-42424')).toBe('4242-4242-4242-4242');
    });
});

describe('CVV2 validation 1', () => {
    test('CVV2 1', () => {
        expect(validateCVV2('33333')).toBe('3333');
    });
});

describe('CVV2 validation 2', () => {
    test('CVV2 2', () => {
        expect(validateCVV2('3a')).toBe('3');
    });
});

describe('Exp month validation 1', () => {
    test('Exp month 1', () => {
        expect(validateExpMonth('a')).toBe('');
    });
});

describe('Exp month validation 2', () => {
    test('Exp month 2', () => {
        expect(validateExpMonth('123')).toBe('12');
    });
});

describe('Exp year validation 1', () => {
    test('Exp year 1', () => {
        expect(validateExpYear('a')).toBe('');
    });
});

describe('Exp year validation 2', () => {
    test('Exp year 2', () => {
        expect(validateExpYear('20200')).toBe('2020');
    });
});