export function initCatalogControls() {
  const tabs = document.querySelectorAll('.category-tabs button');

  tabs.forEach((tab) => tab.addEventListener('click', () => {
    tabs.forEach((item) => {
      item.classList.remove('active');
      item.setAttribute('aria-pressed', 'false');
    });

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
}
