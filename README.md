# Version Counter

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Astro](https://img.shields.io/badge/Astro-5.x-ff5f03?logo=astro)](https://astro.build)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript)](https://www.typescriptlang.org)

Aplicación web de código abierto que muestra contadores regresivos en tiempo real para las próximas actualizaciones de versiones de juegos **gacha** populares.

## Acerca del Proyecto

**Version Counter** te permite estar al día con las fechas de actualización de tus juegos gacha favoritos. La aplicación muestra:

- Versión actual y próxima versión de cada juego
- Contador regresivo en tiempo real hasta la próxima actualización
- Historial de actualizaciones anteriores
- Guías y videos informativos por versión

### Juegos Soportados

| Juego | Actualización Típica |
|-------|----------------------|
| Genshin Impact | Cada 6 semanas |
| Honkai Star Rail | Cada 6 semanas |
| Wuthering Waves | Cada ~6 semanas |
| Zenless Zone Zero | Cada 6 semanas |

## Características

- **Contadores en tiempo real** - Actualización automática cada segundo
- **Diseño responsivo** - Funciona en móvil y escritorio
- **Tema oscuro** - Colores personalizados por juego
- **Multiidioma** - Español e Inglés
- **Código abierto** - Totalmente modificable

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** versión 20.x o superior
- **pnpm** (gestor de paquetes recomendado)

```bash
# Verificar instalación
node --version   # Debe ser >= 20.0.0
pnpm --version
```

> **Nota**: Si no tienes pnpm, puedes instalarlo con: `npm install -g pnpm`

## Instalación

1. **Clona el repositorio**

   ```bash
   git clone https://github.com/tu-usuario/version-counter.git
   cd version-counter
   ```

2. **Instala las dependencias**

   ```bash
   pnpm install
   ```

3. **Inicia el servidor de desarrollo**

   ```bash
   pnpm dev
   ```

4. **Abre tu navegador**

   Ve a `http://localhost:4321` para ver la aplicación.

## Scripts Disponibles

| Comando | Descripción |
|---------|------------|
| `pnpm dev` | Inicia el servidor de desarrollo |
| `pnpm build` | Construye el proyecto para producción |
| `pnpm preview` | Previsualiza el build de producción |
| `pnpm check` | Verifica tipos TypeScript |
| `pnpm test` | Ejecuta las pruebas |

## Estructura del Proyecto

```
version-counter/
├── src/
│   ├── components/       # Componentes UI
│   │   └── react/       # Componentes React
│   ├── pages/          # Rutas y páginas
│   ├── data/           # Datos estáticos (juegos, versiones)
│   ├── types/          # Tipos TypeScript
│   ├── i18n/           # Traducciones
│   └── styles/         # Estilos globales
├── public/             # Assets estáticos
└── package.json        # Dependencias
```

## Cómo Contribuir

¡Las contribuciones son bienvenidas! Para contribuir:

1. Haz un **fork** del repositorio
2. Crea una rama para tu feature: `git checkout -b mi-nueva-funcionalidad`
3. Realiza tus cambios y haz commit: `git commit -m 'Agrega nueva funcionalidad'`
4. Push a la rama: `git push origin mi-nueva-funcionalidad`
5. Abre un **Pull Request**

## Licencia

Este proyecto está bajo la licencia **MIT**. Consulta el archivo [LICENSE](LICENSE) para más detalles.

## Política de Uso y Restricciones

### Uso allowed

- Usar el código para proyectos personales
- Forkear y adaptar el código para tus necesidades
- Contribuir al proyecto original
- Ejecutar tu propia instancia del proyecto

### Restricciones

**Este proyecto es de código abierto, pero no se permite crear sitios web idénticos o muy similares:**

- 🚫 Clonar este proyecto para crear un sitio con el mismo propósito (contadores de versiones de juegos gacha) sin cambios significativos
- 🚫 Copiar la estructura, diseño y funcionalidad principal para crear un "competidor"
- 🚫 Usar las misma fuentes de datos (fechas de actualización) sin añadir valor propio

**Lo que SI está permitido:**
- Usar el código como base para un proyecto diferente
- Adaptar el diseño y funcionalidades para otros propósitos
- Crear tu propia versión con contenido diferente

> Si quieres crear algo similar, te animo a añadir valor: diferente enfoque, datos propios, funcionalidades únicas, o un propósito distinto. El código está aquí para aprender y crear, no para clonar tal cual.

---

¿Dudas o preguntas? Abre un issue en el repositorio.