import React, { useCallback, useState } from 'react';
import { TextField } from '@mui/material';

interface IProps {
  onSearchChange(value: string): unknown;
}

export const Search: React.FC<IProps> = ({ onSearchChange }) => {
  const [search, setSearch] = useState('');

  const handleChange = useCallback(({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(target.value);
    onSearchChange(target.value);
  }, []);

  return <TextField variant="standard" type="search" label="search" onChange={handleChange} value={search} />;
};
