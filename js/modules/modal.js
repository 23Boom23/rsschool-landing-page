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
    places: dialog.querySelector('[data-modal-places]'),
    map: dialog.querySelector('[data-modal-map]'),
    mapFrame: dialog.querySelector('[data-modal-map-frame]'),
    route: dialog.querySelector('[data-modal-route]'),
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
    elements.places.replaceChildren(
      ...route.places.map((place) => {
        const item = document.createElement('li');
        const link = document.createElement('a');
        const name = document.createElement('strong');
        const type = document.createElement('span');

        link.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.query)}`;
        link.target = '_blank';
        link.rel = 'noreferrer';
        name.textContent = place.name;
        type.textContent = place.type;
        link.append(name, type);
        item.append(link);
        return item;
      }),
    );
    elements.map.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(route.mapQuery)}`;
    elements.mapFrame.src = `https://www.google.com/maps?q=${encodeURIComponent(route.mapQuery)}&output=embed`;
    elements.mapFrame.title = `Карта: ${route.title}`;
    elements.route.href = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(route.mapQuery)}&waypoints=${encodeURIComponent(route.places.slice(1).map((place) => place.query).join('|'))}`;
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
