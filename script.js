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
  document.querySelectorAll('.category-tabs button').forEach((item) => { item.classList.remove('active'); item.setAttribute('aria-pressed', 'false'); });
  tab.classList.add('active');
  tab.setAttribute('aria-pressed', 'true');
  const category = tab.dataset.category;
  document.querySelectorAll('.catalog-card').forEach((card) => {
    const matchesCategory = card.dataset.categories?.split(' ').includes(category);
    card.classList.toggle('is-filtered-out', category !== 'all' && !matchesCategory);
  });
}));

document.querySelector('.load-more')?.addEventListener('click', (event) => {
  document.querySelectorAll('.extra-card').forEach((card) => card.classList.add('visible'));
  event.currentTarget.remove();
});

const menuButton = document.querySelector('.menu-button');
const mobileNav = document.querySelector('.mobile-nav');

function closeMobileMenu() {
  document.body.classList.remove('menu-is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Адкрыць меню');
}

menuButton?.addEventListener('click', () => {
  const isOpen = document.body.classList.toggle('menu-is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Закрыць меню' : 'Адкрыць меню');
});

mobileNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMobileMenu));
