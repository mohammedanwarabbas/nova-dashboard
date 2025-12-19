// src/utils/constants.ts

// ===== ROUTES =====
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  UNAUTHORIZED: '/unauthorized',
  NOT_FOUND: '*',
} as const;

// ===== STORAGE =====
export const USER_STORAGE_KEY = 'nova_user';

// ===== TABLE SETTINGS =====
export const PAGE_SIZE = 10;

// ===== API URLs =====
export const API_URLS = {
  PROFILE: 'https://7q3k6vhat1.execute-api.ap-south-1.amazonaws.com/dev/profile',
  CREDIT_CARD: 'https://7q3k6vhat1.execute-api.ap-south-1.amazonaws.com/dev/card/credit',
};

// ===== API REQUEST BODIES =====
export const PROFILE_REQUEST_BODY = {
  count: 150,
  country_code: "en_IN",
  aadhar: true,
  dl: true,
  credit: true,
  debit: true,
  pan: true,
  passport: true,
  ssn: false
};

export const CREDIT_CARD_REQUEST_BODY = {
  count: 250,
  country_code: "en_IN"
};

// ===== TABLE COLUMNS =====
// Profile: Use API-provided columns (no need to define)
// Credit Card: Define our own (API doesn't provide)
export const CREDIT_CARD_COLUMNS = [
  { field: 'card_number', headerName: 'Card Number', width: 200 },
  { field: 'card_provider', headerName: 'Provider', width: 120 },
  { field: 'card_type', headerName: 'Type', width: 100 },
  { field: 'card_expiry', headerName: 'Expiry', width: 120 },
  { field: 'cvv', headerName: 'CVV', width: 100 },
  { field: 'digits', headerName: 'Digits', width: 100 },
];