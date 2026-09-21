const STORAGE_KEY = 'nomadly-theme';
const root = document.documentElement;
const toggle = document.querySelector('.theme-toggle');

function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem(STORAGE_KEY, theme);
  const isDark = theme === 'dark';
  toggle?.setAttribute('aria-pressed', String(isDark));
  toggle?.setAttribute('aria-label', isDark ? 'Включить светлую тему' : 'Включить тёмную тему');
}

setTheme(localStorage.getItem(STORAGE_KEY) || 'light');
toggle?.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

document.querySelectorAll('.category-tabs button').forEach((tab) => tab.addEventListener('click', () => {
  document.querySelectorAll('.category-tabs button').forEach((item) => { item.classList.remove('active'); item.setAttribute('aria-selected', 'false'); });
  tab.classList.add('active');
  tab.setAttribute('aria-selected', 'true');
}));

document.querySelector('.load-more')?.addEventListener('click', (event) => {
  document.querySelectorAll('.extra-card').forEach((card) => card.classList.add('visible'));
  event.currentTarget.remove();
});
