import { Textfield } from './index.js';

export default {
  title: 'textfield',
  parameters: { options: { enableShortcuts: false } },
};

export const SimpleUsage = () =>
  Textfield('Firstname')
    .required()
    .outlined()
    .onChange((value, isValid) =>
      console.log(`Input changed: ${value} ${isValid}`)
    )
    .color('blue').body;

export const Disabled = () => Textfield('Lastname').disabled().body;

export const WithPresetValue = () =>
  Textfield('name').iconTrailing('delete').maxLength(30).value('John Doe').body;
