import { Address } from '@models/address.model';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  address: Address;
};
