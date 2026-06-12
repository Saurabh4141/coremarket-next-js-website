// Pricing configuration - API-friendly structure
// Can be replaced with backend API response later

export interface LicenseType {
  id: string;
  name: string;
  description: string;
  priceMultiplier: number;
  features: string[];
}

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  exchangeRate: number; // relative to USD
}

export const licenseTypes: LicenseType[] = [
  {
    id: "single",
    name: "Single User License",
    description: "For individual use only. Cannot be shared or distributed.",
    priceMultiplier: 1,
    features: [
      "PDF format download",
      "Single user access",
      "Email support",
      "1 year access"
    ]
  },
  {
    id: "multi",
    name: "Multi-User License",
    description: "Share within a single department or team (up to 5 users).",
    priceMultiplier: 1.5,
    features: [
      "PDF & Excel format",
      "Up to 5 users",
      "Priority email support",
      "1 year access",
      "Quarterly updates"
    ]
  },
  {
    id: "corporate",
    name: "Corporate License",
    description: "Enterprise-wide access for all employees within your organization.",
    priceMultiplier: 2.5,
    features: [
      "All formats (PDF, Excel, PPT)",
      "Unlimited users",
      "24/7 priority support",
      "Lifetime access",
      "Monthly updates",
      "Analyst consultation (2 hours)"
    ]
  }
];

export const currencies: Currency[] = [
  { code: "USD", symbol: "$", name: "US Dollar", exchangeRate: 1 },
  { code: "EUR", symbol: "€", name: "Euro", exchangeRate: 0.92 },
  { code: "GBP", symbol: "£", name: "British Pound", exchangeRate: 0.79 },
  { code: "INR", symbol: "₹", name: "Indian Rupee", exchangeRate: 83.12 },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", exchangeRate: 149.50 },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", exchangeRate: 1.53 },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar", exchangeRate: 1.36 }
];

export const getDefaultCurrency = (): Currency => currencies[0];

export const getLicenseById = (id: string): LicenseType | undefined => 
  licenseTypes.find(l => l.id === id);

export const calculatePrice = (
  basePrice: number, 
  licenseType: LicenseType, 
  currency: Currency
): number => {
  const usdPrice = basePrice * licenseType.priceMultiplier;
  return Math.round(usdPrice * currency.exchangeRate);
};

export const formatPrice = (amount: number, currency: Currency): string => {
  if (currency.code === "JPY" || currency.code === "INR") {
    return `${currency.symbol}${amount.toLocaleString()}`;
  }
  return `${currency.symbol}${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};
