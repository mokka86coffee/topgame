import { log } from 'util';
import React, { Key, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Card, CardContent, TextField } from '@mui/material';
import MaterialPagination from '@mui/material/Pagination';
import noop from 'lodash/noop';

import { Paths } from '../../types';
import { baseApi } from '../../constants';
import { LinkStyled } from './ui';
import { getPersonFromLSByID } from '../../shared/utils';
import { IPerson } from '../../shared/types';

export const Main: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [persons, setPersons] = useState([] as any[]);
  const [pagesQuantity, setPagesQuantity] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const calcPersonID = useCallback((idx: number, currentPage: number) => (currentPage - 1) * 10 + (idx + 1), []);

  const abortControllerRef = useRef<AbortController>();

  useEffect(
    function onUpdatePageOrSearch() {
      setLoading(true);

      abortControllerRef.current?.abort?.();
      abortControllerRef.current = new AbortController();

      fetch(`${baseApi}/?page=${page}&search=${search}`, { signal: abortControllerRef.current.signal })
        .then((data) => data.json())
        .then(({ results, count }: { results: IPerson[]; count: number }) => {
          const personsSyncWithLS = results.map((person, idx) => {
            const personID = calcPersonID(idx, page);
            const cachedPerson = getPersonFromLSByID(personID);

            return cachedPerson || person;
          });

          setPersons(personsSyncWithLS);

          setPagesQuantity(Math.ceil(count / 10));
          setLoading(false);
        })
        .catch(noop);
    },
    [page, search],
  );

  const handleChangePage = useCallback((_event: React.ChangeEvent<unknown>, nextPage: number) => setPage(nextPage), []);

  const handleSearchChange = useCallback(({ target }: React.ChangeEvent<HTMLInputElement>) => setSearch(target.value), []);

  return (
    <Container sx={{ my: 4 }}>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Planets, Spaceships, Vehicles, People, Films and Species
        </Typography>
        <TextField variant="standard" type="search" label="search" onChange={handleSearchChange} value={search} />
      </Box>
      <Grid margin={4} rowSpacing={2} columnSpacing={2} container>
        {loading && <p>loading..</p>}
        {!loading &&
          persons.map((person, idx) => (
            <Grid item xs={12} sm={4} key={person.url}>
              <LinkStyled to={`${Paths.Persons}/${calcPersonID(idx, page)}`}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle1" component="p">
                      Name: {person.name}
                    </Typography>
                    <Typography variant="caption" component="p">
                      Hair color: {person.hair_color}
                    </Typography>
                    <Typography variant="caption" component="p">
                      Skin color: {person.skin_color}
                    </Typography>
                  </CardContent>
                </Card>
              </LinkStyled>
            </Grid>
          ))}
      </Grid>
      <MaterialPagination onChange={handleChangePage} count={pagesQuantity} />
    </Container>
  );
};
