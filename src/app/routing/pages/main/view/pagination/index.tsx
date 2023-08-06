import React, { useCallback, useState } from 'react';
import MaterialPagination from '@mui/material/Pagination';

interface IProps {
  onChange(page: number): void;
  pagesQuantity: number;
}
export const Pagination: React.FC<IProps> = ({ onChange, pagesQuantity }) => {
  const [page, setPage] = useState(1);

  const handleChangePage = useCallback(
    (_: React.ChangeEvent<unknown>, nextPage: number) => {
      setPage(nextPage);
      onChange(page);
    },
    [onChange],
  );

  return <MaterialPagination onChange={handleChangePage} count={pagesQuantity} />;
};
