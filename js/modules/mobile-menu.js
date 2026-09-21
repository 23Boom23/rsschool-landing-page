export function initMobileMenu() {
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
}
