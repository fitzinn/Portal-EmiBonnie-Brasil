const langOrder = ["pt", "es", "en"];
let currentLang = "pt";
let translations = {};

// salva texto PT original
function cacheDefaultTexts() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    if (!el.dataset.i18nDefault) {
      el.dataset.i18nDefault = el.innerHTML.trim(); // guarda HTML inteiro
    }
  });
}

// pega chave tipo "home.title_main"
function getNested(obj, path) {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}

// aplica traduções na página atual
function translatePage() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    const newHtml = getNested(translations, key);

    if (newHtml) {
      el.innerHTML = newHtml;           // aplica HTML da tradução
    } else if (currentLang === "pt") {
      const original = el.dataset.i18nDefault;
      if (original) el.innerHTML = original; // restaura HTML original
    }
  });
}

// carrega JSON e muda idioma
async function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;

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

// botão PT → ES → EN → PT
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
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/2560px-Flag_of_Brazil.svg.png"
           width="17"
           style="vertical-align: middle; margin-right: 6px;">
    `;
  } else if (lang === "es") {
    btn.innerHTML = `
      ES
      <img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg"
           width="17"
           style="vertical-align: middle; margin-right: 6px;">
    `;
  } else if (lang === "en") {
    btn.innerHTML = `
      EN
      <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg"
           width="17"
           style="vertical-align: middle; margin-right: 6px;">
    `;
  }
}

// inicialização
window.addEventListener("load", () => {
  cacheDefaultTexts();           // salva PT da página atual
  const btn = document.getElementById("langToggle");
  if (btn) {
    btn.addEventListener("click", cycleLanguage);
  }
  updateLangButtonLabel(currentLang);
  setLanguage("pt");             // começa em PT (só garante estado)
});

// expõe para o router
window.cacheDefaultTexts = cacheDefaultTexts;
window.translatePage = translatePage;
window.setLanguage = setLanguage;
