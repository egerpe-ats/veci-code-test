# Prueba técnica

Gestor de listas de texto desarrollado tanto en Vanilla JS como en React en el mismo repositorio, siguiendo el diseño de Adobe XD proporcionado.

## Ejecución en local

```bash
npm install
npm run dev
```

Abre `http://localhost:5173/` para la versión en React, y cambia a `/vanilla/index.html` para la versión en Vanilla JS mediante el selector superior.

Otros scripts:

```bash
npm test          # ejecutar pruebas unitarias y de componentes (Vitest)
npm run typecheck # ejecutar la comprobación de tipos de TypeScript
npm run build     # compilación de producción
npm run preview   # previsualizar la compilación de producción
```

## Funcionalidad implementada

- Añadir elementos de texto mediante el modal.
- Seleccionar uno o varios elementos de la lista y eliminarlos con el botón.
- Hacer doble clic en cualquier elemento para eliminarlo directamente.
- Botón de deshacer para revertir las acciones anteriores.

## Estructura

- `shared/` - reducer compartido (`listReducer.ts`) y estilos SCSS (`styles/`) utilizados por ambas versiones.
- `vanilla/` - implementación en HTML y Vanilla JS.
- `react/` - implementación en React y TypeScript.
- `tests/` - pruebas unitarias para el reducer y pruebas de componentes para la aplicación React.
