import React, { Key, useCallback, useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Card, CardContent } from '@mui/material';
import { Search } from './view/search';
import { Paths } from '../../types';
import { baseApi } from '../../constants';
import { LinkStyled } from './ui';
import { Pagination } from './view/pagination';

export const Main: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [persons, setPersons] = useState([] as any[]);
  const [pagesQuantity, setPagesQuantity] = useState(0);

  const loadResults = useCallback((value: Key, mode: 'page' | 'search') => {
    setLoading(true);
    const path = mode === 'page' ? `?page=${value}` : `?search=${value}`;
    fetch(`${baseApi}/${path}`)
      .then((data) => data.json())
      .then(({ results, count }) => {
        setPersons(results);
        setPagesQuantity(Math.ceil(count / 10));
        setLoading(false);
      });
  }, []);

  useEffect(function init() {
    loadResults(1, 'page');
  }, []);

  const handleChangePage = useCallback((nextPage: number) => loadResults(nextPage, 'page'), [loadResults]);

  const handleSearchChange = useCallback((search: string) => loadResults(search, 'search'), [loadResults]);

  return (
    <Container sx={{ my: 4 }}>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Planets, Spaceships, Vehicles, People, Films and Species
        </Typography>
        <Search onSearchChange={handleSearchChange} />
      </Box>
      <Grid margin={4} rowSpacing={2} columnSpacing={2} container>
        {loading && <p>loading..</p>}
        {!loading &&
          persons.map((person, idx) => (
            <Grid item xs={12} sm={4} key={person.name}>
              <LinkStyled to={`${Paths.Persons}/${idx + 1}`}>
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
      <Pagination onChange={handleChangePage} pagesQuantity={pagesQuantity} />
    </Container>
  );
};
