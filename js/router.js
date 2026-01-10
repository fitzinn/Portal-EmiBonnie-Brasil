// router.js
const app = document.getElementById("app");

// Routes
const routes = {
    "/home": "/pages/home.html",
    "/emi": "/pages/emi.html",
    "/bonnie": "/pages/bonnie.html",
    "/fanbase": "/pages/fanpage.html",
    "/links": "/pages/links.html"
};

// Load CSS specific for each page
function loadCSSForPage(page) {
    const oldLink = document.getElementById("page-style");
    if (oldLink) oldLink.remove();

    let cssFile = "";
    if (page.includes("home.html")) cssFile = "css/home.css";
    else if (page.includes("emi.html")) cssFile = "css/emi.css";
    else if (page.includes("bonnie.html")) cssFile = "css/bonnie.css";
    else if (page.includes("fanpage.html")) cssFile = "css/fanpage.css";
    else if (page.includes("links.html")) cssFile = "css/links.css";

    if (cssFile) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = cssFile;
        link.id = "page-style";
        document.head.appendChild(link);
    }
}

// Load page
async function loadPage(page) {
  try {
    const cleanPage = page.split('#')[0]; // remove hash se existir
    const response = await fetch(cleanPage);
    if (!response.ok) throw new Error("Page missing");
    const html = await response.text();
    app.innerHTML = html;

    loadCSSForPage(cleanPage);

    if (cleanPage.includes("home.html")) setTimeout(initCarousel, 0);

    // sobe para o topo sempre que trocar de página
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });

    // idioma: salva PT original da nova página e aplica idioma atual
    if (typeof cacheDefaultTexts === "function") cacheDefaultTexts();
    if (typeof translatePage === "function") translatePage();

  } catch (e) {
    app.innerHTML = "<h2>Página não encontrada 😢</h2>";
  }
}


// Router
function router() {
    const hash = location.hash;

    // Se for hash interno de uma página (começa com # e não tem /), só rola a seção
    if (hash && !hash.includes("/")) {
        const target = document.querySelector(hash);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
    }

    // SPA routing normal
    const path = hash.replace("#", "") || "/home";
    const page = routes[path];
    if (page) loadPage(page);
    else app.innerHTML = "<h2>Página não encontrada 😢</h2>";
}

// Listeners
window.addEventListener("hashchange", router);
window.addEventListener("load", () => {
    if (!location.hash) location.hash = "#/home";
    router();
});