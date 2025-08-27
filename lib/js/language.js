export default class Language {
    constructor(code) {
        this.code = code.toUpperCase();
        this.translations = {};
    }

    sets(translations) {
        for (let key in translations) {
            this.set(key, translations[key]);
        }
        return this;
    }

    get(key, def) {
        def = def || key;
        key = key.toUpperCase();

        if (this.translations.hasOwnProperty(key)) {
            return this.translations[key];
        }

        return def;
    }

    set(key, value) {
        key = key.toUpperCase();
        this.translations[key] = value;
        return this;
    }
}
