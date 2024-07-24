import { usePage, router } from '@inertiajs/react';

const __ = (key, params = {}) => {
    const { translations } = usePage().props;
    const keys = key.split('.');
    let translation = translations;

    keys.forEach(k => {
        translation = translation[k];
    });

    if (translation) {
        Object.keys(params).forEach(param => {
            translation = translation.replace(`:${param}`, params[param]);
        });
    }

    return translation;
};

const changeLanguage = (locale) => {
    router.reload({ only: ['translations'], headers: { 'X-Locale': locale } });
};

export default __;
export {
    changeLanguage
};
