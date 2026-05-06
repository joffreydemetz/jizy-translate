import jTranslate from '../lib/index.js';

test('default export is the jTranslate constructor', () => {
    expect(typeof jTranslate).toBe('function');
    expect(jTranslate.name).toBe('jTranslate');
});

test('can be instantiated with no args', () => {
    const t = new jTranslate();
    expect(t).toBeInstanceOf(jTranslate);
    expect(t.defaultLanguage).toBe('EN');
    expect(t.langCode).toBeNull();
    expect(t.store).toEqual({});
});
