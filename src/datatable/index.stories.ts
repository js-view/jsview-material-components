import { Datatable } from './index.js';
import { html } from '@jsview/core';
import { DotMenu } from '../dot-menu/index.js';

export default {
  title: 'datatable',
};

export const Simple = () => {
  const data = [
    {
      id: 1,
      company: 'Alfreds Futterkiste',
      contact: 'Maria Anders',
      country: { name: 'Germany' },
      population: 30000,
    },
    {
      id: 2,
      company: 'Berglunds snabbköp',
      contact: 'Christina Berglund',
      country: { name: 'Sweden' },
      population: 3000,
    },
    {
      id: 3,
      company: 'Centro comercial Moctezuma',
      contact: 'Francisco Chang',
      //   country: { name: 'Mexico' },
      population: 6000000,
    },
  ];
  return Datatable<typeof data[0]>(
    { name: 'company', displayName: 'Company' },
    { name: 'contact', displayName: 'Contact' },
    { name: 'country.name', displayName: 'Country' },
    {
      name: 'population',
      displayName: 'Population',
      isNumeric: true,
      renderer: row => {
        const formatter = new Intl.NumberFormat('en-US', {
          maximumSignificantDigits: 3,
        });
        return html`${formatter.format(row.population)}`;
      },
    },
    {
      renderer: row =>
        DotMenu('Detail', 'Edit', 'Delete').onSelected(({ value }) =>
          console.log(`${value} action selected on`, row)
        ),
    }
  ).data(data).body;
};
