import { Switch } from './index.js';

export default {
  title: 'switch',
};

export const SimpleUsage = () => Switch().slot('name').body;

export const WithLabel = () => Switch('Airplane mode').body;

export const WithPresetValue = () =>
  Switch('Airplane mode')
    .checked()
    .onChange(value => console.log('Airplane mode?', value)).body;
