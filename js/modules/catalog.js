import { routes } from '../data/routes.js?v=part2';

function createCard(route) {
  const card = document.createElement('article');
  card.className = 'catalog-card';

  const image = document.createElement('img');
  image.className = 'catalog-card__image';
  image.src = route.image;
  image.alt = route.imageAlt;
  image.loading = 'lazy';

  const content = document.createElement('div');
  content.className = 'catalog-card__content';

  const kicker = document.createElement('p');
  kicker.className = 'card-kicker';
  kicker.textContent = route.kicker;

  const title = document.createElement('h3');
  title.textContent = route.title;

  const description = document.createElement('p');
  description.className = 'card-description';
  description.textContent = route.intro;

  const footer = document.createElement('div');
  footer.className = 'card-footer';
  const distance = document.createElement('span');
  distance.className = 'card-meta';
  distance.textContent = route.distance;
  const openLabel = document.createElement('span');
  openLabel.className = 'card-open-label';
  openLabel.textContent = 'Адкрыць ↗';
  footer.append(distance, openLabel);

  const trigger = document.createElement('button');
  trigger.className = 'catalog-card__trigger';
  trigger.type = 'button';
  trigger.dataset.routeId = route.id;
  trigger.setAttribute('aria-label', `Адкрыць маршрут ${route.title}`);

  content.append(kicker, title, description, footer);
  card.append(image, content, trigger);
  return card;
}

export function initCatalogControls() {
  const grid = document.querySelector('.catalog-grid');
  if (!grid) return;

  const tabs = [...document.querySelectorAll('.category-tabs button')];
  const loadMore = document.querySelector('.load-more');
  let category = tabs[0].dataset.category;
  let showAll = false;
  let isNarrow = window.innerWidth <= 768;

  function render() {
    const matching = routes.filter((route) => category === 'all' || route.categories.includes(category));
    const limit = isNarrow ? 4 : 6;
    const visible = showAll ? matching : matching.slice(0, limit);
    grid.replaceChildren(...visible.map(createCard));
    loadMore.hidden = visible.length === matching.length;
    if (!loadMore.hidden) {
      loadMore.textContent = `Паказаць яшчэ ${matching.length - visible.length} маршруты ↓`;
    }
  }

  tabs.forEach((tab) => tab.addEventListener('click', () => {
    category = tab.dataset.category;
    showAll = false;
    tabs.forEach((item) => {
      const selected = item === tab;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    render();
  }));

  loadMore.addEventListener('click', () => {
    showAll = true;
    render();
  });

  window.addEventListener('resize', () => {
    const nextIsNarrow = window.innerWidth <= 768;
    if (nextIsNarrow !== isNarrow) {
      isNarrow = nextIsNarrow;
      showAll = false;
      render();
    }
  });

  render();
}
