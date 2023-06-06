export interface IUser {
  _id: string;
  full_name: string;
  username: string;
  photo: string;
  phone?: string;
  position: string;
  description: string;
  email: string;
  start_date: string;
  active: boolean;
  password: string;
}

export interface INewUser {
  full_name: string;
  username: string;
  photo: string;
  phone?: string;
  position: string;
  description: string;
  email: string;
  active: boolean;
  password: string;
}

export interface IBooking {
  _id: string;
  room_id: string;
  guest: string | undefined;
  guest_id: string;
  photo: string | undefined;
  order_date: string;
  check_in: string;
  check_out: string;
  room_type: string | undefined;
  special_request: string | undefined;
}

export interface INewBooking {
  room_id: string;
  guest: string | undefined;
  photo: string | undefined;
  check_in: string;
  check_out: string;
  room_type: string | undefined;
  special_request: string | undefined;
}

export interface IRoom {
  _id: string;
  name: string | undefined;
  bed_type: string | undefined;
  photo: string | undefined;
  description?: string | undefined;
  amenities: string[];
  rate: number;
  offer?: number;
  available: boolean;
}

export interface INewRoom {
  name: string | undefined;
  bed_type: string | undefined;
  photo: string | undefined;
  description?: string | undefined;
  amenities: string[];
  rate: number;
  offer: number;
  available: boolean;
}

export interface IContact {
  _id: string;
  date: string;
  name: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  subject: string | undefined;
  comment: string | undefined;
  archived: boolean;
}

export interface INewContact {
  name: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  subject: string | undefined;
  comment: string | undefined;
  archived: boolean;
}