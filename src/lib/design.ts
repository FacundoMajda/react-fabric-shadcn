import type { Theme } from "react-data-table-component";

// Definición de temas para DataTable con nombres representativos
export const DATATABLE_THEMES: Record<string, Theme> = {
  SOLARIZED: {
    text: {
      primary: "var(--datatable-text-primary)",
      secondary: "var(--datatable-text-secondary)",
      disabled: "#93a1a1",
    },
    background: {
      default: "var(--datatable-background-default)",
    },
    context: {
      background: "var(--datatable-context-background)",
      text: "var(--datatable-context-text)",
    },
    divider: {
      default: "var(--datatable-divider-default)",
    },
    button: {
      default: "var(--datatable-button-default)",
      focus: "var(--datatable-button-default)",
      hover: "var(--datatable-button-hover)",
      disabled: "var(--datatable-button-disabled)",
    },
    selected: {
      default: "var(--datatable-selected-default)",
      text: "var(--datatable-selected-text)",
    },
    highlightOnHover: {
      default: "var(--datatable-highlight-on-hover-default)",
      text: "var(--datatable-highlight-on-hover-text)",
    },
    striped: {
      default: "var(--datatable-striped-default)",
      text: "var(--datatable-striped-text)",
    },
  },
  // Puedes agregar más temas aquí, por ejemplo:
  // DARK: { ... },
  // LIGHT: { ... },
};

// Constantes para nombres de temas
export const THEME_NAMES = {
  SOLARIZED: "solarized",
  // DARK: "dark",
} as const;
