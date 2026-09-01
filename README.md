# 🔐 SecureHash

**SecureHash** es una aplicación web de código abierto diseñada para calcular y verificar firmas de archivos de forma 100% local.  
Tus datos nunca salen del navegador, garantizando total privacidad y seguridad.

---

## ✨ Características principales

- 🛡️ **Privacidad absoluta**: todo el procesamiento ocurre en el navegador, sin servidores externos.  
- 📦 **Procesamiento por bloques** para manejar archivos grandes (GBs) de forma eficiente.  
- 🔑 **Múltiples algoritmos de hash**: SHA-256, SHA-512, SHA3-256, SHA3-512, BLAKE2b y BLAKE3.  
- 🧪 **Verificador de integridad** para comparar hashes automáticamente.  
- 🎨 **Interfaz moderna**, responsive y con modo oscuro.

---

## 🛠 Tecnologías utilizadas

- Next.js
- TypeScript 
- Tailwind CSS

---

## Estructura del proyecto

```text
securehash-main/
├── public/
│   ├── icono.png                 # Icono principal
│   ├── k_logo.png                # Logo principal
│   └── k_logo_alt.png            # Variante del logo
├── src/
│   ├── app/
│   │   ├── favicon.ico           # Favicon del sitio
│   │   ├── globals.css           # Estilos globales
│   │   ├── layout.tsx            # Layout general de la aplicación
│   │   └── page.tsx              # Página principal
│   ├── components/
│   │   ├── Dropzone.tsx          # Área para seleccionar o arrastrar archivos
│   │   ├── Footer.tsx            # Pie de página
│   │   ├── HashResultsGrid.tsx   # Muestra los resultados de verificación
│   │   ├── Header.tsx            # Encabezado de la aplicación
│   │   ├── IntegrityVerifier.tsx # Lógica e interfaz para verificar integridad
│   │   ├── SecureHashApp.tsx     # Componente principal de SecureHash
│   │   ├── ThemeProvider.tsx     # Gestión del tema claro/oscuro
│   │   └── ui/                   # Componentes reutilizables de interfaz
│   │       ├── accordion.tsx
│   │       ├── alert-dialog.tsx
│   │       ├── alert.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── calendar.tsx
│   │       ├── carousel.tsx
│   │       ├── chart.tsx
│   │       ├── checkbox.tsx
│   │       ├── collapsible.tsx
│   │       ├── dialog.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── form.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── menubar.tsx
│   │       ├── popover.tsx
│   │       ├── progress.tsx
│   │       ├── radio-group.tsx
│   │       ├── scroll-area.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── sidebar.tsx
│   │       ├── skeleton.tsx
│   │       ├── slider.tsx
│   │       ├── switch.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       ├── toast.tsx
│   │       ├── toaster.tsx
│   │       └── tooltip.tsx
│   ├── hooks/
│   │   ├── use-mobile.tsx        # Detección de dispositivos móviles
│   │   └── use-toast.ts          # Gestión de notificaciones
│   └── lib/
│       ├── hashing.ts            # Cálculo y verificación de hashes
│       ├── placeholder-images.json # Datos de imágenes de prueba
│       ├── placeholder-images.ts   # Utilidades para imágenes de prueba
│       └── utils.ts              # Funciones auxiliares generales
├── .gitattributes
├── .gitignore
├── LICENSE
├── README.md
├── components.json
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## 📄 Licencia

Este proyecto está distribuido bajo la **MIT License**.

Consulta [`LICENSE`](./LICENSE) para los términos completos.

---

## 📬 Contacto

**Kilian Diaz Miranda**

* LinkedIn: https://www.linkedin.com/in/kiliandiazmiranda/
* Correo: [kiliandiazmiranda@outlook.com](mailto:kiliandiazmiranda@outlook.com)
