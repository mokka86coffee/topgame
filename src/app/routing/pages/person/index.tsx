import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Grid from '@mui/material/Grid';
import { Button, CardActions, CardContent } from '@mui/material';

import Typography from '@mui/material/Typography';
import { Field } from './view/field';

export const Person: React.FC = () => {
  const { personID } = useParams<{ personID: string }>();

  const [person, setPerson] = useState<any>(null);

  useEffect(function init() {
    fetch(`https://swapi.dev/api/people/${personID}`)
      .then((data) => data.json())
      .then((data) => setPerson(data));
  }, []);

  return (
    <Grid item xs={12} sm={4}>
      <CardContent>
        {!person && <p>loading..</p>}
        {person && (
          <>
            <Typography variant="subtitle1" component="p">
              Name: <Field initValue={person.name} />
            </Typography>
            <Typography variant="caption" component="p">
              Hair color: <Field initValue={person.hair_color} />
            </Typography>
            <Typography variant="caption" component="p">
              Skin color: <Field initValue={person.skin_color} />
            </Typography>
          </>
        )}
      </CardContent>
      <CardActions>
        <Button>Сохранить</Button>
      </CardActions>
    </Grid>
  );
};
