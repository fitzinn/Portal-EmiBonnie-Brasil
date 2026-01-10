## 📁 **EmiBonnie Fanpage — SPA Project**

Este é um mini-projeto **SPA (Single Page Application)** construído usando **HTML + CSS + JavaScript puro**, sem frameworks.
Ele carrega páginas dinamicamente, troca estilos conforme a rota, possui tema **Light/Dark persistente** e estrutura modularizada de CSS.

---

# 🌟 **Funcionalidades**

### ✔️ SPA sem frameworks

As páginas são carregadas dinamicamente pelo `router.js` usando `fetch()` + hash routes (`#/home`, `#/emi`, etc).

### ✔️ Carregamento dinâmico de CSS

Cada página possui seu próprio CSS, carregado automaticamente:

home.html  → home.css  
emi.html   → emi.css  
bonnie.html → bonnie.css  
fanpage.html → fanpage.css  
links.html → links.css

### ✔️ Tema Light/Dark com persistência

* O tema é armazenado em `localStorage`
* O botão existe dentro do HTML de cada rota
* O JS reanexa o listener toda vez que muda de página

### ✔️ Estrutura limpa e escalável

Separação entre:

/css      → global.css + estilos por página
/pages    → arquivos HTML parciais
/js       → router.js + theme.js
index.html → app container

---

# 🚀 **Como executar**

Opção 1: Rodar localmente na sua máquina

1️⃣ Baixe ou clone o repositório:

git clone https://github.com/seuusuario/Portal-EmiBonnie-Brasil.git

2️⃣ Abra **index.html** no navegador (não precisa de servidor).

3️⃣ Navegue usando os links do menu — tudo funciona sem recarregar a página.

Opção 2: Entrar no link da página

https://emibonniebrasil.netlify.app/#/home

---

# 🔧 **Principais Arquivos**

### `router.js`

* Controla as rotas (#/home, #/emi...)
* Carrega a página parcial com fetch()
* Insere o HTML dentro de <div id="app"></div>
* Injeta o CSS correto
* Reinicia o botão de tema sempre que a rota muda

### `theme.js`

* Lê o tema salvo no localStorage
* Aplica data-theme="dark" ou "light"
* Atualiza o botão
* Registra o evento de toggle sempre que página nova é carregada

### `global.css`

* Estilos compartilhados (layout, tipografia, resets)

### home.css, emi.css, ...

* Estilos exclusivos de cada página

---

# 🌓 **Tema Light/Dark**

O tema usa:

html data-theme="light" ou html data-theme="dark"

E o CSS responde com:

[data-theme="dark"] {
    --bg: #111;
    --text: #fff;
}

[data-theme="light"] {
    --bg: #fff;
    --text: #000;
}

---

