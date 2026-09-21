import { routes } from '../data/routes.js';

export function initRouteModal() {
  const dialog = document.querySelector('.route-modal');

  if (!dialog || typeof dialog.showModal !== 'function') {
    return;
  }

  const elements = {
    image: dialog.querySelector('[data-modal-image]'),
    kicker: dialog.querySelector('[data-modal-kicker]'),
    title: dialog.querySelector('[data-modal-title]'),
    intro: dialog.querySelector('[data-modal-intro]'),
    duration: dialog.querySelector('[data-modal-duration]'),
    distance: dialog.querySelector('[data-modal-distance]'),
    season: dialog.querySelector('[data-modal-season]'),
    highlights: dialog.querySelector('[data-modal-highlights]'),
    map: dialog.querySelector('[data-modal-map]'),
  };

  function showRoute(route) {
    elements.image.src = route.image;
    elements.image.alt = route.imageAlt;
    elements.kicker.textContent = route.kicker;
    elements.title.textContent = route.title;
    elements.intro.textContent = route.intro;
    elements.duration.textContent = route.duration;
    elements.distance.textContent = route.distance;
    elements.season.textContent = route.season;
    elements.highlights.replaceChildren(
      ...route.highlights.map((highlight) => {
        const item = document.createElement('li');
        item.textContent = highlight;
        return item;
      }),
    );
    elements.map.href = route.map;
    dialog.showModal();
  }

  document.querySelectorAll('[data-route-id]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const route = routes[trigger.dataset.routeId];

      if (route) {
        showRoute(route);
      }
    });
  });

  dialog.querySelector('[data-modal-close]')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });
}
