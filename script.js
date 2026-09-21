const STORAGE_KEY = 'vandrove-theme';
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
toggle?.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

document.querySelectorAll('.category-tabs button').forEach((tab) => tab.addEventListener('click', () => {
  document.querySelectorAll('.category-tabs button').forEach((item) => { item.classList.remove('active'); item.setAttribute('aria-selected', 'false'); });
  tab.classList.add('active');
  tab.setAttribute('aria-selected', 'true');
  const category = tab.dataset.category;
  document.querySelectorAll('.catalog-card').forEach((card) => {
    card.classList.toggle('is-filtered-out', category !== 'all' && card.dataset.category !== category);
  });
}));

document.querySelector('.load-more')?.addEventListener('click', (event) => {
  document.querySelectorAll('.extra-card').forEach((card) => card.classList.add('visible'));
  event.currentTarget.remove();
});
