export interface OfficeLocation {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  fullAddress: string;
}

export interface CompanyInfo {
  name: string;
  headquarter: OfficeLocation;
  globalOffices: OfficeLocation[];
  phone: string;
  email: string;
  supportTime: string;
  businessHours: {
    days: string;
    hours: string;
  };
}

export const companyInfo: CompanyInfo = {
  name: "Core Market Research",
  headquarter: {
    name: "Headquarters",
    address: "Empire State Building, NYC",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "USA",
    fullAddress: "Empire State Building, NYC New York, NY 10001, USA",
  },
  globalOffices: [
    {
      name: "London Office",
      address: "Empire State Building, NYC",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
      fullAddress: "Empire State Building, NYC New York, NY 10001, USA",
    },
    {
      name: "Singapore Office",
      address: "Empire State Building, NYC",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
      fullAddress: "Empire State Building, NYC New York, NY 10001, USA",
    },
  ],
  phone: "+1 (234) 567-890",
  email: "info@coremarketresearch.com",
  supportTime: "24/7 Support Available",
  businessHours: {
    days: "Monday - Friday",
    hours: "9:00 AM - 6:00 PM EST",
  },
};

// Convenience getters for common use cases
export const getHeadquarterAddress = () => companyInfo.headquarter.fullAddress;
export const getPhone = () => companyInfo.phone;
export const getEmail = () => companyInfo.email;
export const getSupportTime = () => companyInfo.supportTime;
export const getBusinessHours = () => `${companyInfo.businessHours.days} ${companyInfo.businessHours.hours}`;
