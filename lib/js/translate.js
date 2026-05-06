import Language from "./language.js";

export default class jTranslate {
    constructor(store = null, defaultLanguage = null) {
        this.store = {};
        this.defaultLanguage = 'EN';
        this.langCode = null;

        this.setDefaultLanguage(defaultLanguage);
        this.addStore(store);
    }

    setDefaultLanguage(defaultLanguage) {
        if (defaultLanguage) {
            this.defaultLanguage = defaultLanguage.toUpperCase();
        }
        return this;
    }

    addStore(store) {
        if (store && typeof store === "object") {
            for (let [langCode, translations] of Object.entries(store)) {
                langCode = langCode.toUpperCase();

                this.addTranslations(langCode, translations);

                if (!this.langCode) {
                    this.langCode = langCode;
                }
            }
        }

        return this;
    }

    addTranslations(langCode, translations) {
        langCode = langCode.toUpperCase();

        this.store[langCode] = this.store[langCode] || new Language(langCode);

        if (translations) {
            this.store[langCode].sets(translations);
        }

        return this.store[langCode];
    }

    hasLanguage(langCode) {
        return typeof this.store[langCode.toUpperCase()] !== "undefined";
    }

    changeLanguage(langCode) {
        if (!this.hasLanguage(langCode)) {
            console.warn(`Language ${langCode} not found in jTranslate store.`);
            return this;
        }

        this.langCode = langCode.toUpperCase();

        return this;
    }

    get(key, def) {
        return this.store[this.langCode || this.defaultLanguage].get(key, def || key);
    }

    set(key, value) {
        this.store[this.langCode || this.defaultLanguage].set(key, value);
        return this;
    }

    updateDOM(langCode = null) {
        if (langCode) {
            this.changeLanguage(langCode);
        }

        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (key) {
                el.textContent = this.get(key);
            }
        });
    }
}
