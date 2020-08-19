import { Select } from './index.js';

export default {
  title: 'select',
};

export const SimpleUsage = () =>
  Select('Items')
    .items([
      { name: 'Item 0', value: '0' },
      { name: 'Item 1', value: '1' },
      { name: 'Item 2', value: '2' },
    ])
    .slot('name').body;

export const WithValue = () =>
  Select('Items')
    .items([
      { name: 'Item 0', value: '0' },
      { name: 'Item 1', value: '1' },
      { name: 'Item 2', value: '2' },
    ])
    .fullwidth(false)
    .value('1').body;

export const WithEventHandler = () =>
  Select('Items')
    .items([
      { name: 'Item 0', value: '0' },
      { name: 'Item 1', value: '1' },
      { name: 'Item 2', value: '2' },
    ])
    .required()
    .outlined()
    .helper('Please, select an item')

    .onChange((value, isValid) =>
      console.log('New value selected', value, isValid)
    ).body;
