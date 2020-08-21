import { createView, html } from '@jsview/core';
import { Button } from '../button/index.js';
import { Dialog } from './index.js';

export default {
  title: 'dialog',
};

export const Simple = () =>
  Dialog(createView(html`Discard draft`))
    .primaryAction(['discard', Button('Discard')])
    .secondaryAction(['cancel', Button('Cancel')])
    .heading('Simple dialog')
    .open()
    .onClosed(({ detail: { action } }) =>
      console.log('dialog close for', action)
    ).body;
