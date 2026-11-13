/**
 * Lightweight Hash Router for Static Static Hosting Fallback
 * Routes:
 * - '#/'      -> Home Screen
 * - '#/play'  -> Disaster Dash Game Flow
 */

export class Router {
  constructor(routes = {}) {
    this.routes = routes;
    this.currentRoute = null;
    this.handleHashChange = this.handleHashChange.bind(this);
  }

  start() {
    window.addEventListener('hashchange', this.handleHashChange);
    this.handleHashChange();
  }

  stop() {
    window.removeEventListener('hashchange', this.handleHashChange);
  }

  handleHashChange() {
    const rawHash = window.location.hash || '#/';
    // Normalize hash
    const path = rawHash.split('?')[0].replace(/\/+$/, '') || '#/';
    this.navigate(path, false);
  }

  navigate(path, updateHash = true) {
    if (updateHash) {
      window.location.hash = path;
      return;
    }

    const handler = this.routes[path] || this.routes['#/'];
    this.currentRoute = path;
    if (handler) {
      handler();
    }
  }
}
