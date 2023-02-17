export declare global {
  interface Window extends ServiceWorkerGlobalScope {}

  // need for addEventListener
  interface WindowEventMap extends ServiceWorkerGlobalScopeEventMap {}
}
