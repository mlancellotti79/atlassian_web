import { translations } from './translations.js';

// 1. Función de traducción (ahora es interna, no necesita window.)
function changeLang(lang) {
    localStorage.setItem('preferredLang', lang);
    
    // Aplicar textos
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    // Actualizar botones UI
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.id === `btn-${lang}`);
    });

    document.documentElement.lang = lang;
}

// 2. Efectos de Scroll
const handleScroll = () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
};

// 3. Menú Móvil
const setupMobileMenu = () => {
    const toggle = document.getElementById('mobile-toggle');
    const menu = document.getElementById('nav-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        menu.classList.toggle('open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => menu.classList.remove('open'));
    });
};

// 4. INICIALIZACIÓN (Aquí ocurre la magia)
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLang') || 'en';
    
    // Ejecutar traducción inicial
    changeLang(savedLang);

    // ASIGNAR CLICS A LOS BOTONES (Reemplaza al onclick del HTML)
    const btnEs = document.getElementById('btn-es');
    const btnEn = document.getElementById('btn-en');

    if (btnEs) btnEs.addEventListener('click', () => changeLang('es'));
    if (btnEn) btnEn.addEventListener('click', () => changeLang('en'));

    // Listeners de scroll y menú
    window.addEventListener('scroll', handleScroll);
    setupMobileMenu();
    
    // Inicializar Iconos Lucide
    if (window.lucide) {
        lucide.createIcons();
    }
});