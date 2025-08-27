import Language from "./language.js";

export default class jTranslate {
    constructor(store = null, defaultLanguage = null) {
        this.defaultLanguage = defaultLanguage ? defaultLanguage.toUpperCase() : null;
        this.langCode = this.defaultLanguage;
        this.store = {};

        if (store && typeof store === "object") {
            for (const [langCode, translations] of Object.entries(store)) {
                this.addTranslations(langCode, translations);
            }
        }
    }

    addTranslations(langCode, translations) {
        const language = new Language(langCode);
        langCode = language.code;

        this.store[langCode] = this.store[langCode] || language;

        if (translations) {
            this.store[langCode].sets(translations);
        }

        if (!this.langCode) {
            this.langCode = langCode;
        }

        return this;
    }

    hasLanguage(langCode) {
        langCode = langCode.toUpperCase();
        return typeof this.store[langCode] !== "undefined";
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
        return this.store[this.langCode].get(key, def || key);
    }

    set(key, value) {
        this.store[this.langCode].set(key, value);
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
                const translation = this.get(key);
                if (translation) {
                    el.textContent = translation;
                } else {
                    console.warn(`Translation for key "${key}" not found.`);
                }
            }
        });
    }
}
