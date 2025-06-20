// NBN Plan Data Types

// Provider names
export type Provider = 
  | 'Telstra'
  | 'Optus'
  | 'TPG'
  | 'Aussie Broadband'
  | 'MyRepublic'
  | 'Superloop'
  | 'Exetel'
  | 'Dodo'
  | 'Belong'
  | 'Vodafone'
  | 'iiNet'
  | 'Internode'
  | 'Southern Phone'
  | 'Mate'
  | 'More Telecom'
  | 'Spintel'
  | 'Future Broadband'
  | 'Launtel'
  | 'Flip';

// Speed tiers for download
export type DownloadSpeed = 
  | '12'
  | '25'
  | '50'
  | '100'
  | '250'
  | '500'
  | '1000';

// Speed tiers for upload
export type UploadSpeed = 
  | '1'
  | '5'
  | '10'
  | '20'
  | '25'
  | '40'
  | '50'
  | '100';

// NBN connection types
export type NBNType = 
  | 'FTTP' // Fibre to the Premises
  | 'FTTN' // Fibre to the Node
  | 'FTTC' // Fibre to the Curb
  | 'FTTB' // Fibre to the Building
  | 'HFC'  // Hybrid Fibre Coaxial
  | 'Fixed Wireless'
  | 'Satellite';

// Price range categories
export type PriceRange = 
  | 'Under $50'
  | '$50 - $75'
  | '$75 - $100'
  | '$100 - $125'
  | '$125 - $150'
  | '$150+';

// Sort options
export type SortOption = 
  | 'price_asc'
  | 'price_desc'
  | 'download_speed_asc'
  | 'download_speed_desc'
  | 'upload_speed_asc'
  | 'upload_speed_desc';

// Range objects for filtering
export interface SpeedRange {
  key: string;
  range: [number, number];
}

export interface PriceRangeObject {
  key: PriceRange;
  range: [number, number];
}

// Filter options to match the Filters component
export interface FilterOptions {
  providers: Provider[];
  priceRanges: PriceRangeObject[];
  downloadSpeeds: SpeedRange[];
  uploadSpeeds: SpeedRange[];
  nbnTypes: NBNType[];
  hasPromotion: boolean; // check promotion?.length > 0
}

// Main NBN Plan interface
export interface NBNPlan {
  id: string;
  url: string;
  imageUrl: string;
  provider: Provider;
  planName: string;
  downloadSpeed: DownloadSpeed;
  uploadSpeed: UploadSpeed;
  price: number; // Monthly price in dollars
  type: NBNType;
  promotion?: string;
  dataDate: string; // ISO date string
}

// Constants for default values
export const DEFAULT_PROVIDERS: Provider[] = [
  'Telstra',
  'Optus',
  'TPG',
  'Aussie Broadband',
  'MyRepublic',
  'Superloop',
  'Exetel',
  'Dodo'
];

export const ALL_PROVIDERS: Provider[] = [
  'Telstra',
  'Optus',
  'TPG',
  'Aussie Broadband',
  'MyRepublic',
  'Superloop',
  'Exetel',
  'Dodo',
  'Belong',
  'Vodafone',
  'iiNet',
  'Internode',
  'Southern Phone',
  'Mate',
  'More Telecom',
  'Spintel',
  'Future Broadband',
  'Launtel',
  'Flip'
];

export const DEFAULT_DOWNLOAD_SPEEDS: SpeedRange[] = [
  { key: '0 - 25', range: [0, 25] },
  { key: '25 - 50', range: [25, 50] },
  { key: '50 - 100', range: [50, 100] },
  { key: '100 - 250', range: [100, 250] },
  { key: '250 - 500', range: [250, 500] },
  { key: '500 - 1000', range: [500, 1000] }
];

export const DEFAULT_UPLOAD_SPEEDS: SpeedRange[] = [
  { key: '0 - 5', range: [0, 5] },
  { key: '5 - 10', range: [5, 10] },
  { key: '10 - 25', range: [10, 25] },
  { key: '25 - 50', range: [25, 50] },
  { key: '50 - 100', range: [50, 100] }
];

export const DEFAULT_NBN_TYPES: NBNType[] = ['FTTP', 'FTTN', 'FTTC', 'FTTB', 'HFC', 'Fixed Wireless', 'Satellite'];

export const DEFAULT_PRICE_RANGES: PriceRangeObject[] = [
  { key: 'Under $50', range: [0, 50] },
  { key: '$50 - $75', range: [50, 75] },
  { key: '$75 - $100', range: [75, 100] },
  { key: '$100 - $125', range: [100, 125] },
  { key: '$125 - $150', range: [125, 150] },
  { key: '$150+', range: [150, 9999] }
];

// Filter action types for useReducer
export type FilterAction = 
  | { type: 'SET_PROVIDERS'; payload: string[] }
  | { type: 'SET_PRICE_RANGE'; payload: PriceRangeObject | undefined }
  | { type: 'SET_DOWNLOAD_SPEED'; payload: SpeedRange | undefined }
  | { type: 'SET_UPLOAD_SPEED'; payload: SpeedRange | undefined }
  | { type: 'SET_NBN_TYPE'; payload: NBNType | undefined }
  | { type: 'SET_HAS_PROMOTION'; payload: boolean | undefined }
  | { type: 'CLEAR_ALL' }; 