import { DotMenu } from './index.js';

export default {
  title: 'dot-menu',
};

export const Simple = () =>
  DotMenu('Detail', 'Edit', 'Delete').onSelected(({ value }) =>
    console.log('selected menu item is', value)
  ).body;
