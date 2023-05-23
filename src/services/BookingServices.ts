import bookingData from './data/bookings.json';

export const getAll = () => bookingData;

export const getOne = (id: number) => bookingData.find(user => user.id === id);