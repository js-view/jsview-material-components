import 'reflect-metadata';
import { VSTack } from '@jsview/core/layout';
import { TextScale } from './font.js';
import { Text } from './index.js';

export default {
  title: 'text',
};

export const Simple = () => Text('This is a body 1 text').body;

export const OtherScales = () =>
  VSTack(
    Text('Headline 1', TextScale.headline1),

    Text('Headline 3', TextScale.headline3),

    Text('Subtitle 1', TextScale.subtitle1),

    Text('caption', TextScale.caption),

    Text('overline', TextScale.overline)
  ).horizontalAlign('start').body;
