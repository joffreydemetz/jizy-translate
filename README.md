# jizy-translate

A simple translator for your JavaScript applications: one key/value store per language, an active
language, and a helper that fills `[data-i18n]` elements.

## Install

```sh
npm i jizy-translate
```

| Entry | What |
|---|---|
| `lib/index.js` | ESM entry, default export `jTranslate` (a class) |
| `dist/js/jizy-translate.min.js` | Browser bundle, sets the global `window.jTranslate` |

[`jizy-factory`](https://www.npmjs.com/package/jizy-factory) creates one as `JiZy.i18n`.

## Usage Example

```js
import jTranslate from 'jizy-translate';

const translations = {
	EN: { HELLO: "Hello", BYE: "Goodbye" },
	FR: { HELLO: "Bonjour", BYE: "Au revoir" }
};

const jt = new jTranslate(translations, 'EN');

console.log(jt.get('HELLO')); // "Hello"
jt.changeLanguage('FR');
console.log(jt.get('HELLO')); // "Bonjour"

// Fill every element carrying a data-i18n="KEY" attribute
jt.updateDOM();
```

Bootstrap from server data in one call (since 2.2.0):

```js
JiZy.i18n.init('fr', { CLOSE: 'Fermer', CONFIRM: 'Confirmer' });
```

Language codes and keys are case-insensitive: both are stored upper-cased, so `get('hello')` and
`get('HELLO')` are the same key. A missing key returns the default you pass, or the key itself.

## Modules

### `lib/js/translate.js`
Defines the `jTranslate` class, which manages several languages and the active one.
- `new jTranslate(store = null, defaultLanguage = null)`: `store` is `{ CODE: { KEY: 'text' } }`. The first language of the store becomes the active one; `defaultLanguage` (default `EN`) is used while no language is active.
- `init(langCode, translations)`: Add translations for a language and make it the active one (since 2.2.0).
- `addTranslations(langCode, translations)`: Add translations for a language; returns its `Language`.
- `addStore(store)`: Add several languages at once.
- `setDefaultLanguage(langCode)`: Change the fallback language.
- `hasLanguage(langCode)`: Whether the language has been registered.
- `changeLanguage(langCode)`: Switch the active language (a warning is logged for an unknown one).
- `get(key, def)`: Get a translation for the active language.
- `set(key, value)`: Set a translation for the active language.
- `updateDOM(langCode)`: Optionally switch language, then set the text of every `[data-i18n]` element to its translation.

`get()` and `set()` need the active (or default) language to be registered: on an empty translator
they throw.

### `lib/js/language.js`
Defines a `Language` class for managing translations for a specific language code.
- `sets(translations)`: Set multiple translations.
- `set(key, value)`: Set a translation.
- `get(key, def)`: Get a translation by key.

## Tests

```sh
npm test
```

Jest, run in ESM mode (`node --experimental-vm-modules`).

## Build

```sh
npm run jpack:dist      # rebuild dist/ from lib/ (dist/ is committed)
```

## License

MIT — see [LICENSE](LICENSE).
