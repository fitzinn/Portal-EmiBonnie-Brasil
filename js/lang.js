const langOrder = ["pt", "es", "en"];
let currentLang = "pt";
let translations = {};

// salva texto PT original
function cacheDefaultTexts() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    if (!el.dataset.i18nDefault) {
      el.dataset.i18nDefault = el.innerHTML.trim();
    }
  });
}

// pega chave tipo "home.title_main"
function getNested(obj, path) {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}

// aplica traduções
function translatePage() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    const newHtml = getNested(translations, key);

    if (newHtml) {
      el.innerHTML = newHtml;
    } else if (currentLang === "pt") {
      const original = el.dataset.i18nDefault;
      if (original) el.innerHTML = original;
    }
  });
}

// carrega JSON
async function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;

  localStorage.setItem("siteLanguage", lang);

  if (lang === "pt") {
    translations = {};
    translatePage();
    updateLangButtonLabel(lang);
    return;
  }

  try {
    const res = await fetch(`lang/${lang}.json`);
    if (!res.ok) throw new Error("Erro ao carregar JSON de idioma");

    translations = await res.json();
    translatePage();
    updateLangButtonLabel(lang);
  } catch (e) {
    console.error(e);
  }
}

// botão PT → ES → EN
function cycleLanguage() {
  const currentIndex = langOrder.indexOf(currentLang);
  const nextIndex = (currentIndex + 1) % langOrder.length;
  const nextLang = langOrder[nextIndex];

  setLanguage(nextLang);
}

// label do botão
function updateLangButtonLabel(lang) {
  const btn = document.getElementById("langToggle");
  if (!btn) return;

  if (lang === "pt") {
    btn.innerHTML = `
      PT
      <img src="img/Flag_of_Brazil.svg.png"
           width="17"
           style="vertical-align: middle; margin-right: 6px;">
    `;
  }

  else if (lang === "es") {
    btn.innerHTML = `
      ES
      <img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg"
           width="17"
           style="vertical-align: middle; margin-right: 6px;">
    `;
  }

  else if (lang === "en") {
    btn.innerHTML = `
      EN
      <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg"
           width="17"
           style="vertical-align: middle; margin-right: 6px;">
    `;
  }
}

// detecta idioma do navegador
function detectUserLanguage() {
  const browserLang = navigator.language || navigator.userLanguage;

  if (browserLang.startsWith("pt")) return "pt";
  if (browserLang.startsWith("es")) return "es";
  if (browserLang.startsWith("en")) return "en";

  return "en"; // fallback
}

// inicialização
window.addEventListener("load", () => {

  cacheDefaultTexts();

  const btn = document.getElementById("langToggle");
  if (btn) {
    btn.addEventListener("click", cycleLanguage);
  }

  // verifica se já existe idioma salvo
  let savedLang = localStorage.getItem("siteLanguage");

  if (!savedLang) {
    savedLang = detectUserLanguage();
  }

  setLanguage(savedLang);
});

// expõe para router
window.cacheDefaultTexts = cacheDefaultTexts;
window.translatePage = translatePage;
window.setLanguage = setLanguage;