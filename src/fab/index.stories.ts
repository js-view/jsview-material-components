import '../theme.js';
import { Fab } from './index.js';

export default {
  title: 'fab',
};

export const Simple = () =>
  Fab('edit')
    .label('edit')
    .onClick(() => console.log('edit')).body;

export const Mini = () => Fab('add').mini().body;

export const Extended = () =>
  Fab('shopping_cart').extended().label('Add to cart').body;

export const Styled = () =>
  Fab('share').theme({ secondaryColor: '#fff', onSecondaryColor: '#000' }).body;
