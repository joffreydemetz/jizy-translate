import Language from '../lib/js/language.js';

test('constructor uppercases the code', () => {
    const lang = new Language('fr');
    expect(lang.code).toBe('FR');
    expect(lang.translations).toEqual({});
});

test('set / get — keys are case-insensitive (stored uppercase)', () => {
    const lang = new Language('en');
    lang.set('hello', 'Hello');
    expect(lang.get('hello')).toBe('Hello');
    expect(lang.get('HELLO')).toBe('Hello');
    expect(lang.get('Hello')).toBe('Hello');
    expect(lang.translations).toEqual({ HELLO: 'Hello' });
});

test('set returns the Language instance (chainable)', () => {
    const lang = new Language('en');
    expect(lang.set('a', 'A')).toBe(lang);
});

test('sets bulk-loads translations', () => {
    const lang = new Language('en');
    lang.sets({ hello: 'Hello', bye: 'Bye' });
    expect(lang.get('hello')).toBe('Hello');
    expect(lang.get('bye')).toBe('Bye');
});

test('sets returns the Language instance (chainable)', () => {
    const lang = new Language('en');
    expect(lang.sets({ a: 'A' })).toBe(lang);
});

test('get falls back to the default when key is missing', () => {
    const lang = new Language('en');
    expect(lang.get('missing', 'fallback')).toBe('fallback');
});

test('get falls back to the key itself when no default is given', () => {
    const lang = new Language('en');
    expect(lang.get('missing')).toBe('missing');
});

test('set overwrites a previous value for the same key', () => {
    const lang = new Language('en');
    lang.set('greet', 'Hi');
    lang.set('GREET', 'Hello');
    expect(lang.get('greet')).toBe('Hello');
});
