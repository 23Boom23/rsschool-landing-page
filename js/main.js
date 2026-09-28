import { initCatalogControls } from './modules/catalog.js?v=part2';
import { initRouteModal } from './modules/modal.js?v=part2';
import { initMobileMenu } from './modules/mobile-menu.js?v=part2';
import { initRevealAnimations } from './modules/reveal.js';
import { initTheme } from './modules/theme.js';
import { initSlider } from './modules/slider.js?v=part2';

initTheme();
initMobileMenu();
initCatalogControls();
initRouteModal();
initRevealAnimations();
initSlider();
