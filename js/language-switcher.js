let currentLanguage = localStorage.getItem('language') || 'es';

// Cargar idioma al abrir la página
document.addEventListener('DOMContentLoaded', function() {
  loadLanguage(currentLanguage);
  updateLanguageButton();
});

function loadLanguage(lang) {
  fetch(`./languages/${lang}.json`)
    .then(response => response.json())
    .then(data => {
      applyTranslations(data);
      currentLanguage = lang;
      localStorage.setItem('language', lang);
      updateLanguageButton();
    })
    .catch(error => console.error('Error loading language file:', error));
}

function applyTranslations(translations) {
  // Navegar por todos los elementos con atributo data-i18n
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[key]) {
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = translations[key];
      } else {
        element.textContent = translations[key];
      }
    }
  });

  // Cambiar dirección del documento si es necesario
  document.documentElement.lang = currentLanguage;
}

function toggleLanguage() {
  const newLanguage = currentLanguage === 'es' ? 'en' : 'es';
  loadLanguage(newLanguage);
}

function updateLanguageButton() {
  const flagImg = document.getElementById('flag-img');
  const langText = document.getElementById('lang-text');
  if (currentLanguage === 'es') {
    flagImg.src = "https://flagcdn.com/es.svg";
    flagImg.alt = "Bandera de España";
    langText.textContent = "Español";
  } else {
    flagImg.src = "https://flagcdn.com/gb.svg";
    flagImg.alt = "UK Flag";
    langText.textContent = "English";
  }
}
