/*
Event bridge to allow non-React code (e.g. axios interceptors) to trigger a React-owned logout.

1) When the AuthProvider mounts, it registers a reference to its logout() function
   via registerLogoutHandler(). That logout() clears auth state, tokens, and navigates.

2) If axios determines the user must re-authenticate (typically after a failed refresh / 401),
   it calls triggerLogoutHandler(), which invokes the registered logout() function.
*/

let logoutHandler: (() => void) | null = null;

export function registerLogoutHandler(handler: () => void) {
  logoutHandler = handler;
}

export function triggerLogoutHandler() {
  if (logoutHandler) {
    logoutHandler();
  }
}
