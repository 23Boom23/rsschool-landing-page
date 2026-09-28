export function initMobileMenu() {
  const menuButton = document.querySelector('.menu-button');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!menuButton || !mobileNav) return;

  function setOpen(isOpen) {
    document.body.classList.toggle('menu-is-open', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Закрыць меню' : 'Адкрыць меню');
    mobileNav.inert = !isOpen;
    mobileNav.setAttribute('aria-hidden', String(!isOpen));
  }

  menuButton.addEventListener('click', () => {
    setOpen(!document.body.classList.contains('menu-is-open'));
  });

  mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.body.classList.contains('menu-is-open')) {
      setOpen(false);
      menuButton.focus();
    }
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 769 && document.body.classList.contains('menu-is-open')) {
      setOpen(false);
    }
  });
  setOpen(false);
}
