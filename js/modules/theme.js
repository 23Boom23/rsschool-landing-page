const STORAGE_KEY = 'vandrove-theme';

export function initTheme() {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');

  function setTheme(theme) {
    root.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEY, theme);

    const isDark = theme === 'dark';
    toggle?.setAttribute('aria-pressed', String(isDark));
    toggle?.setAttribute('aria-label', isDark ? 'Уключыць светлую тэму' : 'Уключыць цёмную тэму');
  }

  setTheme(localStorage.getItem(STORAGE_KEY) || 'light');
  toggle?.addEventListener('click', () => {
    setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
  });
}
