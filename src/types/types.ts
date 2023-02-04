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

export interface PostUserAddress {
  street: string;
  city: string;
  zipcode: number;
}

export interface PostUser {
  name: string;
  username: string;
  email: string;
  address: PostUserAddress;
  phone: string;
  website: string;
  comment?: string;
}

export interface IErrorComment {
  errorMessage: any;
}

export interface IInputTitle {
  value: string|number;
  isEmpty: boolean;
  minLengthError: boolean;
  emailError: boolean;
  maxLengthError: boolean;
  inputValid: boolean;
  nameError: boolean;
  usernameError: boolean;
  streetError: boolean;
  isDirty: boolean;
  onChange?: any;
  onBlur?: any;
}

export interface IInput {
  label: string;
  idLabel: string;
  title?: IInputTitle;
  edit: boolean;
  defaultValue: string | undefined;
  error: boolean;
  textError: string;
  minLenError?: boolean;
}


export interface ISort{
  sortType: string; 
  usersForSort: Array<IPost>
}