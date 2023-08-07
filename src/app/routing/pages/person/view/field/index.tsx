import React, { useCallback, useState } from 'react';
import { InputStyled } from './ui';

interface IProps {
  initValue: string;
  field: string;
  onChange(field: string, value: string): void;
}

export const Field: React.FC<IProps> = ({ field, initValue, onChange }) => {
  const [value, setValue] = useState(initValue);

  const handleChange = useCallback(({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setValue(target.value);
    // на случай сохранения на сервере
    onChange(field, target.value);
  }, []);

  return <InputStyled value={value} onChange={handleChange} />;
};
