# 🛒 TechStore — Carrito de Compras con JavaScript y Jest

Aplicación de carrito de compras desarrollada con **JavaScript Vanilla** y **pruebas unitarias con Jest**. El proyecto separa la lógica de negocio del DOM y aplica buenas prácticas como inmutabilidad y funciones puras.

---

## Funcionalidades

* Ver catálogo de productos
* Agregar productos al carrito
* Actualizar cantidades
* Eliminar productos
* Vaciar carrito
* Calcular subtotal y total con impuesto (16%)
* Persistencia en LocalStorage
* Sidebar interactivo
* Pruebas unitarias completas

---

## Pruebas unitarias

El proyecto incluye pruebas para validar toda la lógica del carrito.

Ejecutar pruebas:

```bash
npm install
npm test
```

Resultado esperado:

```bash
Test Suites: 1 passed
Tests: 33 passed
```

---

## 📁 Estructura del proyecto

```bash
project/
│
├── index.html
├── js/
│   ├── app.js          # Lógica de negocio (funciones puras)
│   └── app-browser.js  # Manejo del DOM
│   └─  app.test.js
│    
├── css/
│   └── styles.css
│
├── js/app.test.js      # Pruebas con Jest
└── package.json 



## ⚙️ Tecnologías usadas

* JavaScript (ES6)
* HTML5
* CSS3
* Jest
* Node.js
* LocalStorage

---

## 💾 Persistencia

El carrito se guarda automáticamente en el navegador usando LocalStorage.

---

## ▶️ Ejecutar el proyecto

Opción 1 (recomendado):

Usar Live Server en VSCode

Opción 2:

Abrir el archivo:

```bash
index.html
```

---

## 🎯 Objetivo

Este proyecto demuestra habilidades en:

* JavaScript
* Testing con Jest
* Arquitectura modular
* Manipulación del DOM
* Buenas prácticas

---

## 👨‍💻 Autor

Sebastián Medina Waltero
Ficha 3144615


