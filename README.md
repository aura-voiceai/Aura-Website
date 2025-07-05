# Aura Website

## Descripción

Sitio web oficial de Aura - Voice AI Agents. Una plataforma moderna y elegante que presenta nuestros servicios de asistentes de voz inteligentes con IA.

## Características

- ✨ Interfaz moderna y responsive
- 🌙 Modo oscuro/claro
- 🎨 Animaciones fluidas con Framer Motion
- 📱 Completamente responsive
- 🎯 Efectos de partículas interactivos
- 🎭 Diseño futurista con styled-components

## Tecnologías Utilizadas

- **React 18** - Biblioteca de JavaScript para construir interfaces de usuario
- **TypeScript** - Superset de JavaScript con tipado estático
- **Vite** - Herramienta de construcción rápida
- **Styled Components** - CSS-in-JS para estilos
- **Framer Motion** - Biblioteca de animaciones para React
- **Material-UI** - Iconos y componentes de Material Design

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/aura-voiceai/Aura-Website.git
cd Aura-Website
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre [http://localhost:5173](http://localhost:5173) en tu navegador

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter de ESLint
- `npm run deploy` - Despliega a GitHub Pages (después de build)

## Despliegue

### 🚀 GitHub Pages (Automático)

El sitio se despliega automáticamente a GitHub Pages cada vez que se hace push a la rama `main`.

**URL del sitio:** [https://aura-voiceai.github.io/Aura-Website](https://aura-voiceai.github.io/Aura-Website)

#### Configuración manual (si es necesario):

1. Ve a tu repositorio en GitHub
2. Settings → Pages
3. Source: "Deploy from a branch"
4. Branch: `gh-pages` 
5. Folder: `/ (root)`

### ⚡ Azure Static Web Apps

Para desplegar en Azure Static Web Apps:

1. **Crear recurso en Azure:**
   - Ve al portal de Azure
   - Crea un nuevo "Static Web App"
   - Conecta con tu repositorio de GitHub
   - Selecciona la rama `main`

2. **Configuración automática:**
   - Build Location: `/`
   - App Location: `/`
   - Output Location: `dist`

3. **Token de acceso:**
   - Copia el token de deployment
   - Agrégalo como secreto en GitHub: `AZURE_STATIC_WEB_APPS_API_TOKEN`

4. **Activar workflow:**
   - Renombra `.github/workflows/azure-static-web-apps.yml` para activarlo
   - Desactiva `deploy.yml` si solo quieres usar Azure

## Estructura del Proyecto

```
src/
├── components/       # Componentes React
├── styles/          # Estilos globales y definiciones de tipos
│   ├── GlobalStyles.ts
│   └── styled.d.ts
├── App.tsx          # Componente principal
└── main.tsx         # Punto de entrada
```

## Configuración

### Imágenes

El proyecto espera las siguientes imágenes en el directorio `public/`:

- `logo_white.png` - Logo en blanco
- `logo_black.png` - Logo en negro
- `signal_white.png` - Icono de señal en blanco
- `signal_black.png` - Icono de señal en negro

### Personalización

Para personalizar los colores y estilos, edita las variables CSS en `src/styles/GlobalStyles.ts`.

### Dominio personalizado

Para usar un dominio personalizado:

1. **GitHub Pages:**
   - Agrega el dominio en la configuración de Pages
   - Actualiza el `cname` en `.github/workflows/deploy.yml`

2. **Azure Static Web Apps:**
   - Configura el dominio personalizado en el portal de Azure

## Contribuir

1. Haz fork del proyecto
2. Crea una rama para tu característica (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ve el archivo `LICENSE` para más detalles.

## Contacto

- **Director Comercial**: Mauro Rosado
  - 📞 +52 427 107 9011
  - 📧 mauro.rosado@aura.ai

- **Sitio Web**: [https://aura.ai](https://aura.ai)
- **GitHub**: [https://github.com/aura-voiceai](https://github.com/aura-voiceai)

---

Desarrollado con ❤️ por el equipo de Aura 