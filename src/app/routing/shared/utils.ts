import { Key } from 'react';
import { LSKeyForPerson } from '../../constants';
import { IPerson } from './types';

export const getLSPersonKey = (id: Key) => `${LSKeyForPerson}${id}`;

export const getPersonFromLSByID = (personID: Key): IPerson | null => {
  const cachedPerson = localStorage.getItem(getLSPersonKey(personID));

  return cachedPerson ? JSON.parse(cachedPerson) : null;
};
