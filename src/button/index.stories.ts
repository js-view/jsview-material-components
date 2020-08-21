import { HSTack } from '@jsview/core/layout';
import 'reflect-metadata';
import '../theme.js';
import { Button } from './index.js';

export default {
  title: 'button',
};

export const Standard = () =>
  HSTack(
    Button('Standard').onClick(() => alert('You clicked standard')),

    Button('Standard')
      .icon('code')
      .onClick(() => alert('You clicked standard with icon'))
  ).body;

export const Outlined = () =>
  HSTack(
    Button('Outlined').outlined(),

    Button('Outlined').outlined().icon('code')
  ).body;

export const Raised = () =>
  HSTack(
    Button('Raised').raised(),

    Button('Raised').icon('code').raised()
  ).body;

export const Unelevated = () =>
  HSTack(
    Button('Unelevated').unelevated(),

    Button('Unelevated').unelevated().icon('code')
  ).body;

export const Dense = () =>
  HSTack(
    Button('Dense').unelevated().dense(),

    Button('Dense').unelevated().dense().icon('code')
  ).body;

export const TrailingIcon = () =>
  HSTack(Button('Trailing icon').icon('code').trailingIcon().dense()).body;

export const Disabled = () =>
  HSTack(
    Button('Disabled').disabled(),

    Button('Disabled').icon('code').disabled()
  ).body;

export const CustomColor = () =>
  Button('Custom Color')
    .raised()
    .icon('code')
    .theme({ primaryColor: '#e9437a', onPrimaryColor: '#fff' }).body;
