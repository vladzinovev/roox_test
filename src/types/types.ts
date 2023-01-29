export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface IPost {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
  comment?: string;
}

export interface AllItems {
  item: IPost;
}
export interface PostUser {
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    city: string;
    zipcode: number;
  };
  phone: string;
  website: string;
  comment?: string;
}

export interface IErrorComment {
  errorMessage: any;
}
