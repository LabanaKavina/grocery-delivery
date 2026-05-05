export interface Address {
  zone: string;
  area: string;
  fullAddress?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  phone?: string;
  address?: Address;
}
