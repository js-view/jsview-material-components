import '@material/mwc-circular-progress';
import { View, html, generateBindings, createViewBuilder } from '@jsview/core';
import { spread } from '@open-wc/lit-helpers/src/spread';
import { styleMap } from 'lit-html/directives/style-map';

export class CircularProgressView extends View {
  indeterminate = false;
  progress = 0;
  density = 0;
  closed = false;

  get body() {
    const bindings: { [k: string]: string } = generateBindings(this);
    return html`
      <mwc-circular-progress
        .view="${this}"
        ...="${spread({ ...this.attrs, ...bindings })}"
        style="${styleMap(this.styles)}"
      >
      </mwc-circular-progress>
    `;
  }
}

export function CircularProgress(progress?: number) {
  if (typeof progress === 'undefined') {
    return createViewBuilder(CircularProgressView).indeterminate();
  } else {
    return createViewBuilder(CircularProgressView).progress(progress);
  }
}
