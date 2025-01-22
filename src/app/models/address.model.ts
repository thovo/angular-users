export type Address = {
  address: string;
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  country: string;
  state: string;
  stateCode: string;
};
