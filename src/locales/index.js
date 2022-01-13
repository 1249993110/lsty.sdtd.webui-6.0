import { createI18n } from 'vue-i18n';
import Cookies from 'universal-cookie';
import zh_cn from './zh-cn';
import en from './en';

const storekey = '.AspNetCore.Culture';
const cookies = new Cookies();

function getDefaultLocale() {
    let lang = cookies.get(storekey);
    if (lang) {
        return lang.substr(2, lang.indexOf('|') - 2);
    }
    
    lang = navigator.language.toLowerCase() || 'zh-cn';
    saveLocaleToCookie(lang);
    return lang;
}

function saveLocaleToCookie(lang) {
    cookies.set(storekey, `c=${lang}|uic=${lang}`, { path: '/' });
}

const messages = {
    'zh-cn': {
        ...zh_cn,
    },
    en: {
        ...en,
    },
};

const i18n = createI18n({
    locale: getDefaultLocale(), // 默认显示的语言
    messages,
});

export function changeLocale(lang) {
    i18n.global.locale = lang;
    saveLocaleToCookie(lang);
}

export function getLocale() {
    return i18n.global.locale;
}

export default i18n;
