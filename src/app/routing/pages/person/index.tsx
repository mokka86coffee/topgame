import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import Grid from '@mui/material/Grid';
import { Button, CardActions, CardContent } from '@mui/material';
import isEmpty from 'lodash/isEmpty';
import noop from 'lodash/noop';

import Typography from '@mui/material/Typography';
import { Field } from './view/field';
import { baseApi } from '../../constants';
import { getLSPersonKey, getPersonFromLSByID } from '../../shared/utils';
import { IPerson } from '../../shared/types';

export const Person: React.FC = () => {
  const { personID } = useParams<{ personID: string }>();

  const [person, setPerson] = useState<IPerson>({} as IPerson);

  const abortControllerRef = useRef<AbortController>(new AbortController());

  useEffect(function init() {
    const cachedPerson = getPersonFromLSByID(personID!);

    if (cachedPerson) {
      setPerson(cachedPerson);

      return;
    }

    fetch(`${baseApi}/${personID}`, { signal: abortControllerRef.current.signal })
      .then((data) => data.json())
      .then((data) => setPerson(data))
      .catch(noop);
  }, []);

  const handleChange = useCallback((field: string, value: string) => setPerson((prev) => ({ ...prev, [field]: value })), []);

  const onSave = useCallback(() => localStorage.setItem(getLSPersonKey(personID!), JSON.stringify(person)), [personID, person]);

  return (
    <Grid item xs={12} sm={4}>
      <CardContent>
        {isEmpty(person) && <p>loading..</p>}
        {!isEmpty(person) && (
          <>
            <Typography variant="subtitle1" component="p">
              Name: <Field initValue={person.name} field="name" onChange={handleChange} />
            </Typography>
            <Typography variant="caption" component="p">
              Hair color: <Field initValue={person.hair_color} field="hair_color" onChange={handleChange} />
            </Typography>
            <Typography variant="caption" component="p">
              Skin color: <Field initValue={person.skin_color} field="skin_color" onChange={handleChange} />
            </Typography>
          </>
        )}
      </CardContent>
      <CardActions>
        <Button onClick={onSave}>Сохранить</Button>
      </CardActions>
    </Grid>
  );
};
