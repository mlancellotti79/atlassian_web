import translations from './translations.js';

function setLanguage(lang) {
    localStorage.setItem('preferredLang', lang);
    
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Cambiar el atributo lang del HTML para SEO
    document.documentElement.lang = lang;
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLang') || 'es';
    setLanguage(savedLang);
});

// Hacer la función global para los botones onclick
window.setLanguage = setLanguage;