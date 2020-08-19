import '@material/mwc-icon-button';
import { html } from 'lit-html';
import { Button } from '../button/index.js';
import { createView } from '@jsview/core';
import { Snackbar } from './index.js';

export default {
  title: 'snackbar',
};

export const SimpleUsage = () =>
  Snackbar("Can't send photos")
    .actionControl(Button('Retry'))
    .actionColor('white')
    .dismissControl(
      createView(
        html`<mwc-icon-button icon="close" slot="dismiss"></mwc-icon-button>`
      )
    )
    .options({
      timeoutMs: -1,
    })
    .opened()
    .onClosed(reason => console.log('snackbar closed for', reason)).body;
