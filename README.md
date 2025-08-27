# jizy-translate

A simple translator for your JavaScript applications.

## Modules

### `lib/js/language.js`
Defines a `Language` class for managing translations for a specific language code.
- `sets(translations)`: Set multiple translations.
- `set(key, value)`: Set a translation.
- `get(key, def)`: Get a translation by key.

### `lib/js/translate.js`
Defines a `jTranslate` class for managing multiple languages and switching between them.
- `addTranslations(langCode, translations)`: Add translations for a language.
- `get(key, def)`: Get a translation for the current language.
- `set(key, value)`: Set a translation for the current language.
- `changeLanguage(langCode)`: Switch the active language.
- `updateDOM(langCode)`: Update DOM elements with `[data-i18n]` attributes.

## Usage Example

```js
import jTranslate from './lib/js/translate.js';

const translations = {
	EN: { HELLO: "Hello", BYE: "Goodbye" },
	FR: { HELLO: "Bonjour", BYE: "Au revoir" }
};

const jt = new jTranslate(translations, 'EN');

console.log(jt.get('HELLO')); // "Hello"
jt.changeLanguage('FR');
console.log(jt.get('HELLO')); // "Bonjour"

// Dynamically update DOM elements with data-i18n attributes
// jt.updateDOM();
```
