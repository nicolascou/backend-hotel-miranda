export interface IUser {
  id: number;
  full_name: string | undefined;
  username: string | undefined;
  photo: string | undefined;
  phone?: string | undefined;
  position: string | undefined;
  description: string | undefined;
  email: string | undefined;
  start_date: string;
  active: boolean | undefined;
  password: string | undefined;
}

export interface INewUser {
  full_name: string | undefined;
  username: string | undefined;
  photo: string | undefined;
  phone?: string | undefined;
  position: string | undefined;
  description: string | undefined;
  email: string | undefined;
  active: boolean | undefined;
  password: string | undefined;
}

export interface IBooking {
  id: number;
  room_id: number;
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
  room_id: number;
  guest: string | undefined;
  photo: string | undefined;
  check_in: string;
  check_out: string;
  room_type: string | undefined;
  special_request: string | undefined;
}

export interface IRoom {
  id: number;
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
  id: number;
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