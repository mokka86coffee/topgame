import React, { useCallback, useState } from 'react';
import { InputStyled } from './ui';

interface IProps {
  initValue: string;
}

export const Field: React.FC<IProps> = ({ initValue }) => {
  const [value, setValue] = useState(initValue);

  const handleChange = useCallback(({ target }: React.ChangeEvent<HTMLInputElement>) => setValue(target.value), []);

  return <InputStyled value={value} onChange={handleChange} />;
};
