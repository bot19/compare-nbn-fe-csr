export const APP_SETTINGS = {
  // Pagination settings
  ITEMS_PER_PAGE: 8,

  VERSION: 'v1.1',
} as const;

export type AppSettings = typeof APP_SETTINGS; 