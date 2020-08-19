import { createViewBuilder, generateBindings, html, View } from '@jsview/core';
import '@material/mwc-button';
import { spread } from '@open-wc/lit-helpers/src/spread';
import { styleMap } from 'lit-html/directives/style-map';

export class ButtonView extends View {
  label?: string = undefined;
  disabled = false;
  icon?: string = undefined;
  trailingIcon = false;
  raised = false;
  unelevated = false;
  outlined = false;
  dense = false;

  onClick?: () => void = undefined;

  get body() {
    const bindings: { [k: string]: string } = generateBindings(this);

    return html`
      <mwc-button
        ...=${spread({ ...this.attrs, ...bindings })}
        .view="${this}"
        style="${styleMap(this.styles)}"
      ></mwc-button>
    `;
  }
}

export function Button(label: string) {
  return createViewBuilder(ButtonView).label(label);
}
