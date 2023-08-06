import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Main } from './pages/main';
import { Person } from './pages/person';
import { Paths } from './types';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={Paths.Main} element={<Main />} />
      <Route path={`${Paths.Persons}/:personID`} element={<Person />} />
    </Routes>
  );
};
