export const APP_SETTINGS = {
  // Pagination settings
  ITEMS_PER_PAGE: 8,

  // Breakpoint values (matching CSS variables)
  BREAKPOINTS: {
    XS: 480,
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
  } as const,

  VERSION: 'v1.1',
} as const;

export type AppSettings = typeof APP_SETTINGS; 