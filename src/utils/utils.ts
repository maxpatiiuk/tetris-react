export function expose(value: Readonly<Record<string, unknown>>) {
  // @ts-expect-error Vite has bad typing for env variables?
  if (import.meta.env.VITE_MODE !== 'development') return;

  // @ts-expect-error Defining dev-only property
  window._ ??= {};
  Object.entries(value).forEach(([key, value]) => {
    // @ts-expect-error Defining dev-only property
    window._[key] = value;
  });
}
