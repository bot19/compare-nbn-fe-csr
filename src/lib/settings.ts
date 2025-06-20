export const APP_SETTINGS = {
  // Pagination settings
  ITEMS_PER_PAGE: 8,
  
  // Data loading settings
  DATA_LOADING_DELAY_MS: 400,
  
  // UI settings
  DEFAULT_SORT: 'price' as const,
  DEFAULT_FILTERS: {
    providers: [],
    priceRange: '',
    downloadSpeed: '',
    uploadSpeed: '',
    nbnType: '',
    hasPromotion: false,
  },
} as const;

export type AppSettings = typeof APP_SETTINGS; 