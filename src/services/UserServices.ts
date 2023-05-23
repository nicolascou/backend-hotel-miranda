import usersData from './data/users.json';

export const getAll = () => usersData;

export const getOne = (id: number) => usersData.find(user => user.id === id);