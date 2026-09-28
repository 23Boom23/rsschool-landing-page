import { routes } from '../data/routes.js';

export function initRouteModal() {
  const dialog = document.querySelector('.route-modal');
  if (!dialog || typeof dialog.showModal !== 'function') return;

  const elements = {
    image: dialog.querySelector('[data-modal-image]'),
    kicker: dialog.querySelector('[data-modal-kicker]'),
    title: dialog.querySelector('[data-modal-title]'),
    intro: dialog.querySelector('[data-modal-intro]'),
    duration: dialog.querySelector('[data-modal-duration]'),
    distance: dialog.querySelector('[data-modal-distance]'),
    season: dialog.querySelector('[data-modal-season]'),
    pace: dialog.querySelector('[data-modal-pace]'),
    stops: dialog.querySelector('[data-modal-stops]'),
    selection: dialog.querySelector('[data-modal-selection]'),
    highlights: dialog.querySelector('[data-modal-highlights]'),
    places: dialog.querySelector('[data-modal-places]'),
    map: dialog.querySelector('[data-modal-map]'),
    mapFrame: dialog.querySelector('[data-modal-map-frame]'),
    route: dialog.querySelector('[data-modal-route]'),
  };

  let currentRoute;
  let selectedPace;
  let selectedStop;
  let opener;

  function createChoice(option, selected, onChoose) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = option.label;
    button.className = 'route-modal__choice';
    button.setAttribute('aria-pressed', String(option === selected));
    button.addEventListener('click', () => onChoose(option));
    return button;
  }

  function renderChoices() {
    elements.pace.replaceChildren(...currentRoute.options.pace.map(
      (option) => createChoice(option, selectedPace, (choice) => {
        selectedPace = choice;
        renderChoices();
        renderSelection();
        elements.pace.querySelector('[aria-pressed="true"]').focus();
      }),
    ));
    elements.stops.replaceChildren(...currentRoute.options.stops.map(
      (option) => createChoice(option, selectedStop, (choice) => {
        selectedStop = choice;
        renderChoices();
        renderSelection();
        elements.stops.querySelector('[aria-pressed="true"]').focus();
      }),
    ));
  }

  function renderSelection() {
    elements.selection.textContent = `${selectedPace.summary}. Галоўны прыпынак — ${selectedStop.place.name}.`;
    elements.highlights.replaceChildren(...selectedPace.highlights.map((highlight) => {
      const item = document.createElement('li');
      item.textContent = highlight;
      return item;
    }));

    const query = encodeURIComponent(selectedStop.place.query);
    elements.map.href = `https://www.google.com/maps/search/?api=1&query=${query}`;
    elements.mapFrame.src = `https://www.google.com/maps?q=${query}&output=embed`;
    elements.mapFrame.title = `Карта: ${selectedStop.place.name}`;
    elements.route.href = `https://www.google.com/maps/dir/?api=1&destination=${query}`;
  }

  function showRoute(route, trigger) {
    currentRoute = route;
    selectedPace = route.options.pace[0];
    selectedStop = route.options.stops[0];
    opener = trigger;

    elements.image.src = route.image;
    elements.image.alt = route.imageAlt;
    elements.kicker.textContent = route.kicker;
    elements.title.textContent = route.title;
    elements.intro.textContent = route.intro;
    elements.duration.textContent = route.duration;
    elements.distance.textContent = route.distance;
    elements.season.textContent = route.season;
    elements.places.replaceChildren(...route.places.map((place) => {
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
    }));
    renderChoices();
    renderSelection();
    document.body.classList.add('modal-is-open');
    dialog.showModal();
  }

  document.querySelector('.catalog-grid')?.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-route-id]');
    if (!trigger) return;
    const route = routes.find((item) => item.id === trigger.dataset.routeId);
    if (route) showRoute(route, trigger);
  });

  dialog.querySelector('[data-modal-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-is-open');
    elements.mapFrame.src = 'about:blank';
    if (opener?.isConnected) opener.focus();
  });
}
