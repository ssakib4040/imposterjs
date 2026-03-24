export interface Address {
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export declare const addresses: Address[];
