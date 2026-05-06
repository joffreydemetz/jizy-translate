import { jest } from '@jest/globals';
import jTranslate from '../lib/index.js';

describe('constructor', () => {
    test('defaults — EN, empty store, no active langCode', () => {
        const t = new jTranslate();
        expect(t.defaultLanguage).toBe('EN');
        expect(t.langCode).toBeNull();
        expect(t.store).toEqual({});
    });

    test('store seeds languages and sets langCode to the first key', () => {
        const t = new jTranslate({
            fr: { hello: 'Bonjour' },
            en: { hello: 'Hello' },
        });
        expect(t.hasLanguage('fr')).toBe(true);
        expect(t.hasLanguage('en')).toBe(true);
        expect(t.langCode).toBe('FR');
    });

    test('defaultLanguage arg is uppercased', () => {
        const t = new jTranslate(null, 'fr');
        expect(t.defaultLanguage).toBe('FR');
    });

    test('null/undefined store leaves the store empty', () => {
        const t = new jTranslate(null);
        expect(t.store).toEqual({});
        expect(t.langCode).toBeNull();
    });
});

describe('setDefaultLanguage', () => {
    test('uppercases and is chainable', () => {
        const t = new jTranslate();
        expect(t.setDefaultLanguage('fr')).toBe(t);
        expect(t.defaultLanguage).toBe('FR');
    });

    test('falsy value leaves default untouched', () => {
        const t = new jTranslate();
        t.setDefaultLanguage(null);
        expect(t.defaultLanguage).toBe('EN');
    });
});

describe('addStore / addTranslations', () => {
    test('addTranslations creates a Language and returns it', () => {
        const t = new jTranslate();
        const lang = t.addTranslations('fr', { hello: 'Bonjour' });
        expect(t.hasLanguage('fr')).toBe(true);
        expect(lang.get('hello')).toBe('Bonjour');
    });

    test('addTranslations is additive — second call merges into the same Language', () => {
        const t = new jTranslate();
        t.addTranslations('fr', { hello: 'Bonjour' });
        t.addTranslations('fr', { bye: 'Au revoir' });
        expect(t.store.FR.get('hello')).toBe('Bonjour');
        expect(t.store.FR.get('bye')).toBe('Au revoir');
    });

    test('addStore is chainable', () => {
        const t = new jTranslate();
        expect(t.addStore({ en: { a: 'A' } })).toBe(t);
    });

    test('addStore ignores non-object input', () => {
        const t = new jTranslate();
        t.addStore('not-an-object');
        t.addStore(null);
        expect(t.store).toEqual({});
    });
});

describe('hasLanguage / changeLanguage', () => {
    test('hasLanguage is case-insensitive', () => {
        const t = new jTranslate({ fr: { hello: 'Bonjour' } });
        expect(t.hasLanguage('fr')).toBe(true);
        expect(t.hasLanguage('FR')).toBe(true);
        expect(t.hasLanguage('Fr')).toBe(true);
        expect(t.hasLanguage('de')).toBe(false);
    });

    test('changeLanguage updates langCode (uppercased)', () => {
        const t = new jTranslate({ fr: {}, en: {} });
        t.changeLanguage('en');
        expect(t.langCode).toBe('EN');
    });

    test('changeLanguage warns and is a no-op for unknown language', () => {
        const t = new jTranslate({ fr: {} });
        const spy = jest.spyOn(console, 'warn').mockImplementation(() => { });
        t.changeLanguage('de');
        expect(spy).toHaveBeenCalledWith(expect.stringContaining('de'));
        expect(t.langCode).toBe('FR');
        spy.mockRestore();
    });

    test('changeLanguage is chainable', () => {
        const t = new jTranslate({ fr: {} });
        expect(t.changeLanguage('fr')).toBe(t);
    });
});

describe('get / set', () => {
    test('get reads from the active language', () => {
        const t = new jTranslate({
            fr: { hello: 'Bonjour' },
            en: { hello: 'Hello' },
        });
        t.changeLanguage('en');
        expect(t.get('hello')).toBe('Hello');
        t.changeLanguage('fr');
        expect(t.get('hello')).toBe('Bonjour');
    });

    test('get falls back to provided default, then to the key itself', () => {
        const t = new jTranslate({ en: { hello: 'Hello' } });
        expect(t.get('missing', 'fallback')).toBe('fallback');
        expect(t.get('missing')).toBe('missing');
    });

    test('set writes into the active language', () => {
        const t = new jTranslate({ en: {} });
        t.set('greet', 'Hello');
        expect(t.get('greet')).toBe('Hello');
    });

    test('set is chainable', () => {
        const t = new jTranslate({ en: {} });
        expect(t.set('a', 'A')).toBe(t);
    });
});
