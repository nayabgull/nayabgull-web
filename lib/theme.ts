/** Theme choice: follows the system until the visitor picks one, then remembers it (frontend.md §4). */

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

export function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark";
}

/** The theme on screen: the stored choice, or the system preference when nothing is stored. */
export function resolveTheme(stored: unknown, systemPrefersLight: boolean): Theme {
  if (isTheme(stored)) return stored;
  return systemPrefersLight ? "light" : "dark";
}

export function oppositeTheme(theme: Theme): Theme {
  return theme === "light" ? "dark" : "light";
}

/**
 * Runs in <head> before first paint, so a stored choice never flashes the other theme.
 * Kept tiny and free of user input; it only reads one localStorage key.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}})();`;
