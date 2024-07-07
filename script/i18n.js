const langList = ['id', 'en'];
const defaultLang = 'id';
const translations = {}

let currentLang = defaultLang;

function _T(str) {
  if (translations.length === 0) console.warn('Translation not loaded yet');

  return translations[str] || str;
}

function getCurrentLanguage() {
  return localStorage.getItem('lang') || defaultLang;
}

function changeLanguage() {
  // Set language to local storage
  localStorage.setItem('lang', currentLang === 'id' ? 'en' : 'id');

  // Reload the page
  location.reload();
}

function setTranslation() {
  // Set translation for all elements with data-i18n attribute
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');

    // Check if the element is input
    if (element.tagName === 'INPUT') {
      element.placeholder = _T(key);
      return;
    }

    element.innerHTML = _T(key);
  });
}

window.addEventListener('load', function() {
  // Load traslation
  // First cek if there any parameter in URL
  const urlParams = new URLSearchParams(window.location.search);
  let lang = urlParams.get('lang') || null;

  // If there is no parameter, cek if there is a language in local storage
  (!lang || !langList.includes(lang)) && localStorage.getItem('lang') ? lang = localStorage.getItem('lang') : null;

  // If there is no parameter and local storage, set to default language
  if (!lang || !langList.includes(lang)) {
    lang = defaultLang;
    localStorage.setItem('lang', lang);
  }

  currentLang = lang;

  // Load the language file from lang folder and set it to translations
  fetch(`/lang/${lang}/translate.json`)
    .then(response => response.json())
    .then(data => {
      for (const key in data) {
        translations[key] = data[key];

        if (key === 'title') document.title = data[key];
      }

      // Set website language
      document.documentElement.lang = lang;

      // Set translation for all elements with data-i18n attribute
      setTranslation();

      const flag = document.getElementById('flag');
      flag.src = `https://flagcdn.com/24x18/${lang == 'en' ? 'us' : 'id'}.png`;
    });
})