/**
 * @jest-environment jsdom
 */
import jTranslate from '../lib/index.js';

beforeEach(() => {
    document.body.innerHTML = '';
});

test('updateDOM replaces textContent of [data-i18n] elements with the active translation', () => {
    document.body.innerHTML = `
        <h1 data-i18n="title"></h1>
        <p data-i18n="body">placeholder</p>
        <span>untouched</span>
    `;

    const t = new jTranslate({
        en: { title: 'Hello', body: 'Welcome' },
    });

    t.updateDOM();

    expect(document.querySelector('h1').textContent).toBe('Hello');
    expect(document.querySelector('p').textContent).toBe('Welcome');
    expect(document.querySelector('span').textContent).toBe('untouched');
});

test('updateDOM(langCode) switches the active language before updating', () => {
    document.body.innerHTML = `<h1 data-i18n="hello"></h1>`;

    const t = new jTranslate({
        en: { hello: 'Hello' },
        fr: { hello: 'Bonjour' },
    });

    t.updateDOM('fr');

    expect(document.querySelector('h1').textContent).toBe('Bonjour');
    expect(t.langCode).toBe('FR');
});

test('updateDOM falls back to writing the key itself when no translation exists', () => {
    document.body.innerHTML = `<p data-i18n="missing">placeholder</p>`;

    const t = new jTranslate({ en: { hello: 'Hello' } });
    t.updateDOM();

    expect(document.querySelector('p').textContent).toBe('missing');
});

test('updateDOM ignores [data-i18n] elements with an empty key', () => {
    document.body.innerHTML = `<p data-i18n="">keep me</p>`;

    const t = new jTranslate({ en: { hello: 'Hello' } });
    t.updateDOM();

    expect(document.querySelector('p').textContent).toBe('keep me');
});
