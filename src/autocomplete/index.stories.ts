import 'reflect-metadata';
import { HSTack } from '@jsview/core/layout';
import { Button } from '../button/index.js';
import { Autocomplete } from './index.js';

export default {
  title: 'autocomplete',
};

export const SimpleUsage = () => {
  const data = [
    {
      name: 'France',
    },
    {
      name: 'Irlande',
    },
    {
      name: 'Angleterre',
    },
  ];
  return HSTack(
    Autocomplete('Type to search')
      .data(data)
      .required()
      .value(data[1])
      .onChange((value, isValid) =>
        console.log('selected country', value?.name, isValid)
      )
      .onSearch(text => console.log('search value', text)),
    Button('Add Country')
  ).body;
};
